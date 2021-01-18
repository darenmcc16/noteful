import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config';
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError';



export default class AddFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: "",
                touched: false
            }
        };
    }

    static contextType = ApiContext;

    updateName(name) {
        this.setState({
            name: {
                value: name,
                touched: true
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const {
            name
        } = this.state;
        console.log("Name:", name.value)


        fetch(`${config.API_ENDPOINT}/notes/`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
            })
            .then(res => {
                console.log(res)
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then(resJson => {
                console.log(resJson)
                this.context.addFolder(resJson)
                //this.props.onAddFolder(resJson)
            })
            .catch(error => {
                console.error({
                    error
                })
            })
    }
    
    render(){
        return(
            <form className='AddFolder' onSubmit={e => this.handleSubmit(e)}>
                <h2>Add Folder</h2>
                <div className="folder-name">
                    <label htmlFor='name'>Name</label>
                    <input type='text' className='name-control' name='name' id='name' onChange={e => this.updateName(e.target.value)} />
                    {this.state.name.touched && (<ValidationError message = {this.validateFolderName()} />)}
                    <button type='submit' className='folder'>
                        Add
                    </button>
                </div>
            </form>
        )
    }
}

AddFolder.propTypes = {
    addFolder: PropTypes.func
}