const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// CREATE EMPLOYEE
router.post('/', async (req, res) => {
    try {
        const { employee_name, email, team_id } = req.body;

        const result = await pool.query(
            'INSERT INTO employees (employee_name, email, team_id) VALUES ($1, $2, $3) RETURNING *',
            [employee_name, email, team_id]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// GET ALL EMPLOYEES
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM employees');

        res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
router.get('/addsample', async (req, res) => {
    try {

        const result = await pool.query(
            `INSERT INTO employees (employee_name, email, team_id)
             VALUES ('Komal', 'komal@gmail.com', 1)
             RETURNING *`
        );

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;
