import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../Context/Notes/NoteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const c = useContext(NoteContext);
    const navigate = useNavigate();
    const { note, getNotes, editNote } = c; // Destructuring
    useEffect(() => {
        // console.log(note); // Returns an array containing objects of notes ->
        if(localStorage.getItem('token')) {
            getNotes();
        }
        else {
            navigate('/login');
        }        
        // eslint-disable-next-line
    }, [])

    const [Note, setNote] = useState({
        id: "",
        etitle: "",
        edescription: "",
        etag: "",
    })

    const ref = useRef(null);
    const refClose = useRef(null);

    const updateNote = (currentNote) => {
        ref.current.click();
        if (currentNote) {
            setNote({
                id: currentNote._id,
                etitle: currentNote.title,
                edescription: currentNote.description,
                etag: currentNote.tag,
            });
        } else {
            // If currentNote is not provided, reset the Note state
            setNote({
                id: "",
                etitle: "",
                edescription: "",
                etag: "",
            });
        }
    }
    

    const onchange = (e) => {
        setNote({ ...Note, [e.target.name]: e.target.value });
    } // Important function

    const handleClick = (e) => {
        editNote(Note.etitle, Note.edescription, Note.etag, Note.id);
        refClose.current.click();
        console.log(Note)
    }

    return (
        <>
            
            <AddNote />
            {/* modal */}
            <h2 style={{color:'white'}} className=' my-5 text-center'>Your Notes</h2>
            <div className="container">
                <button style={{ display: 'none' }} ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Update your Note</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className='my-3'>
                                    <div className="mb-3">
                                        <label htmlFor="etitle" className="form-label">Title</label>
                                        {/* google suggesting autoComplete attribute for input tag -> included in username and password field */}
                                        <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" autoComplete='username' onChange={onchange} value={Note.etitle} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="edescription" className="form-label">Description</label>
                                        <input type="text" autoComplete='current-password' className="form-control" id="edescription" name='edescription' onChange={onchange} value={Note.edescription} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="etag" className="form-label">Tag</label>
                                        <input type="text" autoComplete='current-password' className="form-control" id="etag" name='etag' onChange={onchange} value={Note.etag} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container all-notes">
                <h2>All Notes</h2>
                <div className="container notes row">
                    {note.map((element) => {
                        return <NoteItem key={element._id} note={element} updateNote={updateNote} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes