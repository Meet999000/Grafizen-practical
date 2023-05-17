const user = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password || !phone) {
    return res
      .status(400)
      .json({ status: 400, message: "Please fill all the fields." });
  }
  try {
    const checkUser = await user.findOne({ email });
    if (checkUser) {
      return res
        .status(400)
        .json({ status: 400, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = {
      name,
      email,
      password: hashedPassword,
      phone,
    };
    const newUser = await user.create(data);
    return res.status(200).json({ status: 200, message: "User created" });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await user.findOne({ email }).lean();
    if (!checkUser) {
      return res
        .status(400)
        .json({ status: 400, message: "User does not exists" });
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) {
      return res
        .status(400)
        .json({ status: 400, message: "Password is wrong." });
    }

    // delete checkUser.password;
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: checkUser,
      },
      "0a6b944d-d2fb-46fc-a85e-0295c986cd9f"
    );
    const payload = {
      token,
      user: checkUser,
      token_type: "Bearer",
    };
    await user.findOneAndUpdate(
      {
        _id: checkUser._id,
      },
      {
        $set: {
          token: token,
        },
      }
    );
    return res
      .status(200)
      .json({ status: 200, message: "Login success", payload });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signup,
  login,
};
