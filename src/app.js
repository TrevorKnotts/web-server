const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

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
        helpText: 'Help text', 
        title: 'Help', 
        name: 'Trevor Knotts'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }
    geocode(req.query.address, (err, data) => {
        forecast(data.latitude, data.longitude, (err, data) => {
            res.send({
                info: data
            });
        });
    });
});

// app.get('/products', (req, res) => {
//     if(!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         });
//     }
//     console.log(req.query.search);
//     res.send({
//         products: []
//     });
// });
app.get('/help/*', (req, res) => {
    res.render('notfound', {
        title: '404',
        name: 'Trevor Knotts',
        message: 'Help article not found!'
    });
});

app.get('*', (req, res) => {
    res.render('notfound', {
        title: '404',
        name: 'Trevor Knotts',
        message: 'Page not found!'
    });
});

app.get('/help/*', (req, res) => {
    res.render('notfound', {
        title: '404',
        name: 'Trevor Knotts',
        message: 'Help article not found!'
    });
});

app.get('*', (req, res) => {
    res.render('notfound', {
        title: '404',
        name: 'Trevor Knotts',
        message: 'Page not found!'
    });
});

// app.get('/products', (req, res) => {
//     if(!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         });
//     }
//     console.log(req.query.search);
//     res.send({
//         products: []
//     });
// });

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});