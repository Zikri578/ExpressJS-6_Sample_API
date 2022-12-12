import { PrismaClient } from "@prisma/client";

// membuat variabel db
const db = new PrismaClient();

// melakukan db export untuk semua file supaya masuk ke database
export default db;