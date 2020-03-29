import React, { Component } from 'react';
import "./dashboard.component.css";
import { FaLock,FaUnlock } from "react-icons/fa"

import Card from '@material-ui/core/Card';
import {Link} from "react-router-dom";


export class DashBoard extends Component {


   

    render() {
        return (
            <div className="dashboard">
                <div className="title-container">

                    <h1>Hashix</h1>
                    <p>Encrypt your files with military grade encryption</p>
                </div>

                <div className="workable-area">
                    <Link to="/configencrypt">
                    <Card className="card-button">

                        <FaLock className="card-button-icon" />
                        <h1 className="card-button-title">Encrypt</h1>

                    </Card>
                    </Link>

                    <Card className="card-button">

                        <FaUnlock className="card-button-icon" />
                        <h1>Decrypt</h1>

                    </Card>

                </div>
            </div>
        );
    }
}