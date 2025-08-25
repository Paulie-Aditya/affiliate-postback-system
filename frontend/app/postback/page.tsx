"use client";
import { useState } from "react";

export default function PostbackPage() {
  const [affiliate, setAffiliate] = useState("1");
  const url = `http://localhost:4000/postback?affiliate_id=${affiliate}&click_id={CLICK_ID}&amount={AMOUNT}&currency={CURRENCY}`;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Postback URL</h2>
      <select
        value={affiliate}
        onChange={(e) => setAffiliate(e.target.value)}
        className="border p-1 mb-4"
      >
        <option value="1">Affiliate A</option>
        <option value="2">Affiliate B</option>
      </select>
      <div className="bg-white border p-4 rounded shadow">
        <code>{url}</code>
        <button
          className="ml-4 px-2 py-1 bg-blue-500 text-white rounded"
          onClick={() => navigator.clipboard.writeText(url)}
        >
          Copy
        </button>
      </div>
    </div>
  );
}
