const listing = require("../models/model.js"); 
const geocode = require("../utils/geoCode.js");
const user = require("../models/user.js");

module.exports.index = async (req, res) => {
    const items = await listing.find({});
    const currUser = req.user || null;
    res.render("listings/home.ejs", {
        items,
        currUser
    });
};

module.exports.filter = async(req,res)=>{
    const query = req.query.category;
    const items = await listing.find({category:query});
    if(items.length === 0){
        req.flash("error", "there is no added items in this category Try adding yours");
        return res.redirect("/home");
    }else{
        res.render("listings/home.ejs", {items});
    }
    
};


// module.exports.trending = async (req, res) => {

//     const items = await listing.aggregate([
//         {
//             $addFields: {
//                 reviewCount: { $size: "$reviews" }
//             }
//         },
//         {
//             $sort: {
//                 reviewCount: -1
//             }
//         }
//     ]);
//     res.render("listings/home.ejs", { items });
// };

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

module.exports.Show = async (req, res) => {
    const { id } = req.params;

    const item = await listing.findById(id)
        .populate("owner")
        .populate({
            path: "reviews",
            populate: {
                path: "author"
            }
        });

    if (!item) {
        req.flash("error", "Listing does not exist");
        return res.redirect("/home");
    }

    res.render("listings/show.ejs", { item });
};

module.exports.new = async (req, res) => {

    const { location, country,category } = req.body.listing;
    console.log("categories:", category);
    const coordinates = await geocode(location, country);
    if (!coordinates) {
        req.flash(
            "error",
            "Invalid location. Please enter a valid location and country."
        );
        return res.redirect("/home/new");
    };
    const add = new listing(req.body.listing);
    add.owner = req.user._id;
    add.geometry = {
        type: "Point",
        coordinates: [
            coordinates.longitude,
            coordinates.latitude,
        ]
    };
    if (req.file) {
        add.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    };
    add.categories = category;
    await add.save();
    req.flash("success", "Listing added successfully");
    res.redirect("/home");
};

module.exports.destroy = async (req,res)=>{
    const id=req.params.id;
    const Del = await listing.findByIdAndDelete(id);
    req.flash("success", "deleted sucessfully");
    res.redirect("/home"); 
}

module.exports.edit= async (req,res)=>{
     const {title,description,price,location,country,image} = req.body;
     const { category } = req.body.listing;
     console.log("category:", category);
     const id = req.params.id;
     const edit = await listing.findByIdAndUpdate(id,req.body.listing, {returnDocument: "after"});
        if(typeof req.file !== "undefined"){
            let {filename, path} = req.file;
            edit.image = {url:path, filename:filename}
            edit.category = category;
            await edit.save();
        }
        if(!edit){
            req.flash("error","Venue asked for does not exists")
            return res.redirect("/home");
        }

     req.flash("success", "updated successfully");
     res.redirect(`/home/${id}/show`);
};

module.exports.GetEdit = async(req,res)=>{
    const id = req.params.id;
    const edit = await listing.findById(id);
    if(!edit){
        req.flash("error","Venue asked for does not exists")
        return res.redirect("/home")
    };
    res.render("listings/update.ejs", {edit});
};

module.exports.wishlist = async (req, res) => {

    const listingId = req.params.id;
    const currentUser = await user.findById(req.user._id);
    const alreadyAdded = currentUser.wishlist.some(
        id => id.toString() === listingId
    );
    if (alreadyAdded) {
        currentUser.wishlist.pull(listingId);
    } else {
        currentUser.wishlist.push(listingId);
    }
    await currentUser.save();
    res.json({
        success: true,
        added: !alreadyAdded
    });
};