if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const mongoStore = require("connect-mongo").default;
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");

const expressError = require("./utils/expressError.js");
const user = require("./models/user.js");


const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter = require("./routes/users.js");

app.use(express.urlencoded({ extended: true }));

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);

app.set("view engine", "ejs");

app.engine("ejs", ejsMate);

app.use(methodOverride("_method"));


const store = mongoStore.create({
    mongoUrl: process.env.DB_URL,
    crypto: {
        secret: process.env.SECRET
    }
});


const sessionOption = {
    store: store,

    secret: process.env.SECRET,

    resave: false,

    saveUninitialized: true,

    cookie: {
        expires: new Date(
            Date.now() +
            7 * 24 * 60 * 60 * 1000
        ),

        maxAge:
            7 * 24 * 60 * 60 * 1000,

        httpOnly: true
    }
};

app.use(
    session(sessionOption)
);


app.use(flash());

passport.use(
    new localStrategy(
        user.authenticate()
    )
);

passport.serializeUser(
    user.serializeUser()
);

passport.deserializeUser(
    user.deserializeUser()
);

app.use(
    passport.initialize()
);

app.use(
    passport.session()
);


app.use((req, res, next) => {

    res.locals.success =
        req.flash("success");

    res.locals.error =
        req.flash("error");

    res.locals.currUser =
        req.user;

    next();
});

app.use("/", listingRouter);

app.use("/", reviewRouter);

app.use("/", userRouter);


app.all("/{*splat}", (req, res, next) => {

    next(
        new expressError(
            400,
            "page does not exist"
        )
    );

});
app.use((err, req, res, next) => {

    let {
        status = 500,
        message = "something went wrong"
    } = err;

    if (res.headersSent) {
        return next(err);
    }

    res
        .status(status)
        .render(
            "listings/error.ejs",
            { message }
        );

});

async function main() {

    await mongoose.connect(
        process.env.DB_URL
    );

}

main()
    .then(() => {

        console.log(
            "database ho gya connect"
        );

        app.listen(3030, () => {

            console.log(
                "server sun rha hai naa tu"
            );

            console.log(
                "http://localhost:3030"
            );

        });

    })
    .catch((err) => {

        console.log(
            err,
            "database ke lag gye"
        );

    });