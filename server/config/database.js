const mongoose = require('mongoose')
require('dotenv').config();

const connectDb = mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

const userShcema = mongoose.Schema({
    username: String,
    password: String
});

const UserModel = mongoose.model('User', userShcema);

module.exports = UserModel;