import React, { Component } from 'react';
import "./dashboard.component.css";
import {FaRegFolderOpen} from "react-icons/fa"

const { dialog } = window.require('electron').remote;

export class DashBoard extends Component {


    openFiles = () => {



        let files = dialog.showOpenDialogSync({
            properties: ["openFile", "multiSelections",'openDirectory']

        });
        if (files) {

            this.props.history.push("/configencrypt", {
                files: files
            }
            )
        }
    }


    render() {
        return (
            <div className="dashboard">
                <div className="title-container">

                    <h1>Hashix</h1>
                    <p>Encrypt your files with military grade encryption</p>
                </div>
                <div className="workable-area">

                    <div className="file-open-button" onClick={this.openFiles}>
                        <FaRegFolderOpen className="file-open-button-icon"/> 
                        <h1>open file</h1>
                    </div>


                </div>
            </div>
        );
    }
}