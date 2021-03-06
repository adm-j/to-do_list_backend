const {Note} = require("../models/Note");

exports.addNote = async (req, res) => {
    try {
        const note = new Note(req.body);
        Note.findOne.author = req.params.user_id;
        const returnedValue = await note.save();
        
        console.log(returnedValue);
        res.status(201).send(returnedValue);
    } catch (error) {
        console.log(error);
        console.log(req.body)
        res.status(400).send(error);
    }
}

exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.note_id);
        res.status(200).send(note);
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "User not found"});
        
    }
}

exports.getNotes = async (req, res) => {
    try {
        const userNotes = await Note.find({author: req.params.user_id});
        res.status(200).send(userNotes);        
    } catch (error) {
        console.log(error);
        console.log(req.params)
        res.status(500).send({message: "no notes found"});
    }
}