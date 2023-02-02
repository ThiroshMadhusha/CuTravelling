import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// user registration
export const register = async (req, res) => {
  try {
    // hashing password

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // end hashing password
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Successfully Created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Create. Try Again..!",
    });
  }
};

// user login
export const login = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });
    // if user doesnt match
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    // if user is exist then check password
    //   await key word use karama login ekedi password success nam witharak log wenna denawa
    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // if pass is incorrect
    if (!checkCorrectPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect Email or Password" });
    }
    const { password, role, ...rest } = user._doc;

    //   create jwt token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    //   set token in browser cookies
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: token.expiresIn,
      })
      .status(200)
      .json({
        success: true,
        message: "Successfully Login",
        token,
        data: { ...rest },
        role,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to Login" });
  }
};

// user login
// export const login = async (req, res) => {
//   const email = req.body.email;
//   try {
//     const user = await User.findOne({ email });
//     // if user doesn't exist
//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User Not Founded..!" });
//     }
//     // if user is exist then check the password or complete the password
//     const checkCorrectPassword = bcrypt.compare(
//       req.body.password,
//       user.password
//     );

//     // if password is incorrect
//     if (!checkCorrectPassword) {
//       return res.status(401).json({
//         success: false,
//         message: "Incorrect Email or Password",
//       });
//     }
//     const { password, role, ...rest } = user._doc;

//     // create jwt token
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET_KEY,
//       { expiresIn: "15d" }
//     );

//     //   set token in the browser cookies
//     res
//       .cookie("accessToken", token, {
//         httpOnly: true,
//         expires: token.expiresIn,
//       })
//       .status(200)
//       .json({
//         success: true,
//         message: "Successfully Login",
//         data: { ...rest },
//       });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed To Loging. Try Again..!",
//     });
//   }
// };
