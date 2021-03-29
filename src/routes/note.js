const {Router} = require("express");
const noteRouter = Router();

const {addNote, deleteNote} = require("../controllers/note")

noteRouter.post("/notes/:user_id", addNote)
noteRouter.delete("/notes/:note_id", deleteNote)
// noteRouter.get("/notes/:user_id", //showAllNotes)

module.exports = {noteRouter};