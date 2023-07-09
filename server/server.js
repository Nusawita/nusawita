const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
const docs = require('./app/docs');
require('dotenv').config();

const app = express();
const router = require('./app/routes/v1/route.js');
const port = process.env.PORT

const bodyParser = require('body-parser');

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
    credentials:true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false }));
app.use(cookieParser(process.env.TOKEN_KEY));
app.use(morgan('dev'))

app.use('/api', router);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});