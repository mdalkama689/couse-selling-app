const jwt = require('jsonwebtoken')
const signUpSchema = require("../validations/signup.schema");
const bcrypt = require("bcrypt");
const userModel = require('../models/user.model');

const signUpUser = async (req, res) => {
  const { fullName, email, password } = req.body;


  if (!fullName?.trim() || !email?.trim() || !password?.trim()) {
    return res.status(400).json({ error: "Invalid credentials, try again" });
  }
  const validation = signUpSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ error: validation.error.issues[0].message });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 5);

    const user = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
    });
    user.password = undefined;
    res.status(200).json({
      user,
      msg: "user signup successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already registered!" });
    }
    console.log("error : ", error);
    return res.status(400).json({ error: error.message });
  }
};

const signInUser = async (req, res) => {
  const {  email, password } = req.body;
  console.log("req.body : ", req.body);

  if (!email?.trim() || !password?.trim()) {
    return res.status(400).json({ error: "Invalid credentials, try again" });
  }
  

  try {
   const user = await userModel.findOne({email})

   if(!user){
    return res.status(400).json({ error: "Invalid credentials, try again" });
   }
   const isPasswordValid = await bcrypt.compare(password, user.password)
   if(!isPasswordValid){
    return res.status(400).json({ error: "Invalid credentials, try again" });
   }

   const JWT_USER_SECRET = process.env.JWT_USER_SECRET
   const token = jwt.sign({_id: user._id}, JWT_USER_SECRET, {
    expiresIn: '7d'
   })
   const options = {httpOnly: true, secure: true,  maxAge: 7*24*60*60*1000}
   res.cookie('token', token, options)
    user.password = undefined;
    res.status(200).json({
      user,
      msg: "user signin successfully",
    });
  } catch (error) {
   
    console.log("error : ", error);
    return res.status(400).json({ error: error.message });
  }
};

const logOutUser = (req, res) => {
  res.clearCookie('token')
  res.status(200).json({msg: "user logout successfully"})
}


const getUserDetails = async (req, res) => {

const userId = req.userDetails._id 
try {
  const user = await userModel.findById(userId).select('-password')
 

 res.status(200).json({
    user, 
    msg: "get user deatails successfully",
  });

}
catch (error) {
  console.log("error : ", error);
    return res.status(400).json({ error: error.message });
}
}

module.exports = {
  signUpUser,
  signInUser,
  logOutUser,
  getUserDetails
};
