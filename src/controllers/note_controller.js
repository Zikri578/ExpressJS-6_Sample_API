import { parse } from "dotenv";
import { request, response } from "express";
import db from "../../prisma/connection";

// membuat data note
export const note_create = async (req = request, res = response) => {
    try {
        // membuat variabel data yang isinya permintaa body
        const data = await req.body;

        // membuat variabel createNote yang isinya mengambil database user yang akan dibuat
        const createNotes = await db.notes.create(
            {
                // mengambil variabel data yang yang ada di dalam schema database
                data: {
                    title: data.title,
                    content: data.content,
                    author: data.author,
                }
            }
        );

        // mengembalikan permintaan status kedalam bentuk json
        return res.status(200).json(
            {
                // menampilkan pesan bahwa data berhasil dibuat
                success: true,
                data: createNotes,
                message: "Data Note Berhasil dibuat",
            }
        );

    } catch (error) {
        // mengembalikan respons kedalam bentuk json
        return res.status(500).json(
            {
                // menampilkan pesan bahwa data tidak berhasil dibuat
                success: false,
                message: error.message,
            }
        )
    }
}

// membaca notes
export const note_read = async (req = request, res = response) => {
    try {
        // cara 1 : membuat objek page dengan valuenya 1 dan limit valuenya 10 yang nilainya dimasukkan query (hasilnya : String)
        let { page = 1, limit = 10, order = "desc" } = req.query;

        // membuat variabel skip
        let skip = (page - 1) * limit;

        // membuat variabel result untuk mengambil variabel db serta mencari data
        const result = await db.notes.findMany(
            {
                // memanggil variabel skip data serta menampilkan hasil
                skip: skip,

                // untuk mengembil data dengan diubah tipe datanya menjadi int serta memanggil objek limit
                take: parseInt(limit),

                // mengurutkan data yang terbaru ke terlama
                orderBy: {
                    id: order,     // 1->100, "desc": 100->1
                }
            }
        )

        // mendapatkan infomasi total secara keseluruhan
        const resultCount = await db.notes.count();

        // melakukan generate total page untuk menghitung page
        const totalPage = Math.ceil(resultCount / limit);

        // mengembalikan status pesan berhasil dibaca
        return res.status(201).json(
            {
                success: true,

                // posisi page sekarang ini
                current_page: parseInt(page),

                // menghitung total page
                total_page: totalPage,

                // menghitung total data
                total_data: resultCount,

                // menampilkan hasil
                message: result

            }
        )
    } catch (error) {
        // menampilkan status pesan gagal
        return res.status(501).json(
            {
                // menampilkan pesan bahwa data tidak berhasil dibuat
                success: false,
                message: error.message,
            }
        )
    }
}