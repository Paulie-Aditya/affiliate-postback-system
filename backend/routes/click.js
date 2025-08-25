// backend/routes/click.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  const { affiliate_id, campaign_id, click_id } = req.query;
  if (!affiliate_id || !campaign_id || !click_id) {
    return res.status(400).json({ error: "Missing params" });
  }

  try {
    await pool.query(
      `INSERT INTO clicks (affiliate_id, campaign_id, click_id) 
       VALUES ($1,$2,$3)
       ON CONFLICT (affiliate_id, campaign_id, click_id) DO NOTHING`,
      [affiliate_id, campaign_id, click_id]
    );
    res.json({ success: true, message: "Click recorded" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

module.exports = router;
