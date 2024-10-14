const jwt = require("jsonwebtoken");
const signUpSchema = require("../validations/signup.schema");
const bcrypt = require("bcrypt");
const adminModel = require("../models/admin.model");

const signUpAdmin = async (req, res) => {
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

    const user = await adminModel.create({
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

const signInAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password?.trim()) {
    return res.status(400).json({ error: "Invalid credentials, try again" });
  }

  try {
    const user = await adminModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials, try again" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials, try again" });
    }

    const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;
    const token = jwt.sign({ _id: user._id }, JWT_ADMIN_SECRET, {
      expiresIn: "7d",
    });
    const options = {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
    res.cookie("token", token, options);
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

const logOutAdmin = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ msg: "user logout successfully" });
};

const getAdminDetails = async (req, res) => {
  const userId = req.userDetails._id;
  try {
    
    const user = await adminModel.findById(userId).select("-password");

    res.status(200).json({
      user,
      msg: "get admin deatails successfully",
    });
  } catch (error) {
    console.log("error : ", error);
    return res.status(400).json({ error: error.message });
  }
};


module.exports = {
  signUpAdmin,
  signInAdmin,
  getAdminDetails,
  logOutAdmin,
};
