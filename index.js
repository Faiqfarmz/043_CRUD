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

