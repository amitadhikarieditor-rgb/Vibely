const mongoose = require("mongoose");
const schema= mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new schema({
    email:{
        type:String,
        required:true
    },
    wishlist:[
        {
        type:schema.Types.ObjectId,
        ref:"listing"
    }
]
});

//authomatically added the salt and hashing of password
userSchema.plugin(passportLocalMongoose);
const user = mongoose.model("user",userSchema);
module.exports = user;