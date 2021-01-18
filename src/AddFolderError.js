import React, { Component } from 'react';

export default class AddFolderError extends Component{
    constructor(props){
        super(props);
        this.state={
            hasError: false
        };
    }

    static getDerivedStateFromError(error){
        return {hasError: true};
    }

    render(){
        if(this.state.hasError){
            return(
                <h2>Count not add folder</h2>
            );
        }
        return this.props.children;
    }
}