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

const postSchema = new mongoose.Schema({
  userid: String,
  username: String,
  content: String,
  createtime: Date,
});

userSchema.plugin(passportLocalMongoose, { usernameField: "phone" });

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.route("/").get(async (req, res) => {
  // get all the posts from the database and send them to the client
  // console.log("Trying to get posts...");
  try {
    const posts = await Post.find();
    res.status(200).send(posts);
    // console.log("Successfully got posts!");
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error getting posts" });
  }
});

app.route("/mypost").get(async (req, res) => {
  // get user posts from the database and send them to the client
  // console.log("Trying to get posts...");

  const userid = req.query.userid;
  try {
    const posts = await Post.find({ userid: userid }).exec();
    res.status(200).send(posts);
    // console.log("Successfully got posts!");
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error getting posts" });
  }
});

app.route("/login").post(async (req, res) => {
  const { phone, password } = req.body;

  console.log("Trying to login...");
  try {
    // authenticating user
    const authRes = await User.authenticate()(phone, password);

    // if authentication failed return error
    if (authRes.error) {
      res.status(600).send({ message: "Authentication failed" });
      console.error(authRes.error);
    } else {
      // if authentication successful, log user in
      const user = authRes.user;
      req.login(user, (err) => {
        if (err) {
          res.status(500).send({ message: "Error logging in" });
          console.error(err);
        }
        // pass a toaken to the client if login successful
        const payload = { userData: user };
        const token = jwt.sign(payload, "shhhhh");
        res
          .status(200)
          .send({ token: token, message: "Successfully logged in!" });
        // console.log("Successfully logged in!");
      });
    }
  } catch (err) {
    console.error(err);
  }
});

app.route("/logout").post((req, res) => {
  console.log("Trying to logout...");
  req.logout((err) => {
    if (err) {
      res.status(500).send({ message: "Error logging out" });
      console.error(err);
    } else {
      res.status(200).send({ message: "Successfully logged out!" });
      // console.log("Successfully logged out!");
    }
  });
});

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

    // registering user
    const registerRes = await User.register(newUser, password);
    if (registerRes.error) {
      res.status(600).send({ message: "Registration failed" });
      console.error(registerRes.error);
    }
    res.status(200).send({ message: "Successfully registered!" });
    // console.log("Successfully registered!");
  } catch (err) {
    console.error(err);
  }
});

app.route("/createpost").post(async (req, res) => {
  const { userid, username, content, createtime } = req.body;

  const newPost = new Post({
    userid: userid,
    username: username,
    content: content,
    createtime: createtime,
  });

  try {
    console.log("Trying to create post...");
    // creating post
    const postRes = await newPost.save();
    if (postRes.error) {
      res.status(600).send({ message: "Post creation failed" });
      console.error(postRes.error);
    }
    res.status(200).send({ message: "Successfully created post!" });
    // console.log("Successfully created post!");
  } catch (err) {
    console.error(err);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000.");
});
