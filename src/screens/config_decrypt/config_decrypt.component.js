import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { FaArrowLeft } from "react-icons/fa";

import "./config_decrypt.component.css"

import Button from '@material-ui/core/Button';
import { Card, CardContent, CardActions } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { TiDelete } from "react-icons/ti";
import MenuItem from '@material-ui/core/MenuItem';

import cipherEncryption from '../../services/fileencrypt.services'

const { dialog } = window.require('electron').remote;
export class ConfigDecrypt extends Component {

    constructor(props) {
        super(props)

        this.state = {
            algorithm: "aes-256-cbc",
            algorithms: ['aes-256-cbc'],
            file: "",
            password: ''
        }


    }


    openFile = () => {

        let ecryptedFile = dialog.showOpenDialogSync({
            properties: ["openFile"]

        });

        if (ecryptedFile) {

            this.setState({
                file: ecryptedFile[0]
            })

        }
    }


    goBack = () => {
        this.props.history.goBack();
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value }, () => {
            console.log(this.state.password);
        });

    }

    handleAlgorithmChange = (event) => {
        this.setState({ algorithm: event.target.value }, () => {
            console.log(this.state.algorithm);
        });
    }

    handleFormSubmit = (event) =>{
        event.preventDefault();
        
    }

    render() {

        return (
            <div className="config-encrypt">
                <AppBar position="static" color="transparent">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.goBack}>
                            <FaArrowLeft color="white" size="20px" />
                        </IconButton>
                        <h2>Decrypt</h2>
                    </Toolbar>
                </AppBar>

                <div className="config-encrypt-content">
                    <Card>
                        <CardContent>

                            <h1>Selected file</h1>

                            { this.state.file ? 
                                <div className="files-container">
                                    <p>{this.state.file}</p>
                                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => this.setState({ file: "" })}>
                                        <TiDelete color="white" size="20px" />
                                    </IconButton>
                                </div> : null
                            } 




                        </CardContent>
                        <CardActions>
                            <Button variant="outlined" color="secondary" onClick={this.openFile}>
                                Open file
                            </Button>
                        </CardActions>
                    </Card>

                    <br />
                    <Card>
                        <CardContent>
                            <h1>Configure Decryption</h1>
                            <br />
                            <form autoComplete="off" onSubmit={this.handleFormSubmit}>

                                <TextField id="outlined-basic" label="Password" variant="outlined" color="secondary" onChange={this.handlePasswordChange} type="password" required value={this.state.password} />

                                <br />
                                <br />
                                <TextField

                                    color="secondary"
                                    id="outlined-select-currency"
                                    select
                                    label="Decryption Algorithm"
                                    value={this.state.algorithms[0]}
                                    defaultValue="aes-256-cbc"
                                    helperText="Please select your algorithm"
                                    variant="outlined"
                                    onChange={this.handleAlgorithmChange}
                                >
                                    {this.state.algorithms.map((option, i) => (
                                        <MenuItem key={i} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <br />
                                <br />
                                <Button variant="contained" color="secondary" type="submit">
                                    Decrypt
                                </Button>

                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }
}