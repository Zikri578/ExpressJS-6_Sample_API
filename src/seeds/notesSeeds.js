import express from "express";
import { faker } from "@faker-js/faker";
import db from "../../prisma/connection";

// membuat variabel notes_seeds
const notes_seeds = () => {
    // membuat variabel fake title
    const fake_title = faker.definitions.title;

    // membuat variabel fake content
    const fake_content = faker.lorem.paragraph();

    // membuat variabel author
    const fake_author = faker.internet.userName();

    // menampilkan output
    // console.log({ fake_title, fake_content, fake_author });

    // memasukkan kedalam database
    db.notes.create(
        {
            data: {
                title: fake_title,
                content: fake_content,
                author: fake_author,
            },
        }
    )

        .then((result) => {
            // menampilkan pesan ketika datanya sudah berhasil masuk ke database
            console.info(`Title : ${result.title}, Content : ${result.content}, Author : ${result.author} Berhasil dibuat`)
        }).catch((err) => {
            // menampilkan pesan ketika datanya tidak berhasil masuk ke database
            console.info(err.message);
        });
}

// melakukan perulangan data ketika datanya sampai 10
for (let index = 0; index < 10; index++) {
    // memanggil variabel yang ada diatas
    notes_seeds();
}