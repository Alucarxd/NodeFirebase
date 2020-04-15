const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
// CONFIGURACIONES 
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// FUNCIONES INTERMEDIAS 
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
//ROTAS
app.use(require('./routes/index'))

// ARCHIVOS ESTATICOS 
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;