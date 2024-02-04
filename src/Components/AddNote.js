import React, { useContext, useState } from 'react'
import NoteContext from '../Context/Notes/NoteContext';
import '../index.css'

const AddNote = () => {
    const c = useContext(NoteContext);
    const { addNote } = c; // Destructuring

    // resion behind to create state of notes is -> Every time user is adding the note the value if getting changed thats why
    const [note, setNote] = useState({
        title: "",
        description: "",
        tag: ""
    })

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    } // Important function

    const addnote = (e) => {
        e.preventDefault(); // prevent rekoading at the time of sumbit
        addNote(note.title, note.description, note.tag); // ES6 function passing args
    }


    return (
        <div id='add-item-style' className='container'>
            <h2>Add Your Note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    {/* google suggesting autoComplete attribute for input tag -> included in username and password field */}
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" autoComplete='username' onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" autoComplete='current-password' className="form-control" id="description" name='description' onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" autoComplete='current-password' className="form-control" id="tag" name='tag' onChange={onchange} />
                </div>
                <button type="submit" className="btn btn-dark" onClick={addnote}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
