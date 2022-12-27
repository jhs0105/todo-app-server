const mongoose = require("mongoose");
const db = mongoose
  .connect(`mongodb+srv://jj:${process.env.MONGO_PASSWORD}@cluster0.ic8xpds.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Todo-app",
  })
  .then(() => {
    console.log("db연결");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = db;
