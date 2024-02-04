import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const Host = "http://127.0.0.1:5000";
    const NoteInit = [];
    const [note, setNote] = useState(NoteInit);

    // CRUD Opertion functions
    // GET Notes 
    const getNotes = async () => {
        const response = await fetch(`${Host}/api/notes/fetchallnotes`, {
            'method': "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        })
        const json = await response.json();
        console.log(json);
        setNote(json);
    };

    // CRUD Opertion functions
    // Add Note 
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${Host}/api/notes/addnote`, {
            'method': "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })

        const json = await response.json();
        console.log(json);

        setNote(note.concat([json]));
    };

    // Delete Note
    async function deleteNote(id) {
        const response = await fetch(`${Host}/api/notes/deletenote/${id}`, {
            'method': "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        })
        const json = await response.json();
        console.log(json);
        // console.log("id :" + id);

        const newNote = note.filter((note) => {
            return note._id !== id;
        }) // Array filter method
        setNote(newNote)
    }

    // Edit Note
    const editNote = async (title, description, tag, id) => {
        const response = await fetch(`${Host}/api/notes/updatenote/${id}`, {
            'method': "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })
        const json = await response.json();
        console.log(json);

        const note_DEEPCOPY = JSON.parse(JSON.stringify(note));
        // Logic to edit data on UI
        for (let i = 0; i < note_DEEPCOPY.length; i++) {
            const noteItem = note_DEEPCOPY[i];
            if (noteItem._id === id) {
                note_DEEPCOPY[i].title = title;
                note_DEEPCOPY[i].description = description;
                note_DEEPCOPY[i].tag = tag;
                break;
            }
        }
        setNote(note_DEEPCOPY);
    }


    return (
        <NoteContext.Provider value={{ note, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )


    // Passing state and set state function to all the components
    // const s1 = {
    //     "name": "Dexter",
    //     "class": 'fourth Year'
    // }
    // const [state, setState] = useState(s1); // For changing the state of text after some time
    // const update = () => {
    //     setTimeout(() => {
    //         setState({
    //             "name": "Shriram",
    //             "class": 'last Year'
    //         })
    //     }, 3000);
    // }

    // return (
    //     <NoteContext.Provider value={{ state: state, update: update }}>
    //         {/* Modern Js Syntex | Old -> {state: state, update: update} */}
    //         {props.children}
    //     </NoteContext.Provider>
    // )
}

export default NoteState;