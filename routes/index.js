var express = require('express');
var router = express.Router();
const userModel = require("./users");
const mailModel = require("./mail");
const passport = require('passport');
const multer = require('multer')

const localStrategy = require("passport-local");
const { populate } = require('./users');

passport.use(new localStrategy(userModel.authenticate()));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads')
  },
  filename: function (req, file, cb) {
    const fn = Date.now() + Math.floor(Math.random() * 1000000) + file.originalname;
    cb(null, fn)
  }
})

const upload = multer({ storage: storage })


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login_signup', function (req, res, next) {
  res.render('login-signup');
});

router.post("/signup", function (req, res) {
  const userData = new userModel({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email
  })
  userModel.register(userData, req.body.password)
    .then(function (registeredUser) {
      passport.authenticate('local')(req, res, function () {
        res.redirect("/profile");
      })
    })
    .catch(function (err) {
      console.log(err);
      res.redirect("/login_signup");
    })
});

router.post("/fileupload", isLoggedIn, upload.single('image'), async function(req,res){
  // console.log(req.file);
  const founduser = await userModel.findOne({username: req.session.passport.user});
  founduser.image = req.file.filename;
  await founduser.save();
  res.redirect("back")
})

router.post("/login", passport.authenticate('local', {
  successRedirect: "/profile",
  failureRedirect: "/login_signup" 
}), function (req, res) { })

router.get("/logout", function (req, res) {
  req.logOut(function (err) {
    if (err) throw err; 
    res.redirect("/login_signup")
  });
})

router.get("/profile", isLoggedIn, async function (req, res) {
  const foundUser = await userModel
  .findOne({ username: req.session.passport.user })
  .populate({
    path: 'receivedmails',
    populate:{
      path: 'senderid'
    }
  })
  // console.log(foundUser)
  res.render("profile", { user: foundUser })
})

router.get("/sentmails", isLoggedIn, async function (req, res) {
  const foundUser = await userModel
  .findOne({ username: req.session.passport.user })
  // .populate({
  //   path: 'receivedmails',
  //   populate:{
  //     path: 'senderid'
  //   }
  // })
  .populate({path: 'sentmails'})
  // console.log(foundUser)
  res.render("sentmails", { user: foundUser })
})

router.get("/read/mail/:id", isLoggedIn, async function (req, res) {
  const mail = await mailModel.findOne({ _id: req.params.id })
  .populate('senderid')
  mail.read=true;
  await mail.save();

  // console.log(mail);
  res.render("mail", { mail })

})

router.get("/delete/mail/:id", isLoggedIn, async function (req, res) {
  const mail = await mailModel.findOneAndDelete({ _id: req.params.id })
  
  res.redirect('back')
})

router.post("/compose", isLoggedIn, async function (req, res) {
  const loggedInUser = await userModel.findOne({ username: req.session.passport.user });
  const createdmail = await mailModel.create({
    senderid: loggedInUser._id,
    receiver: req.body.receiveremail,
    mailtext: req.body.mailtext
  })

  loggedInUser.sentmails.push(createdmail._id);
  const loggedInUserUpdated = loggedInUser.save();

  const receiveruser = await userModel.findOne({ email: req.body.receiveremail });
  receiveruser.receivedmails.push(createdmail._id);

  const receicerUserUpdated = await receiveruser.save();
  res.redirect("back")

})



function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login_signup")
}




// router.get("/login", function (req, res) {
//   res.render("login");
// })

module.exports = router;
