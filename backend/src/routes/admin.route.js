const express = require("express");
const { signUpAdmin, signInAdmin, logOutAdmin, getAdminDetails} = require("../controllers/admin.controller");
const adminAuthMiddleware = require("../middlewares/admin.middleware");


const router = express.Router()

router.post('/signup', signUpAdmin)
router.post('/signin', signInAdmin)
router.post('/logout', logOutAdmin)
router.get('/me', adminAuthMiddleware,  getAdminDetails)
 module.exports = router