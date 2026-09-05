const express = require("express");
const Router= express.Router();
const methodOverride= require("method-override");
const listing = require("../models/model.js"); 
const user = require("../models/user.js");
const wrapAsync = require("../utils/wrapsync.js");
const expressError= require("../utils/expressError.js");
const {listingSchema, reviewSchema}=require("../joi.js");
const passport = require("passport");
const { isLoggedIn, isOwner } = require("../middleware.js");
const { findById } = require("../models/model.js");
const review = require("../models/review.js");
const controller = require("../controllers/listingController.js");
const multer = require("multer");
const upload = multer({dest: "uploads/"});


Router.get("/home",isLoggedIn,wrapAsync(controller.index));


Router.get("/home/search",isLoggedIn,wrapAsync(controller.Search));


Router.get("/home/:id/show",isLoggedIn, wrapAsync(controller.Show));


Router.get("/home/new",isLoggedIn, (req,res)=>{
    if(!req.isAuthenticated()){
        req.flash("error","user should be logged in to create listing")
        return res.redirect("/login");
    }
    res.render("listings/new.ejs")
})

const validateListing= (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        throw new expressError(400,error);
    }else{
        next();
    }
}

Router.post("/home/new", isLoggedIn, upload.single("image"), validateListing, wrapAsync(controller.new));


Router.patch("/home/:id/edit", isOwner, wrapAsync(controller.edit));


Router.delete("/home/:id/delete", isOwner, wrapAsync( controller.destroy));



Router.use((err,req,res,next)=>{
    let {status=500,message="something went wrong"}=err;
    res.status(status).render("listings/error.ejs", {message});
});



module.exports = Router;