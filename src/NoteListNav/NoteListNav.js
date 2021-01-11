import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import CircleButton from '../CircleButton/CircleButton';
import './NoteListNav.css';

export default function NoteListNav(props){
    return(
        <div className='NoteListNav'>
            <ul className="NoteListNav_list">
                {props.folders.map(folder =>
                <li key={folder.id}>
                    <NavLink
                    className='NoteListNav_folder-link'
                    to={`/folder/${folder.id}`}>
                        <span className='NoteListNav_num-notes'>
                            {countNotesForFolder(props.notes, folder.id)}
                        </span>
                        {folder.name}
                    </NavLink>
                </li>
                )}
            </ul>
            <div className='NoteListNav_button-wrapper'>
                <CircleButton
                tag={Link}
                to='/add-folder'
                type='button'
                className="NoteListNav_add-folder-button">
                    <FontAwesomeIcon icon='plus' />
                    folder
                </CircleButton>
            </div>
        </div>
    )
}