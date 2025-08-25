
const pool = require("./db");

(async () => {
  const res = await pool.query("SELECT NOW()");
  console.log(res.rows);
  process.exit();
})();
