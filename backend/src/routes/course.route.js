const express = require("express");
const adminAuthMiddleware = require("../middlewares/admin.middleware");
const upload = require("../middlewares/multer.middleware");
const { createCourse, deleteCourse, getPreveiwCourses, getAllCourses, purchaseCourse, allPurchasesCourse, addVideoToCourse, deleteVideoFromCourse, eachCourseDescription, totalAmountOfCourse, getAllCoursesByAdmin} = require("../controllers/course.controller");

const userOrAdminAuthMiddleware = require("../middlewares/userOrAdmin.middleware");


const router = express.Router()


router.post('/create', adminAuthMiddleware, upload.single('courseImage'),  createCourse)
router.delete('/delete/:courseId', adminAuthMiddleware, deleteCourse)
router.get('/admin', adminAuthMiddleware, getAllCoursesByAdmin)
router.delete('/delete/:courseId', adminAuthMiddleware, deleteCourse)
router.get('/', getPreveiwCourses)
router.get('/all', getAllCourses)
router.post('/purchase/:courseId',userOrAdminAuthMiddleware,totalAmountOfCourse,  purchaseCourse)
router.get('/purchases', userOrAdminAuthMiddleware  , allPurchasesCourse)
router.post('/add/video/:courseId', adminAuthMiddleware , upload.single('video'), addVideoToCourse)
router.delete('/:courseId/delete/video/:videoId', adminAuthMiddleware , deleteVideoFromCourse)
router.get('/description/:courseId', eachCourseDescription)
module.exports = router