const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
if(!process.env.JWT_KEY){
  process.env.JWT_KEY = 'local_server_secret';
}
if(!process.env.MONGO_URL){
  process.env.MONGO_URL = 'mongodb://localhost:27017/post-demo';
}
const app = express();
console.log('process.env:', process.env);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log("Connection failed!", err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static( path.join(__dirname,"images")));
app.use("/", express.static(path.join(__dirname,"angular")));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

app.use((req,res,next )=>{
  res.sendFile(path.join(__dirname, 'angular','index.html'));

});


module.exports = app;
