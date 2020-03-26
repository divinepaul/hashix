import React, { Component } from 'react';
import './frame.component.css';
import { FaRegWindowRestore, FaRegWindowMinimize,FaHeading } from "react-icons/fa";
import { MdClose } from "react-icons/md";
const { app } = window.require('electron').remote;

const { remote } = window.require('electron');

export class Frame extends Component {

    closeApp = () => {
        app.exit(0);
    }

    minimizeApp = () => {
        
        remote.BrowserWindow.getFocusedWindow().minimize();
    }

    maximizeApp = () =>{
        remote.BrowserWindow.getFocusedWindow().maximize();
    }

    render() {
        return (
            <div className="frame">
                <p className="icon"><FaHeading/></p>
                <h1 className="frame-title">Hashix</h1>
                <div className="frame-actions">
                    <button className="frame-actions-buttons" onClick={this.minimizeApp}> <FaRegWindowMinimize /></button>
                    <button className="frame-actions-buttons" onClick={this.maximizeApp}> <FaRegWindowRestore /></button>
                    <button className="frame-actions-buttons" onClick={this.closeApp}> <MdClose /> </button>
                </div>
            </div>
        );
    }
}