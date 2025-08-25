"use client";
import { useState } from "react";

export default function PostbackPage() {
  const [affiliate, setAffiliate] = useState("1");
  const [copied, setCopied] = useState(false);
  const url = `http://localhost:4000/postback?affiliate_id=${affiliate}&click_id={CLICK_ID}&amount={AMOUNT}&currency={CURRENCY}`;

  function handleCopy() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-sm p-4">
        <h2 className="text-lg font-semibold mb-2">Postback URL</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Use this URL format to notify conversions via S2S postback. Replace
          placeholders with actual values.
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Affiliate</label>
            <select
              value={affiliate}
              onChange={(e) => setAffiliate(e.target.value)}
              className="border border-neutral-200 dark:border-neutral-800 rounded-md px-3 py-2 bg-white dark:bg-neutral-900 text-sm"
            >
              <option value="1">Affiliate A</option>
              <option value="2">Affiliate B</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <code className="flex-1 bg-gray-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-md px-3 py-2 text-sm break-all">
            {url}
          </code>
          <button
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
            onClick={handleCopy}
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-sm p-4">
        <h3 className="font-semibold mb-2">Placeholders</h3>
        <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-1">
          <li>
            <span className="font-mono">{`{CLICK_ID}`}</span> — The unique click
            identifier from the click request.
          </li>
          <li>
            <span className="font-mono">{`{AMOUNT}`}</span> — Conversion value
            (e.g., 100.00).
          </li>
          <li>
            <span className="font-mono">{`{CURRENCY}`}</span> — 3-letter
            currency code (e.g., USD, EUR).
          </li>
        </ul>
      </div>
    </div>
  );
}
