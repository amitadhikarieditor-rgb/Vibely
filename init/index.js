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
    // await listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:'6a9987477c517c96b1c98f06'}));
    await listing.insertMany(initData.data);
    console.log("dal gya bhaiiii oyeeeeee");
}
initDb();