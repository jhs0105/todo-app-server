const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();
const db = require("./db/db");
const cors = require("cors");
const TodoSchema = require("./models/TodoSchema");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("port", process.env.PORT || 5000);
const PORT = app.get("port");

app.get("/", (req, res) => {
  res.send("todo-app");
});

app.get("/todo/list", async (req, res) => {
  const TodoList = await TodoSchema.find();
  res.json(TodoList);
});

app.post("/todo/insert", async (req, res) => {
  console.log(req.body);
  const insertTodo = new TodoSchema({
    ...req.body,
  });
  await insertTodo.save();
  res.json({ state: "ok" });
});

app.delete("/todo/delete/:id", (req, res) => {
  //console.log(req.params.id);
  TodoSchema.deleteOne({ _id: req.params.id }).then((response) => {
    res.json(response);
  });
});

app.put("/todo/modify/:id", async (req, res) => {
  const { id } = req.params;
  const { done } = req.body;
  await TodoSchema.updateOne({ _id: id }, { $set: { done: done } });
  res.json({ state: "ok" });
});

app.put("/todo/change/:id", (req, res) => {
  console.log(req.body.title);
  TodoSchema.updateOne({ _id: req.params.id }, { $set: { title: req.body.title } }).then((response) => {
    res.json(response);
  });
});
app.listen(PORT, () => {
  console.log(`${PORT}에서 서버 대기중`);
});
