const express = require("express");
const app= express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride= require("method-override");
const listing = require("./models/model.js"); 
const review = require("./models/review.js")
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapsync.js");
const expressError= require("./utils/expressError.js");
const {listingSchema, reviewSchema}=require("./joi.js");

const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/reviews.js");


//expressencoded for parsing the req.body data to the server and performing the CRUD operations 
app.use(express.urlencoded({extended:true}));
//this is for giving the path for the public files serving
app.use(express.static(path.join(__dirname, "public")));
//this is for setting and using the embedded javascript for rendering the pages 
app.set("view engine", "ejs");
//this is the methodOverride because the ejs cannot send the patch and delete routes 
app.use(methodOverride("_method"));
//this is for using the prebuilt layouts built in /layouts/boilerplate.ejs
app.engine("ejs",ejsMate);
//mongoose connect
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/listings")
}
//mongoose connect function
main().then((res)=>{
    console.log("ho gya connect");
}).catch((err)=>{
    console.log("lag gye")
});
//server starting route
app.listen(3030, (req,res)=>{
    console.log("sun rha hai naa tu")
});

app.use("/", listingRouter);

app.use("/", reviewRouter);

//this is the error handler applier for all the routes 
app.all("/{*splat}", (req,res,next)=>{
    next(new expressError(400, "page not found bruhhhhhh!"));
});


//and this is the err handeler
app.use((err,req,res,next)=>{
    let {status=500,message="something went wrong"}=err;
    res.status(status).render("listings/error.ejs", {message});
});