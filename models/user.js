const mongoose = require("mongoose");
const schema= mongoose.Schema;

const passportlocalMongoose = require("passport-local-mongoose")

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
});

//authomatically added the salt and hashing of password
User.plugin(passportLocalMongoose);

const user = mongoose.model("user",userSchema);

module.exports = user;