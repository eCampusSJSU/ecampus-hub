import React, {Component} from "react";
import {Footer, Header, Navigation} from "../../index";
import VideoAsset from "./videoAsset";
import {bindActionCreators} from "redux";
import * as userActions from "../../../actions/user";
import connect from "react-redux/es/connect/connect";
import * as authentication from "../../../common/authentication";
import Loader from "react-loaders";
import Notifications from "react-notification-system-redux";

class ARTemplate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            profile: null
        };

        if (!authentication.isAuthenticated()) {
            this.props.history.push('/signin');
        } else {
            this.state = {
                ...this.state,
                profile: authentication.getProfile()
            };
        }
    }


    componentDidMount() {
        if (!authentication.isAuthenticated()) {
            this.props.history.push('/signin');
        } else {
            this.setState({
                profile: authentication.getProfile()
            });
            this.setState({loading: false});
            this.notificationSystem = this.refs.notificationSystem;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!authentication.isAuthenticated()) {
            this.props.history.push('/signin');
        }
    }

    renderLoader() {
        return (
            <div className="outer-div">
                <div className="inner-div">
                    <Loader type="ball-pulse" active color='#B33C12'/>
                </div>
            </div>
        );
    }

    render() {
        return (
            this.state.loading ? this.renderLoader() :
                <div className="wrapper">

                    <Navigation title="AR Template"/>

                    <div className="main-panel">

                        <Header title="AR Template"
                                userName={this.state.profile ? this.state.profile.fullName : ''}
                                userImage={this.state.profile ? this.state.profile.imageURL : ''}
                        />

                        <div className="content">
                            <div className="container-fluid">
                                <VideoAsset/>
                            </div>
                        </div>

                        <Footer/>
                        <Notifications allowHTML={true} notifications={this.props.notificationsReducer}
                                       style={this.props.globalReducer.notificationStyle}/>
                    </div>
                </div>
        )
            ;
    }
}

const mapStateToProps = (state) => {
    return {
        userReducer: state.userReducer,
        globalReducer: state.globalReducer,
        notificationsReducer: state.notificationsReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    }
};

export default ARTemplate = connect(mapStateToProps, mapDispatchToProps)(ARTemplate);