const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const Papa = require('papaparse');
const db = require('./database')

const app = express();
const port = 3001;
const cors = require('cors');

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors());

// Sample data - replace this with your actual data or connect to a database
let documents = [];

// Endpoint to get the list of documents
app.get('/api/documents', (req, res) => {
  res.json(documents);
});

app.post('/api/submit-file', upload.single('csvFile'), (req, res) => {
  const csvFile = req.file;
  const method = req.body.method;
  console.log(csvFile)
  const csvFilePath = req.file.path;

  fs.readFile(csvFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading CSV file:', err);
            return res.status(500).send('Error reading CSV file');
        }

        Papa.parse(data, {
            header: true,
            complete: (results) => {
                console.log('Parsed CSV data:', results.data);
                x = results.data
                y = x.map((item, index) => {
                  return { 'id': index,'content': item['text'] , 'translation': item['text'].split("").reverse().join("")};
                })
                res.status(200).json(y);
            }
        });
    });


});

app.post('/api/submit-manual', (req, res) => {
  const manualText = req.body.manualText;
  const method = req.body.method;
  
  console.log(manualText)
  x = manualText.split(/\n\s*\n/)
  console.log(x)

  y = x.map((item, index) => {
    return { 'id': index,'content': item , 'translation': item.split("").reverse().join("")};
  })
  console.log(y)
  
  documents = y
  res.status(200).json(y);


});

// Endpoint to submit translations
app.post('/api/submit-translation', (req, res) => {
  const { documentId, translation } = req.body;

  // Find the document by ID
  const document = documents.find(doc => doc.id === documentId);

  if (!document) {
    return res.status(404).json({ error: 'Document not found' });
  }

  // Assuming you update the document with the translation
  document.translation = translation;

  // Remove the document from the list
  documents = documents.filter(doc => doc.id !== documentId);

  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});