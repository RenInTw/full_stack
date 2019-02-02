var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// ========================
// COMMENTS ROUTES
// ========================
// Comments New
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
       if(err) {
          console.log(err);
       } else {
          res.render("comments/new", {campground: campground});
       }
    });
}) ;

// Comments Create
router.post("/", middleware.isLoggedIn, function(req, res) {
   Campground.findById(req.params.id, function(err, campground) {
      if(err) {
         console.log(err);
      } else {
         Comment.create(req.body.comment, function(err, comment) {
            if(err) {
               console.log(err);
            } else {
               // add username and id to comment and save to db
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               comment.save();
               // push comment which already has id and username with it to campground comments array
               campground.comments.push(comment);
               campground.save();
               res.redirect("/campgrounds/" + campground._id);
            }
         });
      }
   });
});

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
       if(err) {
          console.log(err);
       } else {
          Comment.findById(req.params.comment_id, function(err, comment) {
             if(err) {
                res.redirect("back");
             } else {
                res.render("comments/edit", {campground: campground, comment: comment});
             }
          });
       }
    });
});

// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
      if(err) {
         res.redirect("back");
      } else {
         res.redirect("/campgrounds/" + req.params.id);
      }
   });
});

// COMMENT DESTROY
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
   Comment.findByIdAndRemove(req.params.comment_id, function(err) {
      if(err) {
         res.redirect("back");
      } else {
         res.redirect("back");
      }
   });
});

module.exports = router;