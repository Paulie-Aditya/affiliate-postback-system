// backend/routes/postback.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  const { affiliate_id, click_id, amount, currency } = req.query;
  if (!affiliate_id || !click_id || !amount || !currency) {
    return res.status(400).json({ error: "Missing params" });
  }

  try {
    const click = await pool.query(
      `SELECT id FROM clicks WHERE affiliate_id=$1 AND click_id=$2`,
      [affiliate_id, click_id]
    );

    if (click.rows.length === 0) {
      return res.status(404).json({ error: "Click not found" });
    }

    const clickRow = click.rows[0];
    await pool.query(
      `INSERT INTO conversions (click_id, amount, currency) 
       VALUES ($1,$2,$3)`,
      [clickRow.id, amount, currency]
    );

    res.json({ success: true, message: "Conversion recorded" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

module.exports = router;
