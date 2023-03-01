require("dotenv").config();
const express = require("express");
// const cors = require(`cors`);
const app = express();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST;
const MONGO_URL = process.env.MONGO_URL;

const auth = require("./controllers/auth");
const carController = require("./controllers/routes");
// app.use(cors());
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use("/user", auth);
app.use("/car", carController);

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log(`Connected to ${MONGO_URL}`))
  .catch((err) => console.log(err));

app.listen(PORT, HOST, () => {
  console.log(`[server] running on ${HOST}:${PORT}`);
});
