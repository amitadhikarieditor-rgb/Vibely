const express = require("express");
const app= express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride= require("method-override");
const listing = require("./models/model.js"); 
const ejsMate = require("ejs-mate");

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/listings")
}

main().then((res)=>{
    console.log("ho gya connect");
}).catch((err)=>{
    console.log("lag gye")
});

app.listen(3030, (req,res)=>{
    console.log("sun rha hai naa tu")
});

app.get("/home",async (req,res)=>{
    const items = await listing.find({});
    console.log("horha hai")
    res.render("listings/home.ejs", {items});
    // res.send("ok")
});

app.get("/home/:id/show", async(req,res)=>{
    const id = req.params.id;
    const item = await listing.findById(id);
    res.render("listings/show.ejs", {item});
});

app.get("/home/new", (req,res)=>{
    res.render("listings/new.ejs")
})

app.post("/home/new", async (req,res)=>{
    const {title,description,price,location,country,image} = req.body;
    let add = new listing(req.body);
    await add.save();
    res.redirect("/home");
});

app.patch("/home/:id/edit", async (req,res)=>{
     const {title,description,price,location,country,image} = req.body;
     const id = req.params.id;
     const edit = await listing.findByIdAndUpdate(id,req.body, {returnDocument: "after"});
     res.render("listings/update.ejs", {edit});
});

app.delete("/home/:id/delete", async (req,res)=>{
    const id=req.params.id;
    const Del = await listing.findByIdAndDelete(id,);
    res.redirect("/home");
});

// app.get("/listing", async(req,res)=>{
//     const list= new listing(
//         {
//         title:"my new villa",
//         description:"villa is sea facing",
//         price:1200,
//         location:"goa",
//         country:"india"
//     }
// );
//     await list.save();
//     console.log("yess");
//     res.send("ahhhhhhh!");
// });


app.get("/home/search",async(req,res)=>{
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
});

app.get("/", (req,res)=>{
    res.render("listings/login.ejs")
}); 


