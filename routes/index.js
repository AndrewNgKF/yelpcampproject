var express = require('express');
var router = express.Router();

var passport = require('passport');
var User = require('../models/user');

//==============
// Authorization and Authentication are 2 different things, 
// authentication is whether a person is who they say they are
// authorization is what they are are
//==============


//GET ROUTES ----------------
router.get('/', function(req, res){
    res.render('landing');
});



//AUTH Routes 
//Register page
router.get('/register', function(req, res){
    res.render('register');
});

//register logic
router.post('/register', function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            //can add the err in, we get it for free!! 
            // err is an object, hence we use err.message. we console.log(err) to know that
            req.flash('error', err.message);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function(){
            //can also be req.body.username, but just in case it got changed by the database, we use user.username
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect('/campgrounds');
        });
    });
});

//Show Login Form
router.get('/login', function(req, res){
    //the message is if the user tried to do something he needed auth for. 
    //the req.flash("error") variable was declared in the middleware
   res.render('login');
});

router.post('/login', passport.authenticate("local", 
    {
        successRedirect: "/campgrounds", 
        failureRedirect: "/login"
        
    }), function(req, res){
        //this callback doesnt do anything but just leave it here.
});

//LOGOUT Route
router.get('/logout', function(req, res){
   req.logout();
   req.flash('success', "logged you out");
   res.redirect('/campgrounds');
});


module.exports = router;