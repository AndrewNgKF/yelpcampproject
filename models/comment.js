var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            //ref refers to the model in which we are linking to
            ref: "User"
        },
        username: String
    }
});

// {
//     username: "yeah",
//     _id: 93721234544,
//     hash:... 
// }

module.exports = mongoose.model("Comment", commentSchema);