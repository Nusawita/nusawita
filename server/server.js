const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

require('dotenv').config();

const router = require('./app/routes/v1/route.js');

// const { API_PORT } = process.env.PORT;
// const port = process.env.PORT || API_PORT
const port = process.env.PORT

const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false }));
app.use(cookieParser(process.env.TOKEN_KEY));


app.use('/api', router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});