const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');

// Set up the express app
const app = express();

// Use body-parser to parse the request body
app.use(bodyParser.json());

// Set up the file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Read the existing reports from the JSON file
let reports;
try {
    reports = JSON.parse(fs.readFileSync('reports.json'));
} catch (error) {
    reports = [];
}
// recent-reports endpoint
app.get('/recent-reports', (req, res) => {
    // read the reports.json file
    fs.readFile('reports.json', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Error reading reports.json file' });
            return;
        }
        // parse the data to json
        const reports = JSON.parse(data);
        // send the recent reports
        res.json(reports);
    });
});
// Handle form submission
app.post('/submit-report', upload.single('image'), (req, res) => {
    const report = {
        id: Date.now(),
        trailName: req.body['trail-name'],
        condition: req.body.condition,
        image: req.file.path,
        timestamp: new Date()
    };
    reports.push(report);
    fs.writeFileSync('reports.json', JSON.stringify(reports));
    res.status(201).json({
        message: 'Ski report added successfully',
        report: report
    });
});

// Handle report deletion
app.delete('/delete-report/:id', (req, res) => {
    const reportIndex = reports.findIndex(report => report.id === parseInt(req.params.id));
    if (reportIndex === -1) {
    res.status(404).json({
    message: 'Ski report not found'
    });
    } else {
    const deletedReport = reports.splice(reportIndex, 1);
    fs.writeFileSync('reports.json', JSON.stringify(reports));
    res.status(200).json({
    message: 'Ski report deleted successfully',
    report: deletedReport[0]
    });
    }
    });
    
    // Handle report retrieval
    app.get('/get-report/:id', (req, res) => {
    const report = reports.find(report => report.id === parseInt(req.params.id));
    if (!report) {
    res.status(404).json({
    message: 'Ski report not found'
    });
    } else {
    res.status(200).json(report);
    }
    });
    
    // Handle report update
    app.patch('/update-report/:id', (req, res) => {
    const reportIndex = reports.findIndex(report => report.id === parseInt(req.params.id));
    if (reportIndex === -1) {
    res.status(404).json({
    message: 'Ski report not found'
    });
    } else {
    const updatedReport = {
    ...reports[reportIndex],
    ...req.body
    };
    reports.splice(reportIndex, 1, updatedReport);
    fs.writeFileSync('reports.json', JSON.stringify(reports));
    res.status(200).json({
    message: 'Ski report updated successfully',
    report: updatedReport
    });
    }
    });
    
    // Start the server
    app.listen(5503, () => {
    console.log('Server started on http://localhost:5503');
    });