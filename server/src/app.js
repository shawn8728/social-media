import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";

const app = express();

mongoose.connect("mongodb://localhost:27017/userTest");

app.use(bodyParser.json());

app.use(cors());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const userSchema = new mongoose.Schema({
  phone: String,
  username: String,
  password: String,
  email: String,
  bio: String,
});

userSchema.plugin(passportLocalMongoose, { usernameField: "phone" });

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.route("/").get(function (req, res) {
//     if (req.isAuthenticated()) {
//       res.render("/");
//     } else {
//       res.redirect("/login");
//     }
//   });

app.route("/login").post(async (req, res) => {
  const { phone, password } = req.body;

  console.log("Trying to login...");
  try {
    // authenticating user
    const authRes = await User.authenticate()(phone, password);

    // if authentication failed return error
    if (authRes.error) {
      res.status(600).send({ message: "Authentication failed" });
    } else {
      // if authentication successful, log user in
      const user = authRes.user;
      req.login(user, (err) => {
        if (err) {
          res.status(500).send({ message: "Error logging in" });
          console.error(err);
        }

        const payload = { userData: user };
        const token = jwt.sign(payload, "shhhhh");
        res.status(200).send({ token: token, message: "Successfully logged in!" });
        console.log("Successfully logged in!");
      });
    }
  } catch (err) {
    console.error(err);
  }
});

app.route("/logout").post((req, res) => {});

app.route("/register").post(async (req, res) => {
  const { phone, username, email, bio, password } = req.body;

  const newUser = new User({
    phone: phone,
    username: username,
    email: email,
    bio: bio,
  });

  try {
    console.log("Trying to register...");
    const res = await User.register(newUser, password);
    console.log("Successfully registered!");
  } catch (err) {
    console.error(err);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000.");
});
