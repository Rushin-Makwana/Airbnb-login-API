const express = require('express');
const app = express();
const db = require('./db');
const PORT = 5000;
const cors = require('cors');
app.use(cors());

const AuthController = require('./Controller/authController');
app.use('/api/auth',AuthController);

app.listen(PORT,() => {
    console.log(`listening on port ${PORT}`)
})
