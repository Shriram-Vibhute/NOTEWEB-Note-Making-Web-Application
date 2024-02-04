import React, { useState, useContext } from 'react'
import { Trash, FileEdit } from 'lucide-react';
import NoteContext from '../Context/Notes/NoteContext';
import '../index.css';

const NoteItem = (props) => {
    const style = {
        cursor: "pointer"
    }

    const c = useContext(NoteContext);
    const { deleteNote } = c; // Destructuring
    
    const deletenote = (id)=> {
        deleteNote(id);
    }

    return (
        <div id='card-style' className="card col-md-3 my-2 mx-5">
            <div className="card-body">
                <h5 className="card-title">{props.note.title}</h5>
                <p className="card-text">{props.note.description}</p>
                <div className="icons">
                    <Trash color="red" size={20} strokeWidth={1.3} style={{cursor : "pointer"}} onClick={() => {deletenote(props.note._id)}}/>
                    <FileEdit color="blueviolet" size={20} strokeWidth={1.3} className='mx-3' style={style} onClick={() => props.updateNote(props.note)}/>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
