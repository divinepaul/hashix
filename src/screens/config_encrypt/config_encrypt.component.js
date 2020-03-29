import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { FaArrowLeft } from "react-icons/fa";
import "./config_encrypt.component.css"

import Button from '@material-ui/core/Button';

import { Card, CardContent, CardActions } from '@material-ui/core';

import { TiDelete } from "react-icons/ti";
const { dialog } = window.require('electron').remote;

export class ConfigEncrypt extends Component {

    constructor(props) {
        super(props)

        this.state = {

            files: []

        }


    }


    openFiles = () => {

        let files = dialog.showOpenDialogSync({
            properties: ["openFile", "multiSelections"]

        });

        if (files) {
            this.insertFilesToArray(files)
        }
    }


    removeItemFromFiles = (file) => {
        
        let newArr = this.state.files;
        newArr.splice(file,1)
        this.setState({files:newArr});
    }


    insertFilesToArray(files) {
        if (!this.state.files.length) {

            this.setState({ files: files });

        } else {

            files.forEach(file => {


                // console.log(this.state.files.indexOf(files));

                if (this.state.files.includes(file)) {

                } else {
                    let newArray = this.state.files;
                    newArray.push(file);
                    this.setState({
                        files: newArray
                    })

                }

            });
        }

    }



    goBack = () => {
        this.props.history.goBack();
    }

    openFolders = () => {
        let files = dialog.showOpenDialogSync({
            properties: ["openDirectory", "multiSelections"]

        });
        if (files) {

            this.insertFilesToArray(files);

        }
    }




    render() {

        return (
            <div className="config-encrypt">
                <AppBar position="relative" color="transparent">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.goBack}>
                            <FaArrowLeft color="white" size="20px" />
                        </IconButton>
                        <h2>Encrypt</h2>
                    </Toolbar>
                </AppBar>

                <div className="config-encrypt-content">
                    <Card>
                        <CardContent>
                            <h1>Selected files</h1>
                            {
                                !(Array.isArray(this.state.files) && this.state.files.length) ? (
                                    <p>No files selected</p>
                                )
                                    : (

                                        this.state.files.map((object, index) => {
                                            return <div className="files-container" key={index}>
                                                <p>{object}</p>
                                                <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => this.removeItemFromFiles(index)}>
                                                    <TiDelete color="white" size="20px" />
                                                </IconButton>
                                            </div>;
                                        })
                                    )
                            }


                        </CardContent>
                        <CardActions>
                            <Button variant="outlined" color="secondary" onClick={this.openFiles}>
                                Open files
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={this.openFolders}>
                                Open folders
                            </Button>
                        </CardActions>
                    </Card>
                </div>
            </div>
        );
    }
}