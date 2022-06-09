const login = require("./database/connection"),
    express = require("express"),
    mongoose = require("mongoose"),
    path = require("path"),
    app = express(),
    port = 8080,
    bodyparser = require("body-parser");


// Adding a middle-ware
app.use('/static', express.static("static"))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())


// get and post command
app.get('/', (req, res) => {
    const params = {}
    res.render('SignUp', params)
});

//Post request for login form

app.post('/login', (req, res) => {


    // login.findOne({
    //     email: req.body.email
    // }, {
    //     password: req.body.password
    // })

    login.findOne({ email: req.body.email }, function(error, result) {
        if (error) {

            return res.render('index')
        }
        res.send("User Not Found")
    })


    // data.save().then(() => {
    //     res.status(200).render('index.pug')
    // }).catch(() => {
    //     res.status(404).send("Incorrect Email or Password")
    // })
});

//Post request for SignUp form
app.post('/signup', (req, res) => {
    checkDup = (req, res) => {
        // For Email
        login.findOne({
            email: req.body.email,
            tel: req.body.tel
        }).exec((err, result) => {
            if (err) {
                res.status(500).send({ message: err });
                return
            }
        });
    }

    const data = new login(req.body);
    data.save().then(() => {
        res.status(200).render('index')
    }).catch(() => {
        res.status(404).send("User Already Exists! ")
    })
});


// listening port
app.listen(port, () => {
    console.log(`listening at port ${port}`)
})