const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const router = require('./app/routes/v1/route.js');

const port = process.env.PORT

const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false }));
app.use(cookieParser(process.env.TOKEN_KEY));
app.use(morgan('dev'));

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});