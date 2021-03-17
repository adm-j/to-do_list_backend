const {Router} = require("express");
const noteRouter = Router();

const {addNote, deleteNote} = require("../controllers/note")

noteRouter.post("/notes/:user_id", addNote) //fetch user notes
noteRouter.delete("/notes/:user_id", deleteNote)

module.exports = {noteRouter};