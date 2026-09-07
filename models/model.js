const mongoose = require("mongoose");
const review = require("./review.js");

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
        url:String,
        filename:String  
    },
    location:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    reviews:[
        {
            type: schema.Types.ObjectId,
            ref: "review"
        }
    ],
     owner:{
              type: schema.Types.ObjectId,
              ref:"user"
        },
            geometry: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },

        coordinates: {
            type: [Number],
            required: true
        }
    },
    
});

listSchema.index({
    geometry: "2dsphere"
});

listSchema.post("findByOneAndDelete", async(listing)=>{
      if(listing){
        await review.deleteMany({_id: {$in:listing.reviews}})
      }
});

const listing = mongoose.model("listing", listSchema);
module.exports =listing;