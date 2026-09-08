const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../models/model.js");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/listings");
}

const initDb = async () => {

    await listing.deleteMany({});

    const data = initData.data.map((obj) => ({
        ...obj,
        owner: "6a9987477c517c96b1c98f06"
    }));

    await listing.insertMany(data);

    console.log(`${data.length} listings successfully inserted`);
};

main()
    .then(async () => {
        console.log("ho gya connect");

        await initDb();

        await mongoose.connection.close();

        console.log("Database connection closed");
    })
    .catch((err) => {
        console.log(err);
    });
initDb();