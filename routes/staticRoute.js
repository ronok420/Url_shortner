const express = require('express');
const router = express.Router();
const Url = require('../models/url');
const { restrictTo } = require('../middlewares/auth');

router.get('/',restrictTo(["NORMAL"]), async (req, res) => {
    // if(!req.user) {
    //     return res.redirect('/login');
    // }
       const urls = await Url.find({ createdBy: req.user._id });
    res.render('home',{urls});
});
router.get('/admin/urls',restrictTo(["ADMIN"]), async (req, res) => {
    // if(!req.user) {
    //     return res.redirect('/login');
    // }
       const urls = await Url.find({});
    res.render('home',{urls});
});

router.get('/signup', (req, res) => {
    res.render('signup');
});
router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;