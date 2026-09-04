const mongoose = require("mongoose");
const schema= mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new schema({
    email:{
        type:String,
        required:true
    },
});

userSchema.plugin(passportLocalMongoose);

const user = mongoose.model("user",userSchema);
//authomatically added the salt and hashing of password


module.exports = user;