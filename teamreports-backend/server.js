const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'database-1.c03ioe6a6qqf.us-east-1.rds.amazonaws.com',
    database: 'postgres',
    password: 'TeamReports123',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

app.get('/', (req, res) => {
    res.send('Backend API Running Successfully');
});

app.get('/employees', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM employees');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Database Error');
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
