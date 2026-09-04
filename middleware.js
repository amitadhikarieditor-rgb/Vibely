const listing = require("./models/model");
const review = require("./models/review");
const user = require("./models/user");

module.exports.isLoggedIn= (req,res,next)=>{
    if(!req.isAuthenticated()){
        console.log(req.originalUrl);
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","user must be sgined Up or logged in for wondering");
        return res.redirect("/login");
    };
    next();
};

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner= async (req,res,next)=>{
     const id = req.params.id;
     const item = await listing.findById(id);
     if(res.locals.currUser && !item.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","user is not the owner of the listing");
        return res.redirect("/home");
     }
     next();
}


module.exports.isAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;

    const item = await review.findById(reviewId);

    if (!item) {
        req.flash("error", "Review not found");
        return res.redirect("/home");
    }

    if (!item.author.equals(res.locals.currUser._id)) {
        req.flash("error", "user is not the author of the review");
        return res.redirect(`/home/${id}/show`);
    }

    next();
};