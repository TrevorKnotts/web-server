const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();

// Define paths for Express config
const dir = path.join(__dirname, '../public/');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(dir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Trevor Knotts'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Trevor Knotts'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help text'
    });
});

app.get('/weather', (req, res) => {
    res.send({
        latitude: 40,
        longitude: 75, 
        location: 'Somewhere'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});