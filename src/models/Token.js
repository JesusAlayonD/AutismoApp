const { Schema, model } = require("mongoose");

const tokenSchema = new Schema(
  {
    is_active: {
      type: Boolean,
      default: true,
    },
    refresh: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    create: { type: Date },
    expiration: { type: Date },
  },
  { timestamps: true }
);

const Token = model("Token", tokenSchema, "Tokens");
module.exports = Token;
