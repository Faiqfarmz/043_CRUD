const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// 1. Konfigurasi Connection Pool ke PostgreSQL
const pool = new Pool({
    user: 'postgres',          // Username PostgreSQL Anda (default biasanya 'postgres')
    host: 'localhost',          // Host database
    database: 'Mahasiswa',      // Nama database sesuai tugas
    password: 'Poin9090',  // GANTI dengan password PostgreSQL Anda!
    port: 5432,                 // Port default PostgreSQL
});

// Middleware agar Express bisa membaca JSON (opsional tapi baik digunakan)
app.use(express.json());

// 2. Membuat Method GET untuk Mengambil Data dari Tabel Biodata
app.get('/biodata', async (req, res) => {
    try {
        // Mengambil koneksi dari pool dan menjalankan query
        const result = await pool.query('SELECT * FROM biodata');
        
        // Mengembalikan respons berupa data mahasiswa
        res.status(200).json({
            message: "Berhasil mengambil data biodata",
            data: result.rows
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Terjadi kesalahan pada server atau database" });
    }
});

// 3. Menjalankan Server Express
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});

//post
app.post('/biodata', async (req, res) => {
    try {
        const { id, nama, nim, kelas } = req.body;
        const result = await pool.query(
            'INSERT INTO biodata (id, nama, nim, kelas) VALUES ($1, $2, $3, $4) RETURNING *',
            [id, nama, nim, kelas]
        );
        res.status(201).json({
            message: "Berhasil menambahkan data biodata",
            data: result.rows[0]
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Terjadi kesalahan pada server atau database" });
    }
});
//put
app.put('/biodata/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, nim, kelas } = req.body;
        const result = await pool.query(
            'UPDATE biodata SET nama = $1, nim = $2, kelas = $3 WHERE id = $4 RETURNING *',
            [nama, nim, kelas, id]
        );
        res.status(200).json({
            message: "Berhasil memperbarui data biodata",
            data: result.rows[0]
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Terjadi kesalahan pada server atau database" });
    }
});
