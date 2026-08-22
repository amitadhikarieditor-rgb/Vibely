const mongoose = require("mongoose");

const schema= mongoose.Schema;

const listSchema= new schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        url:{type:String,
        default:"https://st.hzcdn.com/simgs/pictures/house-exteriors/frenchmans-creek-stoke-fleming-bbh-chartered-architects-ltd-img~b6e10e01046dcd50_4-0911-1-2a48c60.jpg?utm_source=chatgpt.com",
        set: (v)=> v==="" ? "https://st.hzcdn.com/simgs/pictures/house-exteriors/frenchmans-creek-stoke-fleming-bbh-chartered-architects-ltd-img~b6e10e01046dcd50_4-0911-1-2a48c60.jpg?utm_source=chatgpt.com":v,
    }},
    location:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    }  
});

const listing = mongoose.model("listing", listSchema);
module.exports =listing;