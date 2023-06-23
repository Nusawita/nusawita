const express = require('express');
const app = express();

const router = require('./app/routes/v1/route.js');

const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false }));


app.use('/api', router);

app.listen(3000)