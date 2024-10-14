const { Schema, model } = require("mongoose");

const purshaseSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const purchaseModel = model("Purchase", purshaseSchema);

module.exports = purchaseModel;
