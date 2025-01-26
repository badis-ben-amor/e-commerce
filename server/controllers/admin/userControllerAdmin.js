const User = require("../../models/User");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users || users.length === 0)
      return res.status(404).json("Users not found");

    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Error feching users",
      ...(process.env !== "production" && { error: error.message }),
    });
  }
};

const getUserById = async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ message: "User ID missing" });
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error feching user",
      ...(process.env !== "production" && { error: error.message }),
    });
  }
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ message: "Name, email, and password require to create user" });
  try {
    const exisitingUser = await User.findOne({ email });
    if (exisitingUser)
      return res.status(400).json({ message: "User already exist" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return res
      .status(200)
      .json({ message: "User created successfully", newUser });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      ...(process.env !== "production" && { error: error.message }),
    });
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, email, isAdmin, password } = req.body;
  if (!userId)
    return res.status(400).json({ message: "User id require to update user" });
  try {
    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (isAdmin) updates.isAdmin = isAdmin;
    if (password) updates.password = password;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true }
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    return res
      .status(200)
      .json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      ...(process.env !== "production" && { error: error.message }),
    });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status({ message: "User ID missing" });
  try {
    const user = await User.findByIdAndUpdate(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      ...(process.env !== "production" && { error: error.message }),
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
