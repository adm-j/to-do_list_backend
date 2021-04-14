const {Router} = require("express");
const noteRouter = Router();

const {addNote, deleteNote, getNotes} = require("../controllers/note")

noteRouter.post("/notes/:user_id", addNote)
noteRouter.delete("/notes/:note_id", deleteNote)
noteRouter.get("/notes/:user_id", getNotes)

module.exports = {noteRouter};