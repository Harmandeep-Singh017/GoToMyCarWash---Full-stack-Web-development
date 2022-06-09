const express = require("express"),
    mongoose = require("mongoose"),
    bodyparser = require("body-parser"),
    path = require("path"),
    port = 5050,
    app = express(),
    url = 'mongodb://localhost/OnlineBooking';

// DataBase connection and model
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function(result) {
        console.log('Database is connected');
    })
    .catch((err) => console.log(err));

const schema = mongoose.Schema({
    name: String,
    tel: Number,
    address: String,
    date: String,
    time: String
});

const booking = mongoose.model('booking', schema)

app.use('/static', express.static('static'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).render('index.pug');
});

app.post('/booking', (req, res) => {
    const book = new booking(req.body);
    book.save().then(() => {
        res.status(200).render('thank.pug')
    }).catch(() => {
        res.status(404).send("Sorry! Already Booked")
    })
});

app.listen(port, () => {
    console.log(`listening at port ${port}`);
});