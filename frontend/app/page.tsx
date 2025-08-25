// frontend/app/page.tsx
"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [affiliate, setAffiliate] = useState("1");
  const [clicks, setClicks] = useState<any[]>([]);
  const [conversions, setConversions] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/clicks?affiliate_id=" + affiliate)
      .then((res) => setClicks(res.data));
    axios
      .get("http://localhost:4000/conversions?affiliate_id=" + affiliate)
      .then((res) => setConversions(res.data));
  }, [affiliate]);

  return (
    <div>
      <label>Select Affiliate: </label>
      <select
        value={affiliate}
        onChange={(e) => setAffiliate(e.target.value)}
        className="border p-1"
      >
        <option value="1">Affiliate A</option>
        <option value="2">Affiliate B</option>
      </select>

      <h2 className="text-xl mt-6 font-semibold">Clicks</h2>
      <table className="border w-full mt-2">
        <thead>
          <tr>
            <th>ID</th>
            <th>Click ID</th>
            <th>Campaign</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {clicks.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.click_id}</td>
              <td>{c.campaign_id}</td>
              <td>{c.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl mt-6 font-semibold">Conversions</h2>
      <table className="border w-full mt-2">
        <thead>
          <tr>
            <th>ID</th>
            <th>Click</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {conversions.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.click_id}</td>
              <td>{c.amount}</td>
              <td>{c.currency}</td>
              <td>{c.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
