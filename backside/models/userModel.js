const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      maxlength: 25,
    },

    fullname: {
      type: String,
      trim: true,
      maxlength: 25,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: "",
    },
    gender:{
      type:String,
      default: 'male'
    },
    website: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    avatar:{
      type: String,
      default: "",
    },
    story:{
      type:String,
      default:'',
      maxlength:200,
    },
    friends: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    following: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("user", userModel);
