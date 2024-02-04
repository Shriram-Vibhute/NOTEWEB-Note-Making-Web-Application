const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { query, validationResult, body } = require('express-validator');


// Implementation of CRUD -> Create | Read | Update | Delete

// ROUTE 1: Fetching user Notes: GET -> /api/notes/fetchallnotes -> login required -> READ
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occured")
    }
})


// ROUTE 2: Adding user Notes: GET -> /api/notes/addnote -> login required -> CREATE
router.post('/addnote', fetchuser, [
    body('title', 'Title should have minium length of 3').isLength({ min: 3 }), // These are the validations form express validator site
    body('description', 'Descripyion should have minium length of 3').isLength({ min: 3 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body; // Array destructuring
        const result = validationResult(req); // result will create after you send a json from thunderClient
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() }); // In models/schema we assign all branches as required 
        }
        
        const note = new Notes({
            title, description, tag, user: req.user.id
        }) // Why we are creating dynamic objects -> as we have to generate new id for every notes because the key must be unique for every notes
        const saveNote = await note.save();
        res.json(saveNote);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occured")
    }
})


// ROUTE 3: Adding user Notes: PUT -> /api/notes/updatenote/:id -> login required -> UPDATE
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    // :id is id of note and not of user
    try {
        const { title, description, tag } = req.body; // Array destructuring for trimming down the title desp, tag

        const newNote = {}; // Creating a new note to update in place of previous note
        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag

        let note = await Notes.findById(req.params.id) // parms -> /updatenote/:id This parameter
        console.log(note); // Note is object
        if (!note) {
            return res.status(404).send("Note not found");
        } // 1st check -> If note not found
        // console.log(note.user.toString());
        // console.log(req.user.id);
        // console.log(req.params.id);
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Unothorized User');
        } // Explination -> 
        // note.user.toString() -> note.user is a foregion key which connets both user and his/her notes ->
        // Why we are created this -> The user only have access of his/her notes not others
        // note.user is already a string -> why toString() -> returning new object not string thats why toString()
        // req.user -> fetchuser middlewere -> it will fetch the id corrosponding to the header auth-token user

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true }); // Finding the the note and uoadete it -> new: true : new content will be created

        res.json({ note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occured")
    }
})

// ROUTE 4: Delete user Notes: DELETE -> /api/notes/deletenote/:id -> login required -> DELETE
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // const { title, description, tag } = req.body; // Array destructuring for trimming down the title desp, tag

        // const newNote = {}; // Creating a new note to update in place of previous note
        // if (title) newNote.title = title;
        // if (description) newNote.description = description;
        // if (tag) newNote.tag = tag

        let note = await Notes.findById(req.params.id) // parms -> /updatenote/:id This parameter
        console.log(note);
        if (!note) {
            return res.status(404).send("Note not found");
        } // 1st check -> If note not found
        // console.log(note.user.toString());
        // console.log(req.user.id);
        // console.log(req.params.id);
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Unothorized User');
        } // Explination -> 
        // note.user.toString() -> note.user is a foregion key which connets both user and his/her notes ->
        // Why we are created this -> The user only have access of his/her notes not others
        // note.user is already a string -> why toString()
        // req.user -> fetchuser middlewere -> it will fetch the id corrosponding to the header auth-token user

        note = await Notes.findByIdAndDelete(req.params.id) // Finding the the note and uoadete it -> new: true : new content will be created

        res.json({ note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occured")
    }
}) // Done by Myself

module.exports = router