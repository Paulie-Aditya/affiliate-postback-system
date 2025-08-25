// backend/server.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const pool = require("./db");

require("dotenv").config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "API running" }));

const clickRoute = require("./routes/click");
app.use("/click", clickRoute);

const postbackRoute = require("./routes/postback");
app.use("/postback", postbackRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
