const newsRouter = require('./news');
const me = require('./me');
const coursesRouter = require('./courses');
const siteRouter = require('./site');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/me', me);
    app.use('/courses', coursesRouter);
    app.use('/', siteRouter);
}

module.exports = route;
