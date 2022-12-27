const mongoose = require("mongoose");
const TodoSchema = mongoose.Schema({
  done: Boolean,
  title: {
    type: String,
    require: true,
  },
});

const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;
