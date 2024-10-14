const express = require("express");
const { signUpUser, signInUser, logOutUser, getUserDetails } = require("../controllers/user.controller");
const userAuthMiddleware = require("../middlewares/user.middleware");

const router = express.Router()

router.post('/signup', signUpUser)
router.post('/signin', signInUser)
router.post('/logout', logOutUser)
router.get('/me', userAuthMiddleware, getUserDetails)
 module.exports = router