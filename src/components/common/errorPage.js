import React, {Component} from "react";
import {Footer} from "../index";
import {Link} from "react-router-dom";
import error from '../../img/error.png';

class ErrorPage extends Component {
    render() {
        return (
            <div className="content" style={{backgroundColor: '#F4F3EF', height: '100vh'}}>
                <div className="container-fluid page-align-center" style={{height: '100vh'}}>
                    <div className="col-11 col-sm-11 col-md-5 col-lg-4 col-xl-4">
                        <div className="card">
                            <div className="header text-center">
                                <h4 className="title">Oops! We can't seem to find the page you are looking for.</h4>
                            </div>
                            <div className="content text-center" style={{padding: '25px'}}>
                                <div className="ct-chart" style={{marginTop: 0}}>
                                    <img src={error} height={'100%'}/>
                                </div>
                                <Link to='/' className="btn btn-primary btn-wd">
                                    <span className="text-vertical-align-center">
                                        Go to Home
                                    </span>
                                </Link>
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

export default ErrorPage;