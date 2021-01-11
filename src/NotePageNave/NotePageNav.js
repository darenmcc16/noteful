import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './NotePageNav.css';
import CircleButton from '../CircleButton/CircleButton';


export default function NotePageNav(props){
    return(
        <div className='NotePageNav'>
            <CircleButton
            tag='button'
            role='link'
            onClick={() => props.history.goBack()}
            className='NotePageNav_back-button'>
                <FontAwesomeIcon icon='chevron-left' />
                <br />
            </CircleButton>
            {props.folder && (
                <h3 className='NotePageNav_folder-name'>
                    {props.folder.name}
                </h3>
            )}
        </div>
    )
}

NotePageNav.defaultProps={
    history: {
        goBack: () => {}
    }
}
