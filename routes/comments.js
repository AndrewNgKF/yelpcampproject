var express = require('express');
var router = express.Router();

var Campground = require('../models/campground');
var Comment = require('../models/comment');

var middlewareObj = require("../middleware");


//============== COMMENTS ROUTE
router.get('/campgrounds/:id/comments/new', middlewareObj.isLoggedIn,function(req, res) {
    //find Campground by id
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
       } else {
           res.render('comments/new', {campground: campground});
       }
    });
});

router.post('/campgrounds/:id/comments', middlewareObj.isLoggedIn,function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            //create a new comment
            console.log(req.body.comment);
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash('error', 'Something went wrong');
                    console.log(err);
                } else {
                    //======  This will add username and id to comment
                    //comment.author.id is because of the way our commentsSchema was set up
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    //push comment
                    campground.comments.push(comment);
                    campground.save();
                    req.flash('success', 'Comment added');
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
    
    //connect new comment to campground
    //redirect to campground show page
});


//COMMENTS EDIT ROUTE
//cannot have 2 id!! the second will override req.params.id
//campgrounds/:id/comments/:id/edit
router.get('/campgrounds/:id/comments/:comment_id/edit', middlewareObj.checkCommentOwnership,function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect('back');
        } else {
            req.flash('success', 'Comment Edited');
            // res.send('edit route for comment');
            // pass into campground_id the req.params.id, and foundComment into comment, which will be later read by the ejs file.
            res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
        }
    });
});

//COMMENT UPDATE
router.put('/campgrounds/:id/comments/:comment_id', middlewareObj.checkCommentOwnership,function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundComment){
        if(err){
            res.redirect('back');
        } else {
            req.flash('error', '');
            //then head back to campground page after updating
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

//COMMENT DESTROY
router.delete('/campgrounds/:id/comments/:comment_id', middlewareObj.checkCommentOwnership,function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect('back');
        } else {
            req.flash('Success', 'Comment Deleted');
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});


module.exports = router;