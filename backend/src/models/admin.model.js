const { Schema, model } = require("mongoose");

const adminSchema = new Schema(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    courseCreated: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    role: {
      type: String,
      default: 'admin'
  }
  }, {timestamps: true})

const adminModel = model("Admin", adminSchema);
module.exports = adminModel;
