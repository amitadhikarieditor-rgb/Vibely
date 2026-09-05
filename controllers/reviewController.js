const review = require("../models/review.js")
const listing = require("../models/model.js");
const user = require("../models/user.js");

module.exports.review = async (req,res)=>{
     const listingDoc = await listing.findById(req.params.id);
    const newReview = new review(req.body.review);
    newReview.author = req.user._id;
    let {id} = req.params;
    listingDoc.reviews.push(newReview);
    await newReview.save();
    await listingDoc.save();
    await listingDoc.populate("reviews")
    console.log(req.body.review);
    req.flash("success", "review added sucessfully");
    res.redirect(`/home/${id}/show`);
};

module.exports.reviewDestroy = async (req,res)=>{
    let {id, reviewId} = req.params;
    await review.findById(reviewId);
    await listing.findByIdAndUpdate(id, {$pull: {reviews:reviewId}});
    await review.findByIdAndDelete(reviewId);
    req.flash("success", "review deleted sucessfully");
    res.redirect(`/home/${id}/show`);
};