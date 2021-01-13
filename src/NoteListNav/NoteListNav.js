import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import CircleButton from '../CircleButton/CircleButton';
import './NoteListNav.css';
import {countNotesForFolder} from '../notes-helpers';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ApiContext from '../ApiContext';

export default class NoteListNav extends React.Component{
    static contextType = ApiContext;
    render(){
        const {folders=[], notes=[]} = this.context
    return(
        <div className='NoteListNav'>
            <ul className="NoteListNav_list">
                {folders.map(folder =>
                <li key={folder.id}>
                    <NavLink
                    className='NoteListNav_folder-link'
                    to={`/folder/${folder.id}`}>
                        <span className='NoteListNav_num-notes'>
                            {countNotesForFolder(notes, folder.id)}
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
}