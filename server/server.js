const express = require('express');
const app = express();

require('dotenv').config();

const router = require('./app/routes/v1/route.js');

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT

const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false }));


app.use('/api', router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});