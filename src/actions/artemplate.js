import axios from 'axios';
import {actionTypes, displayText} from '../common';
import Notifications from 'react-notification-system-redux';
import hmacsha1 from 'hmacsha1';
import md5Hex from 'md5-hex';
import * as base64 from 'base64-min';
import * as constants from "../common/constants";

export const addVideoAsset = (imageTarget, linkedVideo, token) => {
    // function that dispatches an action at a later time
    return (dispatch) => {

        if (imageTarget === undefined || linkedVideo === undefined) {
            return dispatch(Notifications.error({
                title: 'Error',
                message: displayText.NO_FILE_ERROR,
                position: 'tr'
            }));
        } else if (!(imageTarget.mimeType === 'image/jpeg' || imageTarget.mimeType === 'image/png')
            || !(linkedVideo.mimeType === 'video/3gpp' || linkedVideo.mimeType === 'video/3gpp2'
                || linkedVideo.mimeType === 'video/x-msvideo' || linkedVideo.mimeType === 'video/mp4')) {
            return dispatch(Notifications.error({
                title: 'Error',
                message: displayText.INVALID_FILE_FORMAT_ERROR,
                position: 'tr'
            }));
        } else if (!token) {
            return dispatch(Notifications.error({
                title: 'Error',
                message: displayText.ERROR_MESSAGE,
                position: 'tr'
            }));
        }

        // Returns a promise
        uploadFileToGoogleDrive(linkedVideo, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': linkedVideo.mimeType
            }
        }, token)
            .then(id => {
                uploadTargetImageToVuforiaCloudDatabase(imageTarget, id)
                    .then(success => {
                        if (success) {
                            dispatch({
                                type: actionTypes.ADD_VIDEO_ASSET,
                                status: 'SUCCESS'
                            });
                            dispatch(Notifications.success({
                                title: 'Success',
                                message: 'Added video asset successfully.',
                                position: 'tr'
                            }));
                        } else {
                            throw {error: "error"};
                        }
                    })
                    .catch(error => {
                        throw error;
                    });
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.ADD_VIDEO_ASSET,
                    status: 'ERROR',
                    message: displayText.ERROR_MESSAGE
                });
                dispatch(Notifications.error({
                    title: 'Error',
                    message: displayText.ERROR_MESSAGE,
                    position: 'tr'
                }));
            });

        dispatch({
            type: actionTypes.ADD_VIDEO_ASSET,
            status: 'WAITING'
        });
    };
};

const uploadFileToGoogleDrive = (file, config, token) => {
    return axios
        .post(`${constants.GOOGLE_DRIVE_UPLOAD_FILE_API}`, file.content, config)
        .then(response => {
            // Dispatch another action to consume data
            if (response.status === 200) {
                const metadata = response.data;
                const publicPermissions = {
                    role: 'reader',
                    type: 'anyone'
                };
                const updatedMetadata = {
                    name: file.name
                };
                return updateMetadataForFileOnGoogleDrive(metadata.id, updatedMetadata, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(success => {
                        if (success)
                            return createPermissionsForFileOnGoogleDrive(metadata.id, publicPermissions, {
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            })
                                .then(success => {
                                    if (success) {
                                        return metadata.id;
                                    } else {
                                        throw {error: "error"};
                                    }
                                })
                                .catch(error => {
                                    throw error;
                                });
                        else
                            throw {error: "error"};
                    })
                    .catch(error => {
                        throw error;
                    });
            } else {
                throw {error: "error"};
            }
        })
        .catch(error => {
            throw error;
        });
};

const updateMetadataForFileOnGoogleDrive = (fileId, metadata, config) => {
    // Returns a promise
    return axios
        .patch(`${constants.GOOGLE_DRIVE_FILES_API}/${fileId}`, metadata, config)
        .then(response => {
            // Dispatch another action to consume data
            return response.status === 200;
        })
        .catch(error => {
            throw error;
        });
};

const createPermissionsForFileOnGoogleDrive = (fileId, permissions, config) => {
    // Returns a promise
    return axios
        .post(`${constants.GOOGLE_DRIVE_FILES_API}/${fileId}/permissions`, permissions, config)
        .then(response => {
            // Dispatch another action to consume data
            return response.status === 200;
        })
        .catch(error => {
            throw error;
        });
};

const uploadTargetImageToVuforiaCloudDatabase = (imageTarget, linkedVideoID) => {
    imageToBase64(imageTarget.content)
        .then(image => {
            if (image === undefined) {
                throw 'error';
            }
            const data = {
                "name": imageTarget.name,
                "width": 1,
                "image": image,
                "application_metadata": base64.encode(getLinkedVideoPublicURL(linkedVideoID))
            };

            const date = new Date().toUTCString();

            const config = {
                headers: {
                    'Authorization': `VWS ${constants.VUFORIA_SERVER_ACCESS_KEY}:${getVuforiaSignature('POST', data, 'application/json', date, '/targets')}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            // Returns a promise
            return axios
                .post(`${constants.VUFORIA_API}/targets`, data, config)
                .then(response => {
                    // Dispatch another action to consume data
                    if (response.status === 200) {
                        return true;
                    } else {
                        throw {error: "error"};
                    }
                })
                .catch(error => {
                    throw error;
                });

        })
        .catch(error => {
            throw error;
        });
};

const getVuforiaSignature = (method, content, contentType, date, requestPath) => {
    /*  -HTTP-Verb is the HTTP method used for the action, for example, GET, POST, and so forth.
        -Content-MD5 is the hexadecimal MD5 hash of the whole request body (from the first boundary to the last one, including the boundary itself). For request types without request body, include the MD5 hash of an empty string which is “d41d8cd98f00b204e9800998ecf8427e”.
        -Content-Type is the content-type of the request body (like multipart/form-data). Use an empty string for request types without a request body.
        -Date is the current date per RFC 2616, section 3.3.1, rfc1123-date format, for example, Sun, 22 Apr 2012 08:49:37 GMT.

    stringToSign =
        HTTP-Verb + "\n" +
        Content-MD5 + "\n" +
        Content-Type + "\n" +
        Date + "\n" +
        Request-Path;
    */

    const stringToSign = method + "\n" + md5Hex(JSON.stringify(content)) + "\n" + contentType + "\n" + date + "\n" + requestPath;

    return base64.encode(hmacsha1(constants.VUFORIA_SERVER_ACCESS_KEY, stringToSign));
};

const imageToBase64 = (image) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });
};

const getLinkedVideoPublicURL = (linkedVideoID) => {
    return base64.encode(constants.GOOGLE_DRIVE_PUBLIC_URL + linkedVideoID);
};