import express from "express";
import dotenv from "dotenv";
// untuk membaca dotenv
dotenv.config();
import routes_notes from "./routes/notesRoutes.js";

// membuat objek port
const { PORT } = process.env;

// membuat variabel app
const app = express();

// menambahkan middleware dalam bentuk json
app.use(express.json());

// menambahkan route
app.use(routes_notes);

// menampilkan listener pesan PORT bahwa servernya sudah berjalan
app.listen(PORT, () => {
    // menampilkan pesan bahwa server berhasil dijalankan
    console.log("Server Berhasil Dijalankan..");
}) 