const express = require('express');
const router = express.Router();
let type="";
router.get('/', function(req, res){
    console.log(req.session.email);
    console.log(req.session.type);
    type=req.session.type;
    res.render('index');
});

router.get("/login", function(req,res) {
    if(req.session.email !== undefined){
        res.redirect("/home")
    }
    else{
        res.render('login');
    }
});

router.get("/home", function(req, res){
    if(req.session.email !== undefined){
        try {
            res.render('cards', {
              name: req.session.email
            })
          } catch (err) {
            console.error(err);
          }
    }
});

router.get("/signup/signup_investor", function(req,res){
    res.render("signup_investor");
});

router.get("/signup/signup_startup", function(req,res){
    res.render("signup_startup")
});

router.get("/signup/signup_intern", function(req,res){
    res.render("signup_intern");
});

router.get("/account", function(req,res){
    if(type==="investor"){
        try {
            console.log(req.session.email);
            res.render('account_investor', {
              email: req.session.email
            })
          } catch (err) {
            console.error(err);
          }
    }
    else if(type==="intern")
    {
        res.send("intern route");
    }
    else{
        res.send("startup route")
    }
});

module.exports = router;