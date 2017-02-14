var express = require('express');
var router = express.Router();

var Campground = require('../models/campground');
// var Comment = require('../models/comment');

//index files dont need to be explicitly mentioned
var middlewareObj = require('../middleware');



//--- INDEX ROUTE - Show all campgrunds
router.get('/campgrounds', function(req, res) {
    
    //get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds) {
        if(err){
           console.log(err); 
        } else {
            //dont have to use currentUser: req.user as the currentUser data is already passed onto the index.ejs file through the above app.use()
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
        //first campgrounds is name, second campgrounds is the data we are passing in.
    // res.render('campgrounds', {campgrounds: campgrounds});
});

//NEW show form to create new campground
router.get('/campgrounds/new', middlewareObj.isLoggedIn, function(req, res) {
    res.render('campgrounds/new.ejs');
});

//POST ROUTES ---------------
//CREATE route - add new campp to db
router.post('/campgrounds', middlewareObj.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var price = req.body.price;
    var newCampground = {name: name, image: image, description: desc, author: author, price: price};
    
    //Create a new Campground and save to database
    Campground.create(newCampground, function(err, newlyCreated){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

//SHOW - shows more info about one campground
router.get("/campgrounds/:id", function(req, res) {
     //find the campground with provided id and render show template with campground, >> and populate it with comments
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
        if(err){
            console.log(err);
        } else {
            // console.log(foundCampground);
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });
});

//EDIT campground route
router.get('/campgrounds/:id/edit', middlewareObj.checkCampgroundOwnership, function(req, res){
    //is user logged in at all?
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err) {
            res.redirect("back");
        } else {
            res.render('campgrounds/edit', {campground: foundCampground});
        }
    });
});

//UPDATE campground route
router.put("/campgrounds/:id", middlewareObj.checkCampgroundOwnership,function(req, res){
//   find and update the correct campground and redirect to show page
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if(err){
            res.redirect('/campgrounds');
        } else {
            // updatedCampground._id can be also req.params.id
            res.redirect('/campgrounds/' + updatedCampground._id);
        }
    });
});

//DESTROY campground route  -->The term is DESTROY not DELETE!
router.delete('/campgrounds/:id', middlewareObj.checkCampgroundOwnership,function(req, res){
//   res.send('You are trying to delete something');
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    });
});


module.exports = router;