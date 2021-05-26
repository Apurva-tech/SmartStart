const express = require('express');
const router = express.Router();
const db = require('../helpers/dbServices');

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
      if(type==="investor"){
        try {
          db.return_startup((result)=>{
          console.log(result[0].startupLogo);
          res.render('cards_investor', {
            email: req.session.email,
            startups:result
          })
          //console.log("hello");
        });//db
        } catch (err) {
          console.error(err);
        }
     }
     else if (type==="intern"){
      try {
        db.return_startup((result)=>{
        console.log(result[0].startupLogo);
        res.render('cards_intern', {
          email: req.session.email,
          startups:result
        })
        //console.log("hello");
      });//db
      } catch (err) {
        console.error(err);
      }
     }//else if
     else{
      try {
        db.return_startup((result)=>{
        console.log(result[0].startupLogo);
        res.render('cards_startup', {
          email: req.session.email,
          startups:result
        })
        //console.log("hello");
      });//db
      } catch (err) {
        console.error(err);
      }
     }    
    }//if signed in
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
            }); 
          } catch (err) {
            console.error(err);
          }
    }
    else if(type==="intern")
    {
        try {
            console.log(req.session.email);
            res.render('account_intern', {
              email: req.session.email
            }); 
          } catch (err) {
            console.error(err);
          }
    }
    else{
         try {
        console.log(req.session.email);
        res.render('account_startup', {
          email: req.session.email
        }); 
      } catch (err) {
        console.error(err);
      }
    }
});

module.exports = router;