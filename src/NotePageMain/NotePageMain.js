import React from 'react';
import './NotePageMain.css';
import Note from '../Note/Note';
import ApiContext from '../ApiContext';
import {findNote} from '../notes-helpers';

export default class NotePageMain extends React.Component{
    static defaultProps={
        match: {
            params: {}
        }
    }
    //Need the ApiContext because of the delete button and the need to take off the server
    static contextType = ApiContext
//we put in the handleDeleteNote because we implemented the delete button on the Note page and it gets passed through on this one
    handleDeleteNote = noteId => {
        this.props.history.push('/')
    }

    render(){
        const {notes=[]} = this.context
        const {noteId} = this.props.match.params
        const note = findNote(notes, noteId) || {content: ''}
    return(
        <section className='NotePageMain'>
            <Note
            id={note.id}
            name={note.name}
            modified={note.modified}
            onDeleteNote={this.handleDeleteNote}
            />
            <div className='NotePageMain_content'>
                {note.content.split(/\n \r|\n/).map((para,i) =>
                <p key={i}>{para}</p>
                )}
            </div>
        </section>
    )
}
}