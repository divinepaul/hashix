import React, { Component } from 'react';

export class ConfigEncrypt extends Component {

    constructor(props) {
        super(props)

        this.state = {

            files: this.props.location.state.files

        }


    }

    render() {

        return (
            
            <h1>
                {this.state.files.map(function (item, i) {
                    return <p key={i}>{item}</p>;
                })}
            </h1>
        );
    }
}