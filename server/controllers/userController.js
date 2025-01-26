const User = require("../models/User");

const getUserProfile = async (req, res) => {
  const { userId } = req.user;
  if (!userId) return res.status(400).json({ message: "User ID require" });
  try {
    const user = await User.findById(userId).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error feching profile",
      ...(process.env !== "production" && { error: error.message }),
    });
  }
};

const updateUserProfile = async (req, res) => {
  const { userId } = req.user;
  const { name, email, password } = req.body;
  try {
    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
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
      .json({ message: "User update successfully", updatedUser });
  } catch (error) {
    res.status(500).json({
      message: "Error update user",
      ...(process.env !== "production" && { error: error.message }),
    });
  }
};

const deleteUserProfile = async (req, res) => {
  const { userId } = req.user;
  if (!userId)
    return res.status(400).json({ message: "User ID need to delete profile" });
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) res.status(404).json({ message: "User not found" });

    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({
      message: "Error delete user profile",
      ...(process.env !== "production" && { error: error.message }),
    });
  }
};

module.exports = { getUserProfile, updateUserProfile, deleteUserProfile };
