import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNave/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import dummyStore from '../dummy-store';
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import './App.css';
import ApiContext from '../ApiContext';
import config from '../config';
import AddFolder from '../Addfolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import AddFolderError from '../AddFolderError';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };
//We put in an API call to both notes and folders
    componentDidMount() {
        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`),
            fetch(`${config.API_ENDPOINT}/folders`)
        ])
        .then(([notesRes, foldersRes]) => {
            if(!notesRes.ok)
            return notesRes.json().then(e => Promise.reject(e));
            if(!foldersRes.ok)
            return foldersRes.json().then(e => Promise.reject(e));

            return Promise.all([notesRes.json(), foldersRes.json()]);
            })
        .then(([notes, folders]) => {
            this.setState({notes, folders});
        })
        .catch(error => {
            console.error({error});
        });
    }

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };

    handleAddFolder = (folder) => {
        this.setState({
            folders: [...this.state.folders, folder]
        });
    }
        
    handleAddNote = (note) => {
            this.setState({
                    notes: [...this.state.notes, note]
            })
    }

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                        />
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
                    {/* render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId) || {};
                        const folder = findFolder(folders, note.folderId);
                        return <NotePageNav {...routeProps} folder={folder} />;
                    }} */}
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    //we get rid of the render with in the Route because now with context the component will take us there
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                        />
                ))}
                <Route
                    path="/note/:noteId" component={NotePageMain} />
            </>
        );
    }
    updateNote = () => {};

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote,
            addFolder: this.handleAddFolder,
            addNote: this.handleAddNote
        };
        return (
            <AddFolderError>
            <ApiContext.Provider value={value}>
            <div className="App">
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                        <FontAwesomeIcon icon="check-double" />
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
                <div>
                    <AddFolder onAddFolder={(folder) => this.handleAddFolder(folder)}/>
                </div>
                <div>
                    <AddNote />
                </div>
            </div>
            </ApiContext.Provider>
            </AddFolderError>
        );
    }
}

export default App;