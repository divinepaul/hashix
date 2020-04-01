import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { FaArrowLeft } from "react-icons/fa";

import "./config_encrypt.component.css"

import Button from '@material-ui/core/Button';
import { Card, CardContent, CardActions } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { TiDelete } from "react-icons/ti";
import MenuItem from '@material-ui/core/MenuItem';
import cipherEncryption from '../../services/fileencrypt.services'

const { dialog } = window.require('electron').remote;
export class ConfigEncrypt extends Component {

    constructor(props) {
        super(props)

        this.state = {
            algorithm:"aes-256-cbc",
            algorithms: ['aes-256-cbc'],
            files: [],
            password:''
        }


    }

    handlePasswordChange =(event)=>{
        this.setState({password:event.target.value},()=>{
            console.log(this.state.password);
        });
        
    }
    handleAlgorithmChange=(event)=>{
        this.setState({algorithm:event.target.value},()=>{
            console.log(this.state.algorithm);
        });
    }


    handleFormSubmit=(event)=>{
        event.preventDefault();
        if(!this.state.files.length){
            dialog.showMessageBoxSync({
                type:"info",
                title:"No Files Selected",
                message:"No Files Selected"
            },(response)=>{
                
            })
        }else{

            const stream = new cipherEncryption();
            stream.setFiles(this.state.files);
            stream.setAlgorithm(this.state.algorithm);
            stream.setPassword(this.state.password);
            stream.checkFolder();
            stream.zipFiles();
            // stream.encryptFiles();


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
        newArr.splice(file, 1)
        this.setState({ files: newArr });
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
                <AppBar position="static" color="transparent">
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

                    <br />
                    <Card>
                        <CardContent>
                            <h1>Configure Encryption</h1>
                            <br />
                            <form autoComplete="off" onSubmit={this.handleFormSubmit}>

                                <TextField id="outlined-basic" label="Password" variant="outlined" color="secondary" onChange={this.handlePasswordChange} type="password" required value={this.state.password}/>

                                <br />
                                <br />
                                <TextField
                                
                                    color="secondary"
                                    id="outlined-select-currency"
                                    select
                                    label="Encryption Algorithm"
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
                                    Encrypt
                                </Button>

                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }
}