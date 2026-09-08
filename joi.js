const joi = require("joi");

const listingSchema = joi.object({
    listing:joi.object({
        title:joi.string().required(),
        description:joi.string().required().min(20).max(500),
        location:joi.string().required(),
        country:joi.string().required(),
        price:joi.number().required().min(0),
        image: joi.object({
            url:joi.string().uri().allow("",null)
        }),
        category: joi.string()
    .valid(
        "Trending",
        "Rooms",
        "Mountains",
        "Hiking",
        "Beach",
        "Lakefront",
        "Farmhouses",
        "Forest",
        "Camping",
        "Snow",
        "Waterfront",
        "City",
        "Luxury",
        "Pool",
        "Boats",
        "Countryside",
        "Islands",
        "Glamping",
        "Castles",
        "Cabins"
    ),
    }).required(),
});

const reviewSchema = joi.object({
    review: joi.object({
        rating:joi.number().required().min(1).max(5),
        comment: joi.string().required()
    }).required()
});

module.exports = {listingSchema, reviewSchema};