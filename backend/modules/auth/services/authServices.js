const User = require("../../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User Signup
exports.signup = async (data) => {
  const {
    name,
    email,
    password,
    login_type,
    social_id,
    social_provider,
  } = data;

  if (login_type === "normal") {
    if (!name || !email) {
      throw new Error("Please Enter Name & Email");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User Is Already Registered");
    }

    if (!password) {
      throw new Error("Please Enter Password");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      login_type: "normal",
      login_status: false,
    });

    return { user };
  }

  if (login_type === "social") {
    if (!name) {
      throw new Error("Please Enter Name");
    }
    if (!social_id || !social_provider) {
      throw new Error("Please Enter Social Id & Social Provider");
    }

    const formattedSocialId = `${social_id}@${social_provider}`;

    const existingSocialUser = await User.findOne({
      social_id: formattedSocialId,
    });
    if (existingSocialUser) {
      throw new Error("User Is Already Registered");
    }

    const user = await User.create({
      name,
      // email is optional for social in schema; include if provided
      email: email || undefined,
      social_id: formattedSocialId,
      social_provider,
      login_status: false,
      login_type: "social",
    });

    return { user };
  }

  throw new Error("Invalid login type");
};

// Login
exports.login = async (data) => {
  const { email, password, login_type, social_id, social_provider } = data;

  if (login_type === "normal") {
    if (!email || !password) {
      throw new Error("Please Enter Email & Password");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User Not Found");
    }

    if (user.login_type !== "normal") {
      throw new Error("This email is registered with social login");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid Password");
    }

    user.login_status = true;
    await user.save();

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return { user, token };
  }

  if (login_type === "social") {
    if (!social_id || !social_provider) {
      throw new Error("Please Enter Social Id & Social Provider");
    }

    const formattedSocialId = `${social_id}@${social_provider}`;
    const user = await User.findOne({ social_id: formattedSocialId });

    if (!user) {
      throw new Error("User Not Registered With This Social Account");
    }

    if (user.login_type !== "social") {
      throw new Error("This account is registered as normal login");
    }

    user.login_status = true;
    await user.save();

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return { user, token };
  }

  throw new Error("Invalid Login Type");
};