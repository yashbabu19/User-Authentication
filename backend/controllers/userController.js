import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstname: user.firstname,
      lastname:user.lastname,
      phone: user.phone,
      Address: user.Address,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@description     Register new user
//@route           POST /api/users/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstname,lastname,phone, address, email, password} = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await User.create({
    firstname,
    lastname,
    phone,
    address,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstname: user.firstname,
      lastname:user.lastname,
      phone: user.phone,
      address: user.address,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const userprofile = asyncHandler(async (req, res) => {
  const { firstname,lastname,phone, address, email, password} = req.body;
  const user = await User.findOne({ email });
  res.json({
    _id: user._id,
    firstname: user.firstname,
    lastname:user.lastname,
    phone: user.phone,
    address: user.address,
    email: user.email,
    token: generateToken(user._id),
  });
});
export { authUser, registerUser,userprofile };
