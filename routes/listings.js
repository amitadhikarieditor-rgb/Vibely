const express = require("express");
const Router= express.Router();
const methodOverride= require("method-override");
const listing = require("../models/model.js"); 
const wrapAsync = require("../utils/wrapsync.js");
const expressError= require("../utils/expressError.js");
const {listingSchema, reviewSchema}=require("../joi.js");

//this is the listing validator for preventing the unlawful or unwanted listing in which i took the listing.sechema.vladiate deconstruted the error out of the req.body and throw if the error hapens according to the model we seted through joi! else we are calling up the next(); which goes for the new route line 107-116!
const validateListing= (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        throw new expressError(400,"Please check your Description and price feild");
    }else{
        next();
    }
}

//root route "/"
Router.get("/", (req,res)=>{
    res.render("listings/login.ejs")
}); 

//get route for /home route 
Router.get("/home", wrapAsync(async (req,res)=>{
    const items = await listing.find({});
    console.log("horha hai")
    res.render("listings/home.ejs", {items});
}));

//searching route for searching used the $regex=used for pattern/searching from the DB and $option=used for handling case sensitivity function of mongoose
Router.get("/home/search",wrapAsync(async(req,res)=>{
    let search = String(req.query.q);
    const conditions =[{title:{$regex:search, $options:"i"}},
        {country:{$regex:search, $options:"i"}},
        {location:{$regex:search, $options:"i"}},
        {description:{$regex:search, $options:"i"}}];
    if(!isNaN(Number(search))){
        conditions.push({price:Number(search)});
    };
    const card= await listing.find({$or:conditions})
    res.render("listings/search.ejs", {card});
    console.log(req.query.q);
    console.log(card);
}));

//this is the simple get route for showing the selected item by accessing the id which is taken from the req.params.id and saved to the id params and the listing.findById searches for the Id and populate shares the all the data of the review because in listing only the objectId is stored but for all the data we used the populate operator
Router.get("/home/:id/show", wrapAsync(async(req,res)=>{
    const id = req.params.id;
    const item = await listing.findById(id).populate('reviews');
    res.render("listings/show.ejs", {item})
}));


//this is the get route for the form filling of the feilds required for the listings 
Router.get("/home/new", (req,res)=>{
    res.render("listings/new.ejs")
})
//this is the post route for actually making the item and saving to the DB listings deconstructed the title, des etc from the req.body and added to the listing and calling the save() function and redirecting to the home route where the listing will be shown
Router.post("/home/new", validateListing, wrapAsync( async (req,res)=>{
    const {title,description,price,location,country,image} = req.body;
    let add = new listing(req.body);
    await add.save();
    res.redirect("/home");
}));

//this is the edit route for the edditing of the listings deconstructed the values of titel and all from the req.body and id from the body.params.id and used the mongoose function listing.findByIdAndUpdate where id,req.body and {returnDocument:after} for the updation of the edited listing!
Router.patch("/home/:id/edit", wrapAsync(async (req,res)=>{
     const {title,description,price,location,country,image} = req.body;
     const id = req.params.id;
     const edit = await listing.findByIdAndUpdate(id,req.body, {returnDocument: "after"});
     res.render("listings/update.ejs", {edit});
}));

//this is the simple delete route for the listings took the id from the req.params.id and listing.findByIdAndDelete(where id)
Router.delete("/home/:id/delete",wrapAsync( async (req,res)=>{
    const id=req.params.id;
    const Del = await listing.findByIdAndDelete(id);
    res.redirect("/home");
}));




module.exports = Router;