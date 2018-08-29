import React, {Component} from "react";
import {Footer, Header, Navigation} from "../index";
import {bindActionCreators} from "redux";
import {Link} from "react-router-dom";
import * as userActions from "../../actions/user";
import connect from "react-redux/es/connect/connect";
import Loader from "react-loaders";
import {authentication} from '../../common';
import Notifications from 'react-notification-system-redux';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            profile: null
        };

        this.notificationSystem = React.createRef();

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
                    <Loader type="ball-pulse" active color='#427C89' style={{transform: 'scale(1.5)'}}/>
                </div>
            </div>
        );
    }

    render() {
        return (
            this.state.loading ? this.renderLoader() :
                <div className="wrapper">

                    <Navigation title="Dashboard"/>

                    <div className="main-panel">

                        <Header title="Dashboard"
                                userName={this.state.profile ? this.state.profile.fullName : ''}
                                userImage={this.state.profile ? this.state.profile.imageURL : ''}
                        />

                        <div className="content">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-3 col-sm-6">
                                        <Link to="/artemplate">
                                            <div className="card">
                                                <div className="content">
                                                    <div className="row">
                                                        <div className="col-xs-5">
                                                            <div className="icon-big icon-danger text-center">
                                                                <i className="ti-camera"/>
                                                            </div>
                                                        </div>
                                                        <div className="col-xs-7">
                                                            <div className="numbers">
                                                                <p>ARTemplate</p>
                                                                AR
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/*<div className="footer">
                                                <hr/>
                                                <div className="stats">
                                                    <i className="ti-reload"/> Updated now
                                                </div>
                                            </div>*/}
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Footer/>
                        <Notifications allowHTML={true} notifications={this.props.notificationsReducer}
                                            style={this.props.globalReducer.notificationStyle}/>
                    </div>
                </div>
        );
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

export default Dashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard);