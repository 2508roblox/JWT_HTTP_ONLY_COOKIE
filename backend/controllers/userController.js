import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
// thay vi dung try catch+ next(err) hoac throw de bat error thi tien trinh nay se tu dong khi co loi xay ra va truyen err qua next() de vao middleware err

//@desc Auth user/set token
//route POST /api/users/auth
//@access Public
const authUser = asyncHandler(async (req, res) => {

  const {email, password} = req.body
  let authUser = await User.findOne({email})
  if (authUser && (await authUser.matchPassword(password))) {
  
   await generateToken(res, authUser._id)
  // lưu vào res gửi cho client, lần req tiếp theo lấy jwt trong req
    res.status(201).json({
      _id: authUser._id,
      name: authUser.name,
      email: authUser.email
    });
  }else {
    res.status(400)
    throw new Error("Invalid email or password")
  }

});
//@desc register a new User
//route POST /api/users
//@access Public
const regiserUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existUser = await User.findOne({ email });
  if (existUser) {
    res.status(400)
    throw new Error("The Email Is Exist");
  }
  const newUser = await User.create({
    name,
    email,
    password,
  });
  if (newUser) {
    console.log('generate')
   await generateToken(res, newUser._id)
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email
    });
  }else {
    res.status(400)
    throw new Error("Invalid User Data")
  }
  
});
//@desc register a new User
//route POST /api/users/logout
//@access Public
const logout = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
      httpOnly:true,
      expires: new Date(0)
    })
    res.status(200)
    res.json("logout successfully") 
});
//@desc register a new User
//route GET /api/users/profile
//@access Private by Json
const getUserProfile = asyncHandler(async (req, res) => {
  let user = req.user
  res.status(200).json(user);
});
//@desc register a new User
//route Put /api/users/profile
//@access Private by Json
const updateUserProfile = asyncHandler(async (req, res) => {
  // body, param, obj lưu trong request từ client
  // cookie lưu trong res của máy chủ
  let id = req.user._id
  let updateUser = await User.findById(id)
  updateUser.name = req.body.name || updateUser.name
  updateUser.email = req.body.email || updateUser.email
  updateUser.password = req.body.password || updateUser.password
  await updateUser.save()
  res.json(updateUser )
});

export { authUser, regiserUser, logout, getUserProfile, updateUserProfile };
