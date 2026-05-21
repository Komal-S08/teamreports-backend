const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET ALL TEAMS
router.get('/', async (req, res) => {
    try {

        const result = await pool.query('SELECT * FROM teams');

        res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// ADD SAMPLE TEAM
router.get('/addsample', async (req, res) => {
    try {

        const result = await pool.query(
            `INSERT INTO teams (team_name)
             VALUES ('Cloud Team')
             RETURNING *`
        );

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
