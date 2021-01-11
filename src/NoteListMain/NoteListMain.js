import React from 'react';
import CircleButton from '../CircleButton/CircleButton';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './NoteListMain.css';


export default function NoteListMain(props){
    return(
        <section className='NoteListMain'>
            <ul>
                {props.note.map(note =>
                <li key={note.id}>
                    <Note
                    id={note.id}
                    name={note.name}
                    modified={note.modified}
                    />
                </li>
                )}
            </ul>
            <div className='NoteListMain_button-container'>
                <CircleButton
                tag={Link}
                to='/add-note'
                type='button'
                className='NoteListMain_add-note-button'>
                    <FontAwesomeIcon icon='plus' />
                    <br />
                    Note
                </CircleButton>
            </div>
        </section>
    )
}

NoteListMain.defaultprops = {
    notes: [],
}