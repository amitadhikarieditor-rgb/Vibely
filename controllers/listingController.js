const listing = require("../models/model.js"); 

module.exports.index = async (req,res)=>{
    const items = await listing.find({});
    console.log("horha hai")
    res.render("listings/home.ejs", {items});
};

module.exports.Search =async(req,res)=>{
    let search = String(req.query.q);
    const conditions =[{title:{$regex:search, $options:"i"}},
        {country:{$regex:search, $options:"i"}},
        {location:{$regex:search, $options:"i"}},
        {description:{$regex:search, $options:"i"}}];
    if(!isNaN(Number(search))){
        conditions.push({price:Number(search)});
    };
    if(!search){
        req.flash("error","please enter a valid search");
        return res.redirect("/home");
    };
    const card= await listing.find({$or:conditions})
    res.render("listings/search.ejs", {card});
    console.log(req.query.q);
    console.log(card);
};

module.exports.Show = async(req,res)=>{
    const id = req.params.id;
    const item = await listing.findById(id).populate({path:"reviews", populate:{path:"author"}}).populate("owner");
    if(!item){
        req.flash("error","Venue asked for does not exists")
        return res.redirect("/home")
    };
    console.log(item);
    res.render("listings/show.ejs", {item})
};

module.exports.new = async (req,res)=>{
    let {filename, path} = req.file;
    const {title,description,price,location,country,image} = req.body;
    let add = new listing(req.body.listing);
    add.owner = req.user._id;
    add.image = {url:path, filename:filename}
    await add.save();
    req.flash("success", "added successfully")
    res.redirect("/home");
       console.log(req.file);
    console.log(req.body);
};

module.exports.destroy = async (req,res)=>{
    const id=req.params.id;
    const Del = await listing.findByIdAndDelete(id);
    req.flash("success", "deleted sucessfully");
    res.redirect("/home"); 
}

module.exports.edit= async (req,res)=>{
     const {title,description,price,location,country,image} = req.body;
     const id = req.params.id;
     const edit = await listing.findByIdAndUpdate(id,req.body.listing, {returnDocument: "after"});
     res.render("listings/update.ejs", {edit});
};