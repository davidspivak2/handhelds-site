"use client";

import { useEffect, useState } from "react";

export default function HandheldsPage() {
  const [handhelds, setHandhelds] = useState([]);
  const [filters, setFilters] = useState({ os: [], brand: [], connectivity: [] });
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

  const toggleFilter = (key, value) => {
    setFilters((prev) => {
      const current = new Set(prev[key]);
      if (current.has(value)) current.delete(value);
      else current.add(value);
      return { ...prev, [key]: Array.from(current) };
    });
  };

  const filtered = handhelds.filter((h) => {
    return (
      (filters.os.length === 0 || filters.os.includes(h["OS"])) &&
      (filters.brand.length === 0 || filters.brand.includes(h["Brand"])) &&
      (filters.connectivity.length === 0 || filters.connectivity.includes(h["Connectivity"]))
    );
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Handhelds for GeForce NOW</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(options).map(([key, values]) => (
          <div key={key} className="bg-white shadow rounded-xl p-4 border">
            <h2 className="font-semibold mb-2 capitalize">{key}</h2>
            <div className="space-y-1">
              {values.map((val) => (
                <label key={val} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters[key].includes(val)}
                    onChange={() => toggleFilter(key, val)}
                  />
                  <span>{val}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">Image</th>
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
                <td className="border p-2">
                  {h["Donations welcome"]?.startsWith("http") && (
                    <img src={h["Donations welcome"]} alt="Device" className="w-24 rounded" />
                  )}
                </td>
                <td className="border p-2 font-medium">{h["Handheld (Hover for latest updates)"]}</td>
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
