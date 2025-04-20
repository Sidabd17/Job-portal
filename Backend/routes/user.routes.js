const express = require('express');
const {register , login, logout, updateprofile, updateProfilephoto} = require('../Controllers/user.controller');
const router = express.Router();
const isAuthenticated = require('../middlewares/authmiddleware');
const singleUpload = require('../middlewares/multer');

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, singleUpload, updateprofile);
router.route("/profile/update/profilephoto").put(isAuthenticated, singleUpload, updateProfilephoto);

module.exports = router;