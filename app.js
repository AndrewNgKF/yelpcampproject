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



app.use(function(req, res, next) {
    
    res.locals.currentUser = req.user;
    
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    
    //next() is important to move on to next middleware.
    next();
});

 
app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
   console.log('YelpCamp Server has started');
});

