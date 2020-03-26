import React, { Component } from 'react';
import encryptService from '../../services/fileencrypt.services';

const {dialog} = window.require('electron').remote;
export class DashBoard extends Component {


    componentDidMount() {

    }
    openFiles(){
        
        let files = dialog.showOpenDialogSync({
            properties:["openFile","multiSelections"]

        });
        console.log(files);
    }


    render() {
        return (
            <button className="file-open-button" onClick={this.openFiles}>
                <h1>open file</h1>
            </button>
        );
    }
}