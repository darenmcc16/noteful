import React from 'react';
import './Note.css';
import {Link} from 'react-router-dom';
import {format} from 'date-fns';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


export default function Note(props){
    return(
        <div className='Note'>
            <h2 className='Note_title'>
                <Link to={`/note/${props.id}`}>
                    {props.name}
                </Link>
            </h2>
            <button className='Note_delete' type='button'>
                <FontAwesomeIcon icon='trash-alt' />
                {''}
                remove
            </button>
            <div className='Note_dates'>
                <div className='Note_dates-modified'>
                    modified
                    {''}
                    <span className='Date'>
                        {format(props.modified, 'Do MMM YYYY')}
                    </span>
                </div>
            </div>
        </div>
    )
}