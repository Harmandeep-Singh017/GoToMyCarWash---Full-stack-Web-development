const
    express = require("express"),
    // mongoose = require("mongoose"),
    path = require("path"),
    app = express(),
    port = 8080,
    bodyparser = require("body-parser"),
    db = require("./database/connection")

// Adding a middle-ware
app.use('/static', express.static("static"))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())


// get and post command
app.get('/', (req, res) => {
    res.render('SignUp');
});

app.get('/index', (req, res) => {
    res.status(200).render('index')
})

app.get('/thank', (req, res) => {
    res.status(200).render('thank')
})

// POST Routes
app.post("/login", (req, res) => {
    res.status(200).render('index')
})

app.post("/login", (req, res) => {

    checkPass = (req, res) => {
        db.login.findOne({
            email: req.body.email,
            password: req.body.password
        }).exec((err, result) => {
            if (err) {
                res.status(404).send("User not found!")
            }
        })
    }

})

app.post('/signup', function(req, res) {

    checkDup = (req, res) => {
        // For Email
        db.login.findOne({
            email: req.body.email
        }).exec((err, result) => {
            if (err) {
                res.status(500).send({ message: err });
                return
            }
        });
    }
    const info = new db.login(req.body);
    info.save().then(() => {
        res.status(200).render('index')
    }).catch(() => {
        res.status(404).send("user Already exists")
    })
})

//For booking form
app.post('/bookAppointment', (req, res) => {
    const book = new db.booking(req.body);
    book.save().then(() => {
        res.status(200).render('thank')
    }).catch(() => {
        res.status(404).send("Sorry! Already Booked")
    })
});

// listening port
app.listen(port, () => {
    console.log(`listening at port ${port}`)
})
