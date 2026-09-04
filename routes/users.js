const express = require("express");
const Router= express.Router();
const methodOverride= require("method-override");
const listing = require("../models/model.js"); 
const user = require("../models/user.js");
const wrapAsync = require("../utils/wrapsync.js");
const expressError= require("../utils/expressError.js");
const {listingSchema, reviewSchema}=require("../joi.js");
const passport = require("passport");
const { isLoggedIn } = require("../middleware.js");
const { saveRedirectUrl } = require("../middleware.js");

//sginup route "/"
Router.get("/", (req,res)=>{
    res.render("listings/sginup.ejs")
});
//saving the credential to the users DB
Router.post("/", async (req,res)=>{
    try{
    let {username,email,password} = req.body;
    const newUser = new user({username,email});
    const registeredUser = await user.register(newUser,password);
    req.flash("success", "registered successfully");
    console.log(registeredUser);
    req.login(registeredUser, (err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","welcome to vibely")
        res.redirect("/home");
    })
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/");
    }
});

//login route "/"
Router.get("/login", (req,res)=>{
    res.render("listings/login.ejs")
});

Router.post("/login",saveRedirectUrl, passport.authenticate
    ("local",{
        failureFlash:true,
        failureRedirect:"/login",
}),
(req,res)=>{
    req.flash("success","welcome back you are logged in")
    let redirectUrl =res.locals.redirectUrl || "/home"
    res.redirect(redirectUrl);
});

Router.post("/logout",isLoggedIn,(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","user loggedout");
        res.redirect("/login");
    });
});

module.exports = Router;