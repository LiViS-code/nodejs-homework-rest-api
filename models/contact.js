const { Schema, model } = require("mongoose");
const Joi = require("joi");

const phoneRegExp = /^\(\d{3}\)\s\d{3}-\d{4}$/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
      match: phoneRegExp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiContactSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string()
    .pattern(phoneRegExp)
    .message("Enter the phone number in the format: (111) 222-3333")
    .required(),
  favorite: Joi.boolean().default(false),
});

const joiStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  contactSchema,
  joiContactSchema,
  joiStatusSchema,
  Contact,
};
