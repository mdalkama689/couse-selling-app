const { Schema, model } = require("mongoose");

const courseSchema = new Schema(
  {
    title: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    originalPrice: {
      type: Number,
    },
    discountInPercentage: {
      type: Number,
      default: 0,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
    description: {
      type: String,
    },
    syllabus: { type: String },
    image: {
      secure_url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
      },
    },
    videos: [
      {
        title: {
          type: String,
        },
     
        video: {
          public_id: {
            type: String,
          },
          secure_url: {
            type: String,
          },
        },
      },
    ],
  },

  { timestamps: true }
);

const courseModel = model("Course", courseSchema);

module.exports = courseModel;
