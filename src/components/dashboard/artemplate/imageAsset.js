import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {userActions, artemplateActions} from '../../../actions';
import {authentication} from '../../../common';
import Loader from "react-loaders";

class ImageAsset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            imageTargetExists: false,
            linkedImageExists: false
        };
        this.imageTarget = React.createRef();
        this.linkedImage = React.createRef();
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
        } else if (object === this.linkedImage) {
            this.setState({...this.state, linkedImageExists: false});
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
        } else if (object === this.linkedImage) {
            if (object.current.files[0] === undefined) {
                this.setState({...this.state, linkedImageExists: false});
            } else {
                this.setState({...this.state, linkedImageExists: true});
            }
        }
    }

    submitForm(event) {
        event.preventDefault();
        if (!this.state.linkedImageExists || !this.state.imageTargetExists) {
            this.props.artemplateActions.addImageAsset(undefined, undefined, authentication.getToken());
        } else {
            let imageTarget = {
                content: this.imageTarget.current.files[0],
                size: this.imageTarget.current.files[0].size,
                mimeType: this.imageTarget.current.files[0].type,
                name: this.imageTarget.current.files[0].name
            };
            let linkedImage = {
                content: this.linkedImage.current.files[0],
                size: this.linkedImage.current.files[0].size,
                mimeType: this.linkedImage.current.files[0].type,
                name: this.linkedImage.current.files[0].name
            };
            this.props.artemplateActions.addImageAsset(imageTarget, linkedImage, authentication.getToken());
            event.target.reset();
            this.setState({
                imageTargetExists: false,
                linkedImageExists: false
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
                            <h4 className="title">Add Image Asset</h4>
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
                                            <input id="attachment" ref={this.linkedImage} type="file"
                                                   style={{display: "none"}}
                                                   onChange={(event) => this.fileUploaded(event, this.linkedImage)}
                                            />
                                            <button
                                                className="btn btn-success btn-simple"
                                                style={{paddingLeft: 5}}
                                                onClick={(event) => this.uploadFile(event, this.linkedImage)}>
                                                    <span className="text-vertical-align-center">
                                                        <i className="material-icons">image</i>&nbsp;
                                                        Upload Linked Image
                                                    </span>
                                            </button>
                                            <span className="badge badge-info text-success"
                                                  style={{backgroundColor: 'transparent'}}>(format: .jpg, .jpeg, .gif, .png)</span>
                                        </div>
                                        <div className="col"
                                             style={{
                                                 paddingRight: 15,
                                                 paddingLeft: 15,
                                                 paddingTop: 10,
                                                 paddingBottom: 0
                                             }}>
                                            {this.state.linkedImageExists ?
                                                <div className="alert alert-success">
                                                    <button type="button" aria-hidden="true" className="close"
                                                            onClick={(event) => this.removeFile(event, this.linkedImage)}>×
                                                    </button>
                                                    <span>{this.state.linkedImageExists ? this.linkedImage.current.files[0].name : ''}</span>
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
        artemplateReducer: state.artemplateReducer.imageAsset
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        artemplateActions: bindActionCreators(artemplateActions, dispatch)
    }
};

export default ImageAsset = connect(mapStateToProps, mapDispatchToProps)(ImageAsset);