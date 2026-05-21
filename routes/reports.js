const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const pool = require('../config/db');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

AWS.config.update({
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

// UPLOAD REPORT
router.post('/upload', upload.single('report'), async (req, res) => {

    try {

        const file = req.file;

        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: Date.now() + '-' + file.originalname,
            Body: file.buffer
        };

        const s3Upload = await s3.upload(params).promise();

        const result = await pool.query(
            `INSERT INTO reports
            (employee_id, report_name, s3_url, status)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [
                1,
                file.originalname,
                s3Upload.Location,
                'UPLOADED'
            ]
        );

        res.json({
            message: 'Report uploaded successfully',
            report: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
});

// GET REPORTS
router.get('/', async (req, res) => {

    try {

        const result = await pool.query(
            'SELECT * FROM reports'
        );

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;
