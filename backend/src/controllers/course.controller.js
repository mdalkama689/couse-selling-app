const { default: mongoose } = require("mongoose");
const adminModel = require("../models/admin.model");
const courseModel = require("../models/course.model");
const purchaseModel = require("../models/purchase.model");
const uploadOnCloudinary = require("../utils/cloudinary");
const courseSchema = require("../validations/course.schema");
const videoSchema = require("../validations/video.schema");

const createCourse = async (req, res) => {
  const {
    title,
    price,
    originalPrice,
    syllabus,
    discountInPercentage,
    description,
  } = req.body;
  const AdminId = req.userDetails._id;

  if (
    !title?.trim() ||
    !price?.trim() ||
    !syllabus?.trim() ||
    !description?.trim() ||
    !req?.file?.path
  ) {
    return res.status(400).json({
      msg: "Please enter all required fields",
    });
  }

  const validation = courseSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({
      error: validation.error.issues[0].message,
    });
  }
  try {
    const filePath = req?.file?.path;
    const uploadImage = await uploadOnCloudinary(filePath);

    const course = await courseModel.create({
      title,
      originalPrice,
      discountInPercentage,
      price,
      description,
      syllabus,
      creator: AdminId,
      image: {
        secure_url: uploadImage.secure_url,
        public_id: uploadImage.public_id,
      },
    });
    const admin = await adminModel.findById(AdminId);

    admin.courseCreated.push(course._id);
    await admin.save();
    res.status(200).json({
      msg: "course created successfully",
      course,
    });
  } catch (error) {
    console.log("error : ", error);
    return res.status(400).json({ error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  const adminId = req.userDetails._id;

  const courseId = req.params.courseId;
  if (!courseId) {
    return res.status(400).json({
      msg: "Please provide a course ID.",
    });
  }
  try {
    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({
        msg: "Course does not exist.",
      });
    }
    const courseCreatorId = course.creator.toString();

    const isValidAdmin = adminId === courseCreatorId;

    if (!isValidAdmin) {
      return res.status(403).json({
        msg: "You are not the admin of this course, so you cannot delete it.",
      });
    }
    await course.deleteOne();
    res.status(200).json({
      msg: "course deleted successfully",
    });
  } catch (error) {
    console.log("error : ", error);
    return res.status(400).json({ error: error.message });
  }
};

const getAllCoursesByAdmin = async (req, res) => {
  const AdminId = req.userDetails._id;
  try {
    const getAllMyCourses = await courseModel.find({ creator: AdminId });
    res.status(200).json({
      msg: "Retrieved all courses successfully",
      courses: getAllMyCourses,
    });
  } catch (error) {
    console.log("error : ", error);
    return res.status(400).json({ error: error.message });
  }
};

const getPreveiwCourses = async (req, res) => {
  try {
    const allCourses = await courseModel.find();

    const threeCourses = allCourses.splice(0, 3);

    res.status(200).json({
      msg: "fetch three courses successfully",
      threeCourses,
    });
  } catch (error) {
    console.log("error : ", error);
    return res.status(400).json({ error: error.message });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const allCourses = await courseModel.find();

    res.status(200).json({
      msg: "fetch all courses successfully",
      allCourses,
    });
  } catch (error) {
    console.log("error : ", error);
    return res.status(400).json({ error: error.message });
  }
};

const purchaseCourse = async (req, res) => {
  const userId = req.userDetails._id;

  const courseId = req.params.courseId;

  if (!courseId) {
    return res.status(400).json({
      msg: "Please provide a course ID.",
    });
  }
  try {
    const course = await courseModel.findById(courseId);

    if (!course) {
      return res.status(404).json({
        msg: "Course does not exist.",
      });
    }

    const userExits = await purchaseModel.findOne({ userId });

    if (userExits) {
      const allcoursesBoughtByExistingUser = userExits.courses;
      const courseAlreadyBoughtByUser =
        allcoursesBoughtByExistingUser.includes(courseId);

      if (courseAlreadyBoughtByUser) {
        return res.status(409).json({
          msg: "Course already bought.",
        });
      }

      userExits.courses.push(course);
      await userExits.save();
      console.log("userexits : ", userExits);
      console.log("if");
    } else {
      const newuser = await purchaseModel.create({
        userId,
        courses: [course],
      });
      console.log("new user : ", newuser);
      console.log("else");
    }

    res.status(200).json({
      msg: "course purchased successfully",
    });
  } catch (error) {
    console.log("error : ", error);
    return res.status(400).json({ error: error.message });
  }
};

const allPurchasesCourse = async (req, res) => {
  const userId = req.userDetails._id;

  try {
    const getAllPurchasedCourse = await purchaseModel.findOne({ userId });

    const allCourses = [];

    if (!getAllPurchasedCourse) {
      return res.status(200).json({
        msg: "You don't have any purchased course.",
        allCourses,
      });
    }

    for (let i = 0; i < getAllPurchasedCourse.courses.length; i++) {
      const courseId = getAllPurchasedCourse.courses[i];
      const courseDetails = await courseModel.findById(courseId);
      allCourses.push(courseDetails);
    }
    res.status(200).json({
      msg: "course purchased successfully",
      allCourses,
    });
  } catch (error) {
    console.log("error : ", error);
    return res.status(400).json({ error: error.message });
  }
};

const addVideoToCourse = async (req, res) => {
  const adminId = req.userDetails._id;

  const courseId = req.params.courseId;
  if (!courseId) {
    return res.status(400).json({
      msg: "Please provide a course ID.",
    });
  }
  try {
    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({
        msg: "Course does not exist.",
      });
    }
    const courseCreatorId = course.creator.toString();

    const isValidAdmin = adminId === courseCreatorId;

    if (!isValidAdmin) {
      return res.status(403).json({
        msg: "You are not the admin of this course, so you cannot delete it.",
      });
    }

    const { title } = req.body;
    if (!title?.trim() || !req?.file) {
      res.status(400).json({
        msg: "Please enter all required fields",
      });
    }

    const validation = videoSchema.safeParse(req.body);

    if (!validation.success) {
      console.log("if");
      return res.status(400).json({
        error: validation.error.issues[0].message,
      });
    }
    const filePath = req.file?.path;
    const uploadVideo = await uploadOnCloudinary(filePath);
    course.videos.push({
      title,
      decsription: req.body?.decsription || "",
      video: {
        public_id: uploadVideo.public_id,
        secure_url: uploadVideo.secure_url,
      },
    });

    await course.save();

    res.status(200).json({
      msg: "vide added successfully!",
      course,
    });
  } catch (error) {
    return console.log(error.message);
  }
};

