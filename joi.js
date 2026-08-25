const joi = require("joi");

const listingSchema = joi.object({
    listing:joi.object({
        titile:joi.string().required(),
        description:joi.string().required().min(20).max(100),
        location:joi.string().required(),
        country:joi.string().required(),
        price:joi.string().required().min(0),
        image:joi.string().allow("",null),
    }).required(),
});

module.exports= listingSchema;