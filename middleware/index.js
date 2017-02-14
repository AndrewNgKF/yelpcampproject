var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

//middleware always needs req, res, next

middlewareObj.checkCampgroundOwnership = function (req, res, next){
    //is User logged in?
     if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash('error', 'Campground not found');
                res.redirect('back');
            } else {
                //does user own the campground
                // !!!!  =======    if(foundCampground.author.id === req.user._id) This wont work because even though they look identical printed out,...
                // foundCampground.author.id is mongoose object req.user._id is a string, so we gotta use...equals.  == also doesnt work!
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    //this is just in case the user types out the url to manually edit it.
                    req.flash('error', "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function (req, res, next){
    //is User logged in?
     if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect('back');
            } else {
                //does user own the comment
                // !!!!  =======    if(foundCampground.author.id === req.user._id) This wont work because even though they look identical printed out,...
                // foundCampground.author.id is mongoose object req.user._id is a string, so we gotta use...equals.  == also doesnt work!
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    //this is just in case the user types out the url to manually edit it.
                    req.flash('error', "You dont have permission do do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash('error', 'You need to be logged in to do that');
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
        //do this BEFORE u redirect! 
        //This declares req.flash, which is required by connect-flash to flash error messages. 
        req.flash('error', 'You need to be logged in to do that');
        res.redirect("/login");
}



module.exports = middlewareObj;