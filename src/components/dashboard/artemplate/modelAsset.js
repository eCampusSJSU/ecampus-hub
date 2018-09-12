import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {userActions, artemplateActions} from '../../../actions';
import {authentication} from '../../../common';
import Loader from "react-loaders";

class ModelAsset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            imageTargetExists: false,
            linkedModelExists: false
        };
        this.imageTarget = React.createRef();
        this.linkedModel = React.createRef();
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
        } else if (object === this.linkedModel) {
            this.setState({...this.state, linkedModelExists: false});
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
        } else if (object === this.linkedModel) {
            if (object.current.files[0] === undefined) {
                this.setState({...this.state, linkedModelExists: false});
            } else {
                this.setState({...this.state, linkedModelExists: true});
            }
        }
    }

    submitForm(event) {
        event.preventDefault();
        if (!this.state.linkedModelExists || !this.state.imageTargetExists) {
            this.props.artemplateActions.addModelAsset(undefined, undefined, authentication.getToken());
        } else {
            let imageTarget = {
                content: this.imageTarget.current.files[0],
                size: this.imageTarget.current.files[0].size,
                mimeType: this.imageTarget.current.files[0].type,
                name: this.imageTarget.current.files[0].name
            };
            let linkedModel = {
                content: this.linkedModel.current.files[0],
                size: this.linkedModel.current.files[0].size,
                mimeType: this.linkedModel.current.files[0].type,
                name: this.linkedModel.current.files[0].name
            };
            this.props.artemplateActions.addModelAsset(imageTarget, linkedModel, authentication.getToken());
            event.target.reset();
            this.setState({
                imageTargetExists: false,
                linkedModelExists: false
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
                            <h4 className="title">Add Model Asset</h4>
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
                                            <input id="attachment" ref={this.linkedModel} type="file"
                                                   style={{display: "none"}}
                                                   onChange={(event) => this.fileUploaded(event, this.linkedModel)}
                                            />
                                            <button
                                                className="btn btn-info btn-simple"
                                                style={{paddingLeft: 5}}
                                                onClick={(event) => this.uploadFile(event, this.linkedModel)}>
                                                    <span className="text-vertical-align-center">
                                                        <i className="material-icons">category</i>&nbsp;
                                                        Upload Linked Model
                                                    </span>
                                            </button>
                                            <span className="badge badge-info text-info"
                                                  style={{backgroundColor: 'transparent'}}>(format: .obj)</span>
                                        </div>
                                        <div className="col"
                                             style={{
                                                 paddingRight: 15,
                                                 paddingLeft: 15,
                                                 paddingTop: 10,
                                                 paddingBottom: 0
                                             }}>
                                            {this.state.linkedModelExists ?
                                                <div className="alert alert-info">
                                                    <button type="button" aria-hidden="true" className="close"
                                                            onClick={(event) => this.removeFile(event, this.linkedModel)}>×
                                                    </button>
                                                    <span>{this.state.linkedModelExists ? this.linkedModel.current.files[0].name : ''}</span>
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
        artemplateReducer: state.artemplateReducer.modelAsset
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        artemplateActions: bindActionCreators(artemplateActions, dispatch)
    }
};

export default ModelAsset = connect(mapStateToProps, mapDispatchToProps)(ModelAsset);