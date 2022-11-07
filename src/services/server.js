const express = require('express');
const router = require('../routes/main');
const handleError = require('../middleware/error');
const notFound = require('../middleware/notFound');

const app = express();

app.use(express.static('public'));

app.use('/api', router);

app.use(handleError);

app.use(notFound);

module.exports = app;
