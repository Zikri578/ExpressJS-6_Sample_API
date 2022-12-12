import express from "express";
import { note_create, note_read } from "../controllers/note_controller.js";


// membuat variabel route notes untuk memanggil express router
const routes_notes = express.Router();

// membuat route create notes menggunakan method post
routes_notes.post("/api/notes/create", note_create);

// membuat route read notes menggunakan method get
routes_notes.get("/api/notes/read", note_read);

// memanggil secara default
export default routes_notes;