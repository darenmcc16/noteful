import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './NotePageNav.css';
import CircleButton from '../CircleButton/CircleButton';
import ApiContext from '../ApiContext';
import { findFolder, findNote } from '../notes-helpers';


export default class NotePageNav extends React.Component{
    //defaultProps gets moved into the class
    static defaultProps = {
        history: {
            goBack: () => {}
        },
        match: {
            params: {}
        }
    }
    static contextType = ApiContext;
    render(){
        const {notes, folders, } = this.context
        const{noteId} = this.props.match.params
        const note = findNote(notes, noteId) || {}
        const folder = findFolder(folders, note.folderId)
    return(
        <div className='NotePageNav'>
            <CircleButton
            tag='button'
            role='link'
            //do this.props.history.goBack() because it is in the static props
            onClick={() => this.props.history.goBack()}
            className='NotePageNav_back-button'>
                <FontAwesomeIcon icon='chevron-left' />
                <br />
            </CircleButton>
            {folder && (
                <h3 className='NotePageNav_folder-name'>
                    {folder.name}
                </h3>
            )}
        </div>
    )
}
}


