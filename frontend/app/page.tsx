// frontend/app/page.tsx
"use client";
import { useEffect, useState } from "react";
import axios from "axios";

type ClickRow = {
  id: number;
  affiliate_id?: number;
  campaign_id: number;
  click_id: string;
  timestamp: string;
};

type ConversionRow = {
  id: number;
  click_id: number;
  amount: string | number;
  currency: string;
  timestamp: string;
};

export default function Dashboard() {
  const [affiliate, setAffiliate] = useState("1");
  const [clicks, setClicks] = useState<ClickRow[]>([]);
  const [conversions, setConversions] = useState<ConversionRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get<ClickRow[]>(
        "http://localhost:4000/clicks?affiliate_id=" + affiliate
      ),
      axios.get<ConversionRow[]>(
        "http://localhost:4000/conversions?affiliate_id=" + affiliate
      ),
    ])
      .then(([cRes, convRes]) => {
        setClicks(cRes.data);
        setConversions(convRes.data);
      })
      .finally(() => setLoading(false));
  }, [affiliate]);

  const stats = [
    { label: "Total Clicks", value: clicks.length },
    { label: "Total Conversions", value: conversions.length },
    {
      label: "Conv. Rate",
      value: clicks.length
        ? ((conversions.length / clicks.length) * 100).toFixed(1) + "%"
        : "0%",
    },
    {
      label: "Revenue",
      value: conversions
        .reduce((a, c) => a + Number(c.amount || 0), 0)
        .toFixed(2),
    },
  ];

  return (
    <div className="space-y-6">
      <section className="flex flex-col sm:flex-row sm:items-center gap-3">
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
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-sm p-4"
          >
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              {s.label}
            </div>
            <div className="mt-1 text-2xl font-semibold">{s.value}</div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
            <h2 className="text-lg font-semibold">Clicks</h2>
          </div>
          <div className="p-4">
            {loading ? (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Loading clicks…
              </div>
            ) : clicks.length === 0 ? (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                No clicks yet for this affiliate.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-600 dark:text-gray-300">
                      <th className="py-2 pr-4">ID</th>
                      <th className="py-2 pr-4">Click ID</th>
                      <th className="py-2 pr-4">Campaign</th>
                      <th className="py-2 pr-4">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clicks.map((c) => (
                      <tr
                        key={c.id}
                        className="border-t border-neutral-200 dark:border-neutral-800"
                      >
                        <td className="py-2 pr-4">{c.id}</td>
                        <td className="py-2 pr-4 font-mono">{c.click_id}</td>
                        <td className="py-2 pr-4">{c.campaign_id}</td>
                        <td className="py-2 pr-4">{c.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
            <h2 className="text-lg font-semibold">Conversions</h2>
          </div>
          <div className="p-4">
            {loading ? (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Loading conversions…
              </div>
            ) : conversions.length === 0 ? (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                No conversions yet for this affiliate.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-600 dark:text-gray-300">
                      <th className="py-2 pr-4">ID</th>
                      <th className="py-2 pr-4">Click</th>
                      <th className="py-2 pr-4">Amount</th>
                      <th className="py-2 pr-4">Currency</th>
                      <th className="py-2 pr-4">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {conversions.map((c) => (
                      <tr
                        key={c.id}
                        className="border-t border-neutral-200 dark:border-neutral-800"
                      >
                        <td className="py-2 pr-4">{c.id}</td>
                        <td className="py-2 pr-4">{c.click_id}</td>
                        <td className="py-2 pr-4">
                          {Number(c.amount).toFixed(2)}
                        </td>
                        <td className="py-2 pr-4">{c.currency}</td>
                        <td className="py-2 pr-4">{c.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
