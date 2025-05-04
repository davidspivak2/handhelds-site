// build trigger

"use client";
import { useEffect, useState } from "react";

export default function HandheldsPage() {
  const [handhelds, setHandhelds] = useState([]);
  const [filters, setFilters] = useState({ wifi: "", os: "", screen: "", mobility: "" });
  const [options, setOptions] = useState({ wifi: [], os: [], screen: [], mobility: [] });

  useEffect(() => {
    fetch("https://opensheet.vercel.app/1irg60f9qsZOkhp0cwOU7Cy4rJQeyusEUzTNQzhoTYTU/Handhelds")
      .then((res) => res.json())
      .then((data) => {
        setHandhelds(data);
        setOptions({
          wifi: [...new Set(data.map((d) => d.wifi).filter(Boolean))],
          os: [...new Set(data.map((d) => d.os).filter(Boolean))],
          screen: [...new Set(data.map((d) => d.screen).filter(Boolean))],
          mobility: [...new Set(data.map((d) => d.mobility).filter(Boolean))],
        });
      });
  }, []);

  const filtered = handhelds.filter((h) => {
    return (
      (!filters.wifi || h.wifi === filters.wifi) &&
      (!filters.os || h.os === filters.os) &&
      (!filters.screen || h.screen === filters.screen) &&
      (!filters.mobility || h.mobility === filters.mobility)
    );
  });

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(options).map(([key, values]) => (
          <select
            key={key}
            value={filters[key]}
            onChange={(e) => setFilters((prev) => ({ ...prev, [key]: e.target.value }))}
            className="border p-2"
          >
            <option value="">All {key}</option>
            {values.map((val) => (
              <option key={val} value={val}>{val}</option>
            ))}
          </select>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Brand</th>
              <th className="border p-2">OS</th>
              <th className="border p-2">Wi-Fi</th>
              <th className="border p-2">Release</th>
              <th className="border p-2">Performance</th>
              <th className="border p-2">Emulation</th>
              <th className="border p-2">Screen</th>
              <th className="border p-2">Mobility</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((h, i) => (
              <tr key={i} className="odd:bg-white even:bg-gray-50">
                <td className="border p-2">{h.name}</td>
                <td className="border p-2">{h.brand}</td>
                <td className="border p-2">{h.os}</td>
                <td className="border p-2">{h.wifi}</td>
                <td className="border p-2">{h.release}</td>
                <td className="border p-2">{h.performance}</td>
                <td className="border p-2">{h.emulation}</td>
                <td className="border p-2">{h.screen}</td>
                <td className="border p-2">{h.mobility}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
