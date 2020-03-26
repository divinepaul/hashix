import React, { Component } from 'react';

const { dialog } = window.require('electron').remote;

export class DashBoard extends Component {


    openFiles = () => {



        let files = dialog.showOpenDialogSync({
            properties: ["openFile", "multiSelections"]

        });
        if (files) {

            this.props.history.push("/files", {
                files: files
            }
            )
        }
    }


    render() {
        return (
            <button className="file-open-button" onClick={this.openFiles}>
                <h1>open file</h1>
            </button>
        );
    }
}