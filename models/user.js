const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userShema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiUserShema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.email().required(),
  subscription: Joi.valid("starter", "pro", "business").default("starter"),
  token: Joi.string().default(null),
});

const User = model("user", userShema);

module.exports = {
  User,
  joiUserShema,
};
