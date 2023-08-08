const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const bcrypt = require('bcrypt');
const UserModel = require('./config/database');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");


const usersPath = require('./routes/users');
const protectedPath = require('./routes/protectedRoutes');

require('dotenv').config();
require('./config/database');
require('./config/passport')(passport);


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/', usersPath);
app.use('/', protectedPath);

app.listen(5000, () => {
    console.log('Listening on port 5000');
})