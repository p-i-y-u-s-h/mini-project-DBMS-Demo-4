const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
    {
      userId: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
        max: 500,
      },
      img: {
        type: String,
      },
      likes: {
        type: Array,
        default: [],
      },
    },
    { timestamps: true }
  );

const postModel = mongoose.model("post",PostSchema);

module.exports = {
    postModel
}