const { Schema, model } = require("mongoose");
const JSCrypto = require("../utils/jscrypto");

const patientSchema = new Schema(
  {
    is_active: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    patientName: { type: String, require: true },
    email: {
      type: String,
      required: "email is required",
      match: [/^\w+([\.-]?\w)*@\w+([\.-]?\w)*(\.\w{2,3})+$/, "email not valid"],
    },
    password: {
      type: String,
      minlength: [8, "password is very small"],
      required: true,
    },
    result: {
      type: String,
    },
    sex: {
      type: String,
      enum: { values: ["F", "M", "Other"], message: "value not valid" },
      required: true,
    },
    patientAge: {
      type: Number,
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
    },
    test: {
      type: Schema.Types.ObjectId,
      ref: "Test",
    },
    date_of_bith: { type: Date },
  },
  { timestamps: true }
);

patientSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (!user.isModified("password")) return next();
    user.password = await JSCrypto.encrypt(user.password);
    return next();
  } catch (error) {
    next(error);
  }
});

const Patient = model("Patient", patientSchema, "Patients");
module.exports = Patient;
