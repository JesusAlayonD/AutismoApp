const { Schema, model } = require("mongoose");
const JSCrypto = require("../utils/jscrypto");

const testSchema = new Schema(
  {
    is_active: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      default: 0,
    },
    currentQuestion: {
      type: Number,
    },
    finished: {
      type: Boolean,
      default: false,
    },
    result: {
      type: String,
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
    },
    answers: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Test = model("Test", testSchema, "Tests");
module.exports = Test;
