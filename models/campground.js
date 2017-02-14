var mongoose = require('mongoose');

//SCHEMA setup
var campgroundSchema = new mongoose.Schema({
   name: String,
   price: String,
   image: String,
   description: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         //ref is name of the model
         ref: "Comment"
      }
   ]
});

var Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;

