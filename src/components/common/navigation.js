import React from "react";
import {Link} from "react-router-dom";

const Navigation = (props) => {
    return (
        <div className="sidebar" data-background-color="white" data-active-color="danger">

            {
                /*
                Tip 1: you can change the color of the sidebar's background using: data-background-color="white | black"
                Tip 2: you can change the color of the active button using the data-active-color="primary | info | success | warning | danger"
                */
            }

            <div className="sidebar-wrapper">
                <div className="logo">
                    <Link to="/" className="simple-text">
                        The Hub
                    </Link>
                </div>

                <ul className="nav">
                    <li className={props.title === 'Dashboard' ? 'active' : ''}>
                        <Link to="/">
                            <div className={props.title === 'Dashboard' ? 'text-primary' : ''}>
                                <i className="ti-panel"/>
                                <p>Dashboard</p>
                            </div>
                        </Link>
                    </li>
                    <li className={props.title === 'AR Template' ? 'active' : ''}>
                        <Link to="/artemplate">
                            <div className={props.title === 'AR Template' ? 'text-danger' : ''}>
                                <i className="ti-camera"/>
                                <p>AR Template</p>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default Navigation;
