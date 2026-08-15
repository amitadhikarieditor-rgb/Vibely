const mongoose = require("mongoose");
const initData= require("./data.js");
const listing = require("../models/model.js");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/listings")
}

main().then((res)=>{
    console.log("ho gya connect");
}).catch((err)=>{
    console.log("lag gye")
});

const initDb= async ()=>{
    await listing.deleteMany({});
    await listing.insertMany(initData.data);
    console.log("dal gya bhaiiii oyeeeeee");
}

initDb();