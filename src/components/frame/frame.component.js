import React, { Component } from 'react';
import './frame.component.css';
const {app} = window.require('electron').remote;

export class Frame extends Component {

    closeApp(){
        
        app.exit(0);
    }
    render() {
        return (
            <div className="frame">
                <h1 className="frame-title">Hashix</h1>
                <div className="frame-actions">
                    <button className="frame-actions-buttons" onClick={this.closeApp}> x </button>
                </div>
            </div>
        );
    }
}