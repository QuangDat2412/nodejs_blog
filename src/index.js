const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const app = express();
const port = 3000;
const route = require('./routes');
const db = require('./config/db');
app.use(express.static(path.join(__dirname, 'public')));
db.connect();

app.use(
    express.urlencoded({
        extended: true,
    })
);
// XMLHHttpRequest, fetch, axios
app.use(express.json());

// HTTP Loger
app.use(morgan('combined'));
// Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    })
);
app.use(methodOverride('_method'));

app.get('/middleware', function (req, res, next) {
    res.json({
        message: 'Halo',
    });
});
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
