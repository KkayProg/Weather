// filepath: /Users/kirillonucin/Desktop/EducationSkillbox/WeatherApp/weather-app/server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); // Импортируем cors

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors()); // Используем cors

app.post('/save-location', (req, res) => {
  const userData = req.body;
  const filePath = path.join(__dirname, 'user-data.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err && err.code !== 'ENOENT') {
      console.error(err);
      return res.status(500).send('Error reading file');
    }

    let jsonData = [];
    if (data) {
      jsonData = JSON.parse(data);
    }

    jsonData.push(userData);

    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error writing file');
      }

      res.status(200).send('Data saved successfully');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});