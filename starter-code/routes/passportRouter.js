const express        = require("express");
const router         = express.Router();
// User model
const User           = require("../models/user");
// Bcrypt to encrypt passwords
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;
const ensureLogin = require("connect-ensure-login");
const passport      = require("passport");
const mongoose = require('mongoose')



router.get("/signup", (req, res) => {
  res.render("passport/signup", { user: req.user });
});

router.post("/signup", (req, res) => {
  const username = req.body.username
  const password = req.body.password



  if (username ==  ''|| password == '') {
    res.render('error')
    return
  }

    const salt  = bcrypt.genSaltSync(bcryptSalt)
    const newpass =  bcrypt.hashSync(password, salt)
    const user = new User({username, newpass})
    console.log(user)

    user.save((err, user) => {
      if(err){
        return
      }
      res.render("passport/signup", { user: req.user });
    })

})


router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("passport/private", { user: req.user });
});






module.exports = router;
