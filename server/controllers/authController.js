const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateAccessToken = (user) => {
  return jwt.sign(
    { userId: user.id, isAdmin: user.isAdmin },
    process.env.ACCESS_SERCRET_KEY,
    { expiresIn: "58s" }
  );
};
const generateRefreshToken = (user) => {
  return jwt.sign(
    { userId: user.id, isAdmin: user.isAdmin },
    process.env.REFRESH_SECRET_KEY,
    { expiresIn: "87d" }
  );
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ message: "Name, email and password require to register" });
  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exist" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      message: "User register successfully",
      accessToken,
    });
  } catch (error) {
    res.status(500).json({
      message: "Network error",
      ...(process.env.NODE_ENV !== "production" && { error: error.message }),
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and passwor require to login" });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User Not Found" });

    const comparedPassword = await bcrypt.compare(password, user.password);
    if (!comparedPassword)
      return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      htppOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Login successfully",
      accessToken,
    });
  } catch (error) {
    res.status(500).json({
      message: "Network error",
      ...(process.env.NODE_ENV !== "production" && { error: error.message }),
    });
  }
};

const refresh = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token missing" });
  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
    const user = await User.findById(payload.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newAccessToken = generateAccessToken(user);

    res.status(200).json({ newAccessToken });
  } catch (error) {
    res.status(500).json({
      message: "Invalid or expired refresh token",
      ...(process.env.NODE_ENV !== "production" && { error: error.message }),
    });
  }
};

const logout = async (req, res) => {
  res.clearCookie("refreshToken", {
    htppOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  try {
    res.status(200).json({ message: "Logout out successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Logout error",
      ...(process.env.NODE_ENV !== "production" && { error: error.message }),
    });
  }
};

module.exports = { registerUser, loginUser, refresh, logout };
