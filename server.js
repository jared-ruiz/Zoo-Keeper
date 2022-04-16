const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const fs = require('fs');
const path = require('path');
const { query } = require('express');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

//testing url for development only: https://peaceful-forest-08175.herokuapp.com/api/animals

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

//parse incoming JSON data
app.use(express.json());

//makes all files in public path static files usable during live server
app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

const { animals } = require('./data/animals');

app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
})