//jshint esversion:6
require('dotenv').config()
const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption");
// const md5 = require("md5");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({
  extended: true
}));

// mongoose.connect("mongodb+srv://Kushagra_K:KKkushagra223@cluster0.tgoou.mongodb.net/userDB", {useNewUrlParser: true});
mongoose.connect("mongodb+srv://kushagra_k:kushagra223_K@cluster0.rsxb8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")


console.log(process.env.SECRET);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  highScore: {type: Number, default: 0}
});

// const scoreSchema = new mongoose.Schema({
//   highScore: {type: Int, default: 0}
// });
//
// const High = mongoose.model("High", scoreSchema);

var secret = process.env.SECRET;
// userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] });

const User = mongoose.model("User", userSchema);

app.get("/", function(req,res){
  res.render("home");
})

app.get("/login", function(req,res){
  res.render("login");
});

app.get("/register", function(req,res){
  res.render("register");
});


app.post("/register", function(req,res){

  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    const newUser = new User({
      email: req.body.username,
      password: hash
    });

    newUser.save(function(err){
      if(err){
          console.log(err);
      }

      else{
        res.render("index");  // secret page must be rendered only when there is no error in registering
      }
    });
  });


})

app.post("/login", function(req,res){
  const username= req.body.username;
  const password= req.body.password;

  User.findOne({email: username}, function(err, foundUser){
    if(err){
      console.log(err);
    }
    else{
      if(foundUser){
        bcrypt.compare(password, foundUser.password, function(err, result) {
          if(result == true){
            res.render("index");
          }
        });
      }
    }
  })
});






app.listen(3000,function(){
  console.log("Server running on port 3000");
})
