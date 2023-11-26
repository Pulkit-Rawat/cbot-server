const User = require("../models/User");

const signup = async (req, res) => {
  let { email } = req.body;
  console.log("req body", req.body);
  try {
    const user = await User.findOne({
      email: email,
    });
    if (user)
      return res.status(200).json({
        message: "",
        error: "email already registered",
        status: false,
      });

    user = await User.create(req.body);

    if (!user)
      return res.status(200).json({
        message: "",
        error: "could not create user",
        status: false,
      });

    return res.status(200).json({
      message: "user created successfully",
      data: user,
      status: true,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { signup };
