if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
};

console.log(process.env.SECRET); 

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
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const user = require("./models/user.js")
const multer = require("multer");
const upload = multer({dest: "uploads/"});

const sessionOption = {
    secret : "amit adhikari the author",
    resave : false,
    saveUninitialized : true,
    cookie:{
        expires: new Date(Date.now() + 7*24*60*60*1000),
        maxAge: 7*24*60*60*1000,
        httpOnly: true
    }
};
//express sessions
app.use(session(sessionOption));
app.use(flash());

//passport
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())
app.use(passport.initialize());
app.use(passport.session());


//middleware for flash session
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    // console.log(res.locals.success)
    next();
});



//routes for web pages 
const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter = require("./routes/users.js");




app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.use(methodOverride("_method"));

app.engine("ejs",ejsMate);

//mongoose connect
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/listings")
}
//mongoose connect function
main().then((res)=>{
    console.log(res,"database ho gya connect");
}).catch((err)=>{
    console.log(err, "database ke lag gye")
});
//server starting route
app.listen(3030, (req,res)=>{
    console.log("server sun rha hai naa tu")
});

app.use("/", listingRouter);
app.use("/", reviewRouter);
app.use("/", userRouter);


//this is the error handler applier for all the routes 
app.all("/{*splat}", (req,res,next)=>{
    next(new expressError(400, "page does not exist"));
});


//and this is the err handeler
app.use((err,req,res,next)=>{
    let {status=500,message="something went wrong"}=err;
    res.status(status).render("listings/error.ejs", {message});
});