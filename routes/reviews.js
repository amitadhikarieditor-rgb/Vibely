const express = require("express");
const router= express.Router();
const methodOverride= require("method-override");
const listing = require("../models/model.js");
const review = require("../models/review.js")
const wrapAsync = require("../utils/wrapsync.js");
const expressError= require("../utils/expressError.js");
const {listingSchema, reviewSchema}=require("../joi.js");


//reviews validator using the reviewSchema.validate and deconstructing the error out of the validated req.body and using the if logic for throwing the newexpress error from /utils/expressError.js and if no error calling the next() which goes for the reviews route /home/:id/review
const validateReviews= (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        throw new expressError(400,"Please add valid review and ratings");
    }else{
        next();
    }
}


//this is the listing validator for preventing the unlawful or unwanted listing in which i took the listing.sechema.vladiate deconstruted the error out of the req.body and throw if the error hapens according to the model we seted through joi! else we are calling up the next(); which goes for the new route line 107-116!
const validateListing= (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        throw new expressError(400,"Please check your Description and price feild");
        console.log(error);
    }else{
        next();
    }
}


//this is the post route of reviews this takes the id of the listing DB from the req.params and saves to listingDoc and newReview has the req.body.revew from the review DB which got pushed into the array of the reviews inside the listingDB which was created in the /models/model.js for listings and /models/review.js for review model
router.post("/home/:id/review", validateReviews, wrapAsync( async (req,res)=>{
     const listingDoc = await listing.findById(req.params.id);
    const newReview = new review(req.body.review);
    let {id} = req.params;
    listingDoc.reviews.push(newReview);
    await newReview.save();
    await listingDoc.save();
    await listingDoc.populate("reviews")
    console.log(req.body.review);
    req.flash("success", "review added sucessfully");
    res.redirect(`/home/${id}/show`);
}));

//delete the review route
router.delete("/home/:id/review/:reviewId", wrapAsync(async (req,res)=>{
       let {id, reviewId} = req.params;
       await review.findById(reviewId);
       await listing.findByIdAndUpdate(id, {$pull: {reviews:reviewId}});
       await review.findByIdAndDelete(reviewId);
       req.flash("success", "review deleted sucessfully");
       res.redirect(`/home/${id}/show`);
}))

module.exports = router;
