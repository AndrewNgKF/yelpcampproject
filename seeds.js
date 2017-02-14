var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');


var data = [
    {
        name: 'Clouds rest',
        image: 'http://visitindianacountypa.org/wp-content/themes/indianna/images/graphics/wheel%20in%20campground%20(2).jpg',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: 'Clouds rest2',
        image: 'https://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5253636.jpg',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: 'Clouds rest3',
        image: 'http://www.nationalparks.nsw.gov.au/~/media/DF58734103EF43669F1005AF8B668209.ashx',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
]

function seedDB() {
    //remove all campgrounds
    // Campground.remove({}, function(err) {
    //     if(err){
    //     console.log(err);
    // }
    //     console.log('removed campgrounds');
        //add a few campgrounds
        // data.forEach(function(seed){
        //     Campground.create(seed, function(err, campground){
        //         if(err){
        //             console.log(err);
        //         } else {
        //             console.log('added a campground');
        //             //create a comment on each campground
        //             Comment.create({text: "This is a comment", author: "Homer"}, function(err, comment){
        //                 if(err){
        //                     console.log(err);
        //                 } else {
        //                     campground.comments.push(comment);
        //                     campground.save();
        //                     console.log('Created new comment');
        //                 }
        //             });
        //         }
        //     });
        // });
    // });
}



module.exports = seedDB;