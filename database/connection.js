const mongoose = require("mongoose");

const dbURI = 'mongodb://localhost/loginPage';

// DataBase connection and model
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function(result) {
        console.log('Database is connected');
    })
    .catch((err) => console.log(err));

const schema = mongoose.Schema({
    name: String,
    tel: Number,
    email: String,
    password: String
});

const login = mongoose.model('login', schema)

module.exports = login
