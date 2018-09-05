import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {userActions, artemplateActions} from '../../../actions';
import {authentication} from '../../../common';
import Loader from "react-loaders";

class VideoAsset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            imageTargetExists: false,
            linkedVideoExists: false
        };
        this.imageTarget = React.createRef();
        this.linkedVideo = React.createRef();
        this.uploadFile = this.uploadFile.bind(this);
        this.removeFile = this.removeFile.bind(this);
        this.fileUploaded = this.fileUploaded.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    uploadFile(event, object) {
        event.preventDefault();
        object.current.click();
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    removeFile(event, object) {
        if (object === this.imageTarget) {
            this.setState({...this.state, imageTargetExists: false});
        } else if (object === this.linkedVideo) {
            this.setState({...this.state, linkedVideoExists: false});
        }
        object.current.value = '';
    }

    fileUploaded(event, object) {
        if (object === this.imageTarget) {
            if (object.current.files[0] === undefined) {
                this.setState({...this.state, imageTargetExists: false});
            } else {
                /*// Make sure `file.name` matches our extensions criteria
    if ( /\.(jpe?g|png|gif)$/i.test(file.name) );*/
                this.setState({...this.state, imageTargetExists: true});
            }
        } else if (object === this.linkedVideo) {
            if (object.current.files[0] === undefined) {
                this.setState({...this.state, linkedVideoExists: false});
            } else {
                this.setState({...this.state, linkedVideoExists: true});
            }
        }
    }

    submitForm(event) {
        event.preventDefault();
        if (!this.state.linkedVideoExists || !this.state.imageTargetExists) {
            this.props.artemplateActions.addVideoAsset(undefined, undefined, authentication.getToken());
        } else {
            let imageTarget = {
                content: this.imageTarget.current.files[0],
                size: this.imageTarget.current.files[0].size,
                mimeType: this.imageTarget.current.files[0].type,
                name: this.imageTarget.current.files[0].name
            };
            let linkedVideo = {
                content: this.linkedVideo.current.files[0],
                size: this.linkedVideo.current.files[0].size,
                mimeType: this.linkedVideo.current.files[0].type,
                name: this.linkedVideo.current.files[0].name
            };
            this.props.artemplateActions.addVideoAsset(imageTarget, linkedVideo, authentication.getToken());
            event.target.reset();
            this.setState({
                imageTargetExists: false,
                linkedVideoExists: false
            });
        }
    }

    static getDerivedStateFromProps(props, state) {
        // Any time the current user changes,
        // Reset any parts of state that are tied to that user.
        // In this simple example, that's just the email.
        if (props.artemplateReducer.status === 'WAITING') {
            return {
                ...state,
                loading: true
            };
        } else if (props.artemplateReducer.status === 'SUCCESS' || props.artemplateReducer.status === 'ERROR') {
            return {
                ...state,
                loading: false
            };
        }
        return null;
    }

    componentDidMount() {
        /*if (this.props.artemplateReducer.status === 'SUCCESS') {
        } else if (this.props.artemplateReducer.status === 'ERROR') {
        }*/
    }

    componentDidUpdate(prevProps, prevState) {
        /*if (prevProps.artemplateReducer.status !== this.props.artemplateReducer.status && this.props.artemplateReducer.status === 'SUCCESS') {
        } else if (this.props.artemplateReducer.status === 'ERROR') {
        }*/
    }

    renderLoader() {
        return (
            <div className="form-row">
                <div className="col text-center">
                    <Loader type="ball-pulse" active color='#B33C12'/>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-12 col-sm-11">
                    <div className="card">
                        <div className="header">
                            <h4 className="title">Add Video Asset</h4>
                        </div>
                        <div className="content">
                            {this.state.loading ? this.renderLoader() :
                                <form onSubmit={this.submitForm}>
                                    <div className="form-row">
                                        <div className="col">
                                            <input id="attachment" ref={this.imageTarget} type="file"
                                                   style={{display: "none"}}
                                                   onChange={(event) => this.fileUploaded(event, this.imageTarget)}
                                            />
                                            <button
                                                className="btn btn-warning btn-simple"
                                                style={{paddingLeft: 5}}
                                                onClick={(event) => this.uploadFile(event, this.imageTarget)}>
                                                    <span className="text-vertical-align-center">
                                                        <i className="material-icons">image</i>&nbsp;
                                                        Upload Image Target
                                                    </span>
                                            </button>
                                            <span className="badge badge-info text-warning"
                                                  style={{backgroundColor: 'transparent'}}>(format: .jpg, .jpeg, .png)</span>
                                        </div>
                                        <div className="col"
                                             style={{
                                                 paddingRight: 15,
                                                 paddingLeft: 15,
                                                 paddingTop: 10,
                                                 paddingBottom: 0
                                             }}>
                                            {this.state.imageTargetExists ?
                                                <div className="alert alert-warning">
                                                    <button type="button" aria-hidden="true" className="close"
                                                            onClick={(event) => this.removeFile(event, this.imageTarget)}>×
                                                    </button>
                                                    <span>{this.state.imageTargetExists ? this.imageTarget.current.files[0].name : ''}</span>
                                                </div> : ''}
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col">
                                            <input id="attachment" ref={this.linkedVideo} type="file"
                                                   style={{display: "none"}}
                                                   onChange={(event) => this.fileUploaded(event, this.linkedVideo)}
                                            />
                                            <button
                                                className="btn btn-danger btn-simple"
                                                style={{paddingLeft: 5}}
                                                onClick={(event) => this.uploadFile(event, this.linkedVideo)}>
                                                    <span className="text-vertical-align-center">
                                                        <i className="material-icons">movie_creation</i>&nbsp;
                                                        Upload Linked Video
                                                    </span>
                                            </button>
                                            <span className="badge badge-info text-danger"
                                                  style={{backgroundColor: 'transparent'}}>(format: .mp4, .avi, .3gp)</span>
                                        </div>
                                        <div className="col"
                                             style={{
                                                 paddingRight: 15,
                                                 paddingLeft: 15,
                                                 paddingTop: 10,
                                                 paddingBottom: 0
                                             }}>
                                            {this.state.linkedVideoExists ?
                                                <div className="alert alert-danger">
                                                    <button type="button" aria-hidden="true" className="close"
                                                            onClick={(event) => this.removeFile(event, this.linkedVideo)}>×
                                                    </button>
                                                    <span>{this.state.linkedVideoExists ? this.linkedVideo.current.files[0].name : ''}</span>
                                                </div> : ''}
                                        </div>
                                    </div>
                                    <div className="form-row text-center" style={{marginTop: 5, marginBottom: 10}}>
                                        <button type="submit" className="btn btn-info btn-fill btn-wd">Add
                                        </button>
                                    </div>
                                    <div className="clearfix"/>
                                </form>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userReducer: state.userReducer,
        globalReducer: state.globalReducer,
        artemplateReducer: state.artemplateReducer.videoAsset
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        artemplateActions: bindActionCreators(artemplateActions, dispatch)
    }
};

export default VideoAsset = connect(mapStateToProps, mapDispatchToProps)(VideoAsset);