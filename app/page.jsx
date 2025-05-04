"use client";

import { useEffect, useState } from "react";

export default function HandheldsPage() {
  const [handhelds, setHandhelds] = useState([]);
  const [filters, setFilters] = useState({ os: "", brand: "", connectivity: "" });
  const [options, setOptions] = useState({ os: [], brand: [], connectivity: [] });

  useEffect(() => {
    fetch("https://opensheet.vercel.app/1irg60f9qsZOkhp0cwOU7Cy4rJQeyusEUzTNQzhoTYTU/Handhelds")
      .then((res) => res.json())
      .then((data) => {
        setHandhelds(data);
        setOptions({
          os: [...new Set(data.map((d) => d["OS"]).filter(Boolean))],
          brand: [...new Set(data.map((d) => d["Brand"]).filter(Boolean))],
          connectivity: [...new Set(data.map((d) => d["Connectivity"]).filter(Boolean))],
        });
      });
  }, []);

  const filtered = handhelds.filter((h) => {
    return (
      (!filters.os || h["OS"] === filters.os) &&
      (!filters.brand || h["Brand"] === filters.brand) &&
      (!filters.connectivity || h["Connectivity"] === filters.connectivity)
    );
  });

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <th className="border p-2">Released</th>
              <th className="border p-2">Performance</th>
              <th className="border p-2">Screen</th>
              <th className="border p-2">Connectivity</th>
              <th className="border p-2">Battery</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((h, i) => (
              <tr key={i} className="odd:bg-white even:bg-gray-50">
                <td className="border p-2">{h["Handheld (Hover for latest updates)"]}</td>
                <td className="border p-2">{h["Brand"]}</td>
                <td className="border p-2">{h["OS"]}</td>
                <td className="border p-2">{h["Released"]}</td>
                <td className="border p-2">{h["Performance Rating\n(Hover for legend)"]}</td>
                <td className="border p-2">{h["Screen Type"]} — {h["Resolution\n(Best resolutions for retro gaming)"]}</td>
                <td className="border p-2">{h["Connectivity"]}</td>
                <td className="border p-2">{h["Battery"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
