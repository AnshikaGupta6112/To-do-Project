const express = require("express");
const bodyParser = require("body-parser");
var app = express();
app.set("view engine","ejs");
app.use(express.static('public'));             //all static files are present under public folder
app.use(express.urlencoded({extended:true}));   //to use body parser


const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/todo");
const trySchema = new mongoose.Schema({
    name:String
});

const item = mongoose.model("task",trySchema);
//todo.save({ wtimeout: 30000 });
//todo2.save({ wtimeout: 30000 });
//todo3.save({ wtimeout: 30000 });
//todo4.save({ wtimeout: 30000 });

app.get("/",function(req,res){
    item.find({})
       .then(foundItems => {
        res.render("list",{dayej : foundItems});
       })
       .catch(err => {
        console.log(err);
       });
});

app.post("/",function(req,res){
    const itemName = req.body.ele1;
    const todo4 = new item({
        name : itemName
    })
    todo4.save({ wtimeout: 30000 });
    res.redirect("/");
});

app.post("/delete", function(req, res) {
    const checkedItemId = req.body.checkbox1;
    item.findByIdAndRemove(checkedItemId)
      .then(() => {
        console.log("deleted");
        res.redirect("/");
      })
      .catch(err => {
        console.log(err);
      });
  });
  

app.listen("8000",function(){
    console.log("Server is running");
});