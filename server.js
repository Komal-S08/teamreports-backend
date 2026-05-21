const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const s3 = new AWS.S3({
    region: process.env.AWS_REGION
});

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.send('Team Reports Backend Running');
});

app.post('/upload', upload.single('report'), async (req, res) => {
    try {

        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: Date.now() + '-' + req.file.originalname,
            Body: req.file.buffer
        };

        const data = await s3.upload(params).promise();

        res.json({
            message: 'File uploaded successfully',
            fileUrl: data.Location
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Upload failed'
        });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
