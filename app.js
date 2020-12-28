const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://shubham:789456@cluster0.akr34.mongodb.net/register';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//contact
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback) {
    console.log("connection succeeded");
})
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/contact', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var message = req.body.message;

    var data = {
        "name": name,
        "email": email,
        "phone": phone,
        "message": message
    }
    db.collection('details').insertOne(data, function(err, collection) {
        if (err) throw err;
        console.log("Record inserted Successfully");

    });
    return res.send('Thankyou for Contact us')
        // return res.redirect('signup_success.html');
})
app.engine("html", require("ejs").renderFile);
app.use(express.static("views"));


// app.get("/", function(req, res) {
//     res.render("contact.ejs");
// });

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/suryanamskar', requireAuth, (req, res) => res.render('suryanamskar'));
app.get('/classes', requireAuth, (req, res) => res.render('classes'));
app.get('/pranayam', requireAuth, (req, res) => res.render('pranayam'));
app.get('/contact', requireAuth, (req, res) => res.render('contact'));
app.get('/about', requireAuth, (req, res) => res.render('about'));
app.get('/gallery', requireAuth, (req, res) => res.render('gallery'));
app.get('/patanjaliayurved', requireAuth, (req, res) => res.render('patanjaliayurved'));
app.use(authRoutes);