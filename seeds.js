var mongoose = require("mongoose");
var Campground = require("./models/campground"); // Collection Campground has many campground objects inside it
var Comment = require("./models/comment"); // Collection Comment has many comment objects inside it

var data = [
    {
        name: "Cloud's Rest",
        image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f8c67ca6edb1bd_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis neque purus, semper eget vehicula quis, egestas at justo. Sed vitae sapien laoreet, dapibus turpis in, consectetur orci. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed porttitor dui quis neque porttitor, vel fringilla sem congue. In hac habitasse platea dictumst. Donec non placerat tellus. Nunc eu justo aliquet nisl consequat varius. Cras faucibus felis at ante efficitur, a gravida dui commodo. Nunc id volutpat ligula. Integer lorem eros, lobortis vitae placerat ac, ornare a urna. Cras malesuada viverra turpis, ut iaculis mauris pellentesque ut. Ut a suscipit diam. Donec auctor ligula in viverra consectetur. Donec feugiat aliquam dictum."
    },
    {
        name: "Desert Mesa",
        image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis neque purus, semper eget vehicula quis, egestas at justo. Sed vitae sapien laoreet, dapibus turpis in, consectetur orci. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed porttitor dui quis neque porttitor, vel fringilla sem congue. In hac habitasse platea dictumst. Donec non placerat tellus. Nunc eu justo aliquet nisl consequat varius. Cras faucibus felis at ante efficitur, a gravida dui commodo. Nunc id volutpat ligula. Integer lorem eros, lobortis vitae placerat ac, ornare a urna. Cras malesuada viverra turpis, ut iaculis mauris pellentesque ut. Ut a suscipit diam. Donec auctor ligula in viverra consectetur. Donec feugiat aliquam dictum."
    },{
        name: "Canyon Floor",
        image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104491f8c67ca6edb1bd_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis neque purus, semper eget vehicula quis, egestas at justo. Sed vitae sapien laoreet, dapibus turpis in, consectetur orci. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed porttitor dui quis neque porttitor, vel fringilla sem congue. In hac habitasse platea dictumst. Donec non placerat tellus. Nunc eu justo aliquet nisl consequat varius. Cras faucibus felis at ante efficitur, a gravida dui commodo. Nunc id volutpat ligula. Integer lorem eros, lobortis vitae placerat ac, ornare a urna. Cras malesuada viverra turpis, ut iaculis mauris pellentesque ut. Ut a suscipit diam. Donec auctor ligula in viverra consectetur. Donec feugiat aliquam dictum."
    }
]

function seedDB() {
    // Remove all campgrounds
    Campground.remove({}, function(err) { // remove all objects inside collection campgrounds
        if(err) {
            console.log(err);
        } else {
            console.log("removed campgrounds!");
            // add a few campgrounds
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("added a campground");
                        // Create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment) {
                                if(err) {
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                        });
                    }
                });
            });
        }
    });
};

module.exports = seedDB;
