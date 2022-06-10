const express = require("express")
const mongoose = require("mongoose");
const dbURI = 'mongodb://localhost/GoToMyCarWash';

// DataBase connection and model
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function(result) {
        console.log('Database is connected');
    })
    .catch((err) => console.log(err));

//Schema and Model for Login Page
const schema = mongoose.Schema({
    firstName: String,
    lastName: String,
    tel: Number,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const login = mongoose.model('login', schema)

//Schema and Model for Booking appointment
const schemaBooking = mongoose.Schema({
    name: { type: String, required: true },
    PhoneNumber: { type: Number, required: true },
    address: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true }
});

const booking = mongoose.model('booking', schemaBooking)

module.exports = { login, booking }
