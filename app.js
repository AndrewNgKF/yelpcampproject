var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var passport = require('passport');
var LocalStrategy = require('passport-local');

var methodOverride = require('method-override');

var Campground = require('./models/campground');
var Comment = require('./models/comment');
var seedDB = require('./seeds');

var User = require('./models/user');

var campgroundRoutes = require('./routes/campgrounds');
var commentRoutes = require('./routes/comments');
var indexRoutes = require('./routes/index');

var flash = require("connect-flash");


// process.env.DATABASEURL


//create and connect to mongodb and make yelp_camp database

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";

mongoose.connect(url);

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//Seed the DB with dummy data
// seedDB();


// Campground.create({
//     name: 'whatever', 
//     image: 'https://www.campamerica.co.uk/images/uploads/images/Private-Camp---Camp-Westmont-1400-x-610.png',
//     description: "this is a huge granite hill"
    
// }, function(err, campground) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log('Newly created campground: ', campground);
//     }
// });

//CAMPGROUNDS ARRAY
// var campgrounds = [
//     {name: 'fish creek', image: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Wilderness_Adventure_Camps.jpg'},
//     {name: 'whatever', image: 'https://www.campamerica.co.uk/images/uploads/images/Private-Camp---Camp-Westmont-1400-x-610.png'},
//     {name: 'Whatever name', image: 'http://www.topeducationdegrees.org/wp-content/uploads/2014/05/49.-River-Way-Ranch-Camp-%E2%80%93-Sanger-California.jpg'},
//     {name: 'fish creek', image: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Wilderness_Adventure_Camps.jpg'},
//     {name: 'whatever', image: 'https://www.campamerica.co.uk/images/uploads/images/Private-Camp---Camp-Westmont-1400-x-610.png'},
//     {name: 'Whatever name', image: 'http://www.topeducationdegrees.org/wp-content/uploads/2014/05/49.-River-Way-Ranch-Camp-%E2%80%93-Sanger-California.jpg'}
// ];

//PASSPORT CONFIG
app.use(require('express-session')({
    secret: "This is my app secret",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//this is to pass on currentUser to other parts, app.use will called on every single route
app.use(function(req, res, next) {
    //res.locals is whatever is inside the template
    res.locals.currentUser = req.user;
    //declares the message variable which is shown in the header.ejs file. 
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    //next() is important to move on to next middleware.
    next();
});
//These 3 lines have to be under the func because they need currentUser to work. 
app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
   console.log('YelpCamp Server has started');
});

