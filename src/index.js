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
    }),
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
    }),
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
document.addEventListener('DOMContentLoaded', function () {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    var courseId;
    var checkboxAll = $('#checkbox-all');
    var checkSubmitBtn = $('.btn-check-submit');
    var courseItemsCheck = Array.prototype.slice.call($$('input[name="courseIds[]"]'));
    var restoreForm = document.forms['restore-course-form'];
    var restoreBtns = Array.prototype.slice.call($$('.btn-restore'));
    var deleteForm = document.forms['delete-course-form'];
    $('#delete-course-modal').addEventListener('show.bs.modal', function (event) {
        var btnDelete = event.relatedTarget;
        courseId = btnDelete.getAttribute('data-id');
    });
    $('#btn-delete-course').onclick = function (event) {
        deleteForm.action = `/courses/${courseId}/force?_method=DELETE`;
        deleteForm.submit();
    };
    restoreBtns.map((restoreBtn) => {
        restoreBtn.onclick = function (event) {
            event.preventDefault();
            courseId = restoreBtn.getAttribute('data-id');
            restoreForm.action = `/courses/${courseId}/restore?_method=PATCH`;
            restoreForm.submit();
        };
    });
    checkboxAll.onchange = function () {
        var _isCheckedAll = this.checked;
        courseItemsCheck.map((courseItemCheck) => (courseItemCheck.checked = _isCheckedAll));
        renderCheckAllSubmitBtn();
    };
    courseItemsCheck.map((courseItemCheck) => {
        courseItemCheck.onchange = function () {
            var _isCheckedAll = courseItemsCheck.length === courseItemsCheck.filter((courseItemCheck) => courseItemCheck.check === true).length;
            checkboxAll.checked = _isCheckedAll;
            renderCheckAllSubmitBtn();
        };
    });
    function renderCheckAllSubmitBtn() {
        var checkedCount = courseItemsCheck.filter((word) => word.checked === true).length;
        if (checkedCount > 0) {
            checkSubmitBtn.classList.remove('disabled');
        } else {
            checkSubmitBtn.classList.add('disabled');
        }
    }
});
