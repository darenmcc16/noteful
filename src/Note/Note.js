import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import config from '../config'

//When we implement the delete button it changes the Note component from a stateless to a stateful
//so thats why it gets changed from a function to a class

export default class Note extends React.Component {
    //set up the static default props
    static defaultProps={
        onDeleteNote: () => {},
    }
    static ContextType=ApiContext;
//create a handled when clicked function
    handleClickDelete = e => {
        e.preventDefault()
        const noteId = this.props.id
//have to create an API call to remove the note from the server
        fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
        .then(res => {
            if(!res.ok)
            return res.json().then(e => Promise.reject(e))
            return res.json()
        })
        .then(() =>{
            this.context.deleteNote(noteId)
            this.props.onDeleteNote(noteId)
        })
        .catch(error => {
            console.error({error})
        })
    }
    render(){
  return (
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${props.id}`}>
          {props.name}
        </Link>
      </h2>
      <button className='Note__delete' type='button'
      onClick={this.handleClickDelete}
      >
        <FontAwesomeIcon icon='trash-alt' />
        {' '}
        remove
      </button>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {format(modified, 'Do MMM YYYY')}
          </span>
        </div>
      </div>
    </div>
  )
}
}