require('dotenv').config()

const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localPath) => {
 
  try {
    if (!localPath) return;

    const response = await cloudinary.uploader.upload(localPath, {
      resource_type: "auto",
      folder: 'course-selling-app'
    });
  
    fs.unlinkSync(localPath)

    return response;
  } catch (error) {
    fs.unlinkSync(localPath)
    return;
  }
};

module.exports = uploadOnCloudinary;
