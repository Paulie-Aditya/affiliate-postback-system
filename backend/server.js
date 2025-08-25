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

app.get("/clicks", async (req, res) => {
    const { affiliate_id } = req.query;
    const rows = await pool.query("SELECT * FROM clicks WHERE affiliate_id=$1", [affiliate_id]);
    res.json(rows.rows);
  });
  
  app.get("/conversions", async (req, res) => {
    const { affiliate_id } = req.query;
    const rows = await pool.query(
      "SELECT conversions.* FROM conversions JOIN clicks ON conversions.click_id = clicks.id WHERE clicks.affiliate_id=$1",
      [affiliate_id]
    );
    res.json(rows.rows);
  });
  

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
