const User = require("../models/user.model");
const Utility = require("../utility");

const AuthController = {
  Register: async (req, res) => {
    try {
      const {
        first_name,
        last_name,
        bank_name,
        account_holder_name,
        account_number,
        phone_number,
        password,
      } = req.body;
      const userAlreadyExist = await User.findOne({ phone_number });
      if (userAlreadyExist)
        return res.json({
          message: "User already exist by this phone number " + phone_number,
          messageType: "error",
        });
      const newUser = await User.create({
        first_name,
        last_name,
        bank_name,
        account_holder_name,
        account_number,
        phone_number,
        password,
        token: Utility.generateString(30),
      });
      if (!newUser) {
        return res.json({
          message: "Something went wrong",
          messageType: "error",
        });
      }
      return res.json({
        data: {
          user: newUser,
        },
      });
    } catch (err) {
      console.log(err);
      return res.json({
        message: "Something went wrong",
        messageType: "error",
      });
    }
  },
  Login: async (req, res) => {
    try {
      const { phone_number, password } = req.body;
      const user = await User.findOne({ phone_number, password });
      console.log(user);
      if (user == null)
        return res.json({ message: "Wrong credentials", messageType: "error" });
      return res.json({
        data: {
          user,
        },
      });
    } catch (err) {
      console.log(err);
      return res.json({
        message: "Something went wrong",
        messageType: "error",
      });
    }
  },
  ChangePassword: async (req, res) => {
    try {
      const { phone_number, password } = req.body;
      await User.findOneAndUpdate({ phone_number }, { password });
      return res.json({
        message: "Password updated successfully",
        messageType: "success",
      });
    } catch (err) {
      console.log(err);
      return res.json({
        message: "Something went wrong",
        messageType: "error",
      });
    }
  },
  EditProfile: async (req, res) => {
    try {
      const {
        id,
        first_name,
        last_name,
        bank_name,
        account_holder_name,
        account_number,
        phone_number,
      } = req.body;
      await User.findOneAndUpdate(
        { _id: id },
        {
          first_name,
          last_name,
          bank_name,
          account_holder_name,
          account_number,
          phone_number,
        }
      );
      return res.json({
        message: "Profile updated successfully",
        messageType: "success",
      });
    } catch (err) {
      console.log(err);
      return res.json({
        message: "Something went wrong",
        messageType: "error",
      });
    }
  },
};

module.exports = AuthController;