const deleteVideoFromCourse = async (req, res) => {
  const adminId = req.userDetails._id;

  const courseId = req.params.courseId;
  if (!courseId) {
    return res.status(400).json({
      msg: "Please provide a course ID.",
    });
  }
  try {
    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({
        msg: "Course does not exist.",
      });
    }
    const videoId = req.params.videoId;
    let videoIndex = -1;

    for (let i = 0; i < course.videos.length; i++) {
      console.log("each video : ", course.videos[i]._id);
      if (course.videos[i]._id.toString() === videoId) {
        videoIndex = i;
      }
    }
    if (videoIndex === -1) {
      return res.status(404).json({
        msg: "Video  does not exist.",
      });
    }
    const courseCreatorId = course.creator.toString();

    const isValidAdmin = adminId === courseCreatorId;

    if (!isValidAdmin) {
      return res.status(403).json({
        msg: "You are not the admin of this course, so you cannot delete this video.",
      });
    }
    course.videos.splice(videoIndex, 1);
    await course.save();
    console.log(course.videos.length);
    res.status(200).json({
      msg: "video deleted successfully",
      course,
    });
  } catch (error) {
    console.log("error : ", error);
    return res.status(400).json({ error: error.message });
  }
};

const eachCourseDescription = async (req, res) => {
  const courseId = req.params.courseId;
  if (!courseId) {
    return res.status(400).json({
      msg: "Please provide a course ID.",
    });
  }
  try {
    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({
        msg: "Course does not exist.",
      });
    }
    res.status(200).json({
      msg: `fetch details of ${course.title} `,
      course,
    });
  } catch (error) {
    console.log("error : ", error);
    return res.status(400).json({ error: error.message });
  }
};

const totalAmountOfCourse = async (req, res, next) => {
  const courseId = req.params.courseId;
  if (!courseId) {
    return res.status(400).json({
      msg: "Please provide a course ID.",
    });
  }
  try {
    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({
        msg: "Course does not exist.",
      });
    }
    const price = course.price;
    const originalPrice = course.originalPrice;

    const discountAmount = price - originalPrice;

    console.log(`fetch final amount of ${course.title} `);
    console.log("discountAmount : ", discountAmount);
    console.log(" course : ", course);

    next();
  } catch (error) {
    console.log("error : ", error);
    return res.status(400).json({ error: error.message });
  }
};

const accessPurchasedCourseContent = async (req, res) => {
  const courseId = req.params.courseId;
  if (!courseId) {
    return res.status(400).json({
      msg: "Please provide a course ID.",
    });
  }
  try {
    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({
        msg: "Course does not exist.",
      });
    }

    const userId = req.userDetails._id;
    const purchasedCourse = await purchaseModel.findOne({ userId });
    
    if (!purchasedCourse) {
      return res.status(403).json({
        message:
          "Access denied: Please purchase the course to access its content.",
      });
    }

    const allCoursesIdOfPurchasedByUser = purchasedCourse?.courses;

    const matchCourse = allCoursesIdOfPurchasedByUser.find((eachCourseId) => {
      const isMatch = eachCourseId.toString() === courseId;
      return isMatch;
    });
    if (!matchCourse) {
      return res.status(403).json({
        message:
          "Access denied: Please purchase the course to access its content.",
      });
    }
    const courseDeatils = await courseModel.findById(matchCourse);

    let message;
    let courseContentExists = false 
    if (!courseDeatils?.videos || courseDeatils?.videos.length == 0){
      message = "Course does not contain content"
    }else {
      message  = 'Course content fetch successfully!'
      courseContentExists = true 
    }

    res.status(200).json({
    message,
    courseContentLength: courseContentExists  === true  ? 1 : 0,
      courseContents: courseDeatils?.videos 
    });


  } catch (error) {
    console.log("error : ", error);
    return res.status(400).json({ error: error.message });
  }
};




module.exports = {
  createCourse,
  deleteCourse,
  getPreveiwCourses,
  getAllCourses,
  purchaseCourse,
  allPurchasesCourse,
  addVideoToCourse,
  deleteVideoFromCourse,
  eachCourseDescription,
  totalAmountOfCourse,
  getAllCoursesByAdmin,
  accessPurchasedCourseContent,
};
