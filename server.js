const express = require("express");
const app = express();
const db = require("./models");
const postRouter = require("./routes/Posts");
const commentsRouter = require("./routes/Comments");
const usersRouter = require("./routes/Users");
const likesRouter = require("./routes/Likes");

const cors = require("cors");

/*
  CORS Policy by default * (bisa diakses dari mana saja)
  Cors options: origin, method, dll
*/
let corsOptions = {
  origin: ["http://localhost:3000", "https://inixindo.id"], // hanya bisa diakses dari origin
  methods: "*", // bisa menjalankan seluruh method HTTP
  optionsSuccessStatus: 200, // hanya menerima code 200 (optional)
};

app.use(cors(corsOptions)); // menghindari CORS Policy
app.use(express.json());
app.use("/posts", postRouter);
app.use("/comments", commentsRouter);
app.use("/auth", usersRouter);
app.use("/likes", likesRouter);

db.sequelize.sync().then(() => {
  app.listen(8001, () => {
    console.log("Server running at http://localhost:8001");
  });
});
