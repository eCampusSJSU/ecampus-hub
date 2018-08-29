import React, {Component} from "react";
import {Footer} from "../index";
import {bindActionCreators} from "redux";
import * as userActions from "../../actions/user";
import connect from "react-redux/es/connect/connect";
import Loader from "react-loaders";
import {authentication} from '../../common';

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };

        if (authentication.isAuthenticated()) {
            this.props.history.push('/');
        }
    }

    signinWithGoogle() {
        this.props.userActions.googleSignin();
        this.setState({loading: true});
    }

    processHashFromURL(hash) {
        hash = hash.substr(1);
        let obj = {};
        hash.split('&').forEach((element) => {
            let property = element.split('=');
            switch (property[0]) {
                case 'state':
                    obj.state = property[1];
                    break;
                case 'access_token':
                    obj.accessToken = property[1];
                    break;
                case 'token_type':
                    obj.tokenType = property[1];
                    break;
                case 'expires_in':
                    obj.expiresIn = parseInt(property[1]);
                    break;
                case 'scope':
                    obj.scope = property[1];
                    break;
                case 'error':
                    obj.error = property[1];
                    break;
                default:
                    break;
            }
        });
        return obj;
    }

    /*getDerivedStateFromProps(props, state) {
        if (authentication.isAuthenticated()) {
            this.props.history.push('/');
        } else if (window.location.hash) {
            let hashObject = this.processHashFromURL(window.location.hash);
            if (hashObject.error === undefined) {
                // console.log(hashObject);
                this.props.userActions.googleAuthentication(hashObject.accessToken);
                this.setState({loading: true});
            } else {
                this.setState({loading: false});
            }
        } else {
            this.setState({loading: false});
        }
    }*/

    componentDidMount() {
        // this.setState({loading: false});
        if (authentication.isAuthenticated()) {
            this.props.history.push('/');
        } else if (window.location.hash) {
            let hashObject = this.processHashFromURL(window.location.hash);
            if (hashObject.error === undefined) {
                // console.log(hashObject);
                this.props.userActions.googleAuthentication(hashObject.accessToken);
                this.setState({loading: true});
            }
        }
    }

    /*shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }*/

    componentDidUpdate(prevProps, prevState, prevContext) {
        // this.setState({loading: false});
        if (authentication.isAuthenticated()) {
            this.props.history.push('/');
        } else if (window.location.hash) {
            let hashObject = this.processHashFromURL(window.location.hash);
            if (hashObject.error === undefined) {
                // console.log(hashObject);
                this.props.userActions.googleAuthentication(hashObject.accessToken);
            }
        }
    }


    renderLoader() {
        return (
            <div className="outer-div">
                <div className="inner-div">
                    <Loader type="ball-pulse" active color='#427C89' style={{transform: 'scale(1.5)'}}/>
                </div>
            </div>
        );
    }

    render() {
        return (
            this.state.loading ? this.renderLoader() :
                <div className="content" style={{backgroundColor: '#F4F3EF', height: '100vh'}}>
                    <div className="container-fluid page-align-center" style={{height: '100vh'}}>
                        <div className="col-11 col-sm-11 col-md-5 col-lg-4 col-xl-4">
                            <div className="card">
                                <div className="content text-center" style={{padding: '25px'}}>
                                    <h4 className="title">Welcome to the eCampus Hub</h4>
                                    <br/><br/>
                                    <button className="btn btn-danger btn-wd"
                                            onClick={() => this.signinWithGoogle()}>
                                    <span className="text-vertical-align-center">
                                        <i className="fab fa-google fa-2x"/>&nbsp;
                                        Sign in with Google
                                    </span>
                                    </button>
                                </div>
                                <hr/>
                                <div className="text-center">
                                    <div className="row">
                                        <Footer/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {userReducer: state.userReducer, globalReducer: state.globalReducer}
};

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    }
};

export default SignIn = connect(mapStateToProps, mapDispatchToProps)(SignIn);