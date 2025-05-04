"use client";

import { useEffect, useState, useRef } from "react";

export default function HandheldsPage() {
  const [handhelds, setHandhelds] = useState([]);
  const [filters, setFilters] = useState({ os: [], brand: [], connectivity: [], resolution: [] });
  const [options, setOptions] = useState({ os: [], brand: [], connectivity: [], resolution: [] });
  const dropdownRefs = useRef({});

  useEffect(() => {
    fetch("https://opensheet.vercel.app/1irg60f9qsZOkhp0cwOU7Cy4rJQeyusEUzTNQzhoTYTU/Handhelds")
      .then((res) => res.json())
      .then((data) => {
        setHandhelds(data);
        setOptions({
          os: [...new Set(data.map((d) => d["OS"]).filter(Boolean))].sort(),
          brand: [...new Set(data.map((d) => d["Brand"]).filter(Boolean))].sort(),
          connectivity: [...new Set(data.map((d) => d["Connectivity"]).filter(Boolean))].sort(),
          resolution: [...new Set(data.map((d) => d["Resolution\n(Best resolutions for retro gaming)"]).filter(Boolean))].sort(),
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
      (filters.connectivity.length === 0 || filters.connectivity.includes(h["Connectivity"])) &&
      (filters.resolution.length === 0 || filters.resolution.includes(h["Resolution\n(Best resolutions for retro gaming)"]))
    );
  });

  return (
    <div className="p-10 space-y-10 bg-zinc-50 min-h-screen font-sans">
      <h1 className="text-4xl font-bold text-center text-purple-800 mb-6">🎮 Handhelds for GeForce NOW</h1>

      <div className="flex flex-wrap gap-6 justify-center">
        {Object.entries(options).map(([key, values]) => (
          <div key={key} className="relative">
            <button
              onClick={() => {
                const ref = dropdownRefs.current[key];
                if (ref) ref.classList.toggle("hidden");
              }}
              className="px-5 py-2 bg-white border border-gray-300 rounded-full shadow hover:bg-gray-100 text-sm font-medium"
            >
              Filter {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
            <div
              ref={(el) => (dropdownRefs.current[key] = el)}
              className="absolute z-10 mt-2 p-3 w-72 bg-white border border-gray-300 rounded-xl shadow-lg hidden max-h-64 overflow-y-auto"
            >
              {values.map((val) => (
                <label key={val} className="block text-sm space-x-2 cursor-pointer text-gray-800 hover:bg-gray-100 px-2 py-1 rounded">
                  <input
                    type="checkbox"
                    checked={filters[key].includes(val)}
                    onChange={() => toggleFilter(key, val)}
                    className="accent-purple-600"
                  />
                  <span>{val}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl shadow-xl border border-gray-300 bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-purple-100 text-purple-900">
            <tr>
              <th className="p-4 border-b font-semibold">Image</th>
              <th className="p-4 border-b font-semibold">Name</th>
              <th className="p-4 border-b font-semibold">Brand</th>
              <th className="p-4 border-b font-semibold">OS</th>
              <th className="p-4 border-b font-semibold">Released</th>
              <th className="p-4 border-b font-semibold">Performance</th>
              <th className="p-4 border-b font-semibold">Screen</th>
              <th className="p-4 border-b font-semibold">Connectivity</th>
              <th className="p-4 border-b font-semibold">Battery</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map((h, i) => (
              <tr key={i} className="hover:bg-purple-50">
                <td className="p-4">
                  {(h["Image"] || h["Donations welcome"])?.startsWith("http") && (
                    <img
                      src={h["Image"] || h["Donations welcome"]}
                      alt="Device"
                      className="w-20 h-auto rounded border border-gray-200"
                    />
                  )}
                </td>
                <td className="p-4 font-medium text-gray-900">{h["Handheld (Hover for latest updates)"]}</td>
                <td className="p-4 text-gray-700">{h["Brand"]}</td>
                <td className="p-4 text-gray-700">{h["OS"]}</td>
                <td className="p-4 text-gray-700">{h["Released"]}</td>
                <td className="p-4 text-gray-700">{h["Performance Rating\n(Hover for legend)"]}</td>
                <td className="p-4 text-gray-700">{h["Screen Type"]} — {h["Resolution\n(Best resolutions for retro gaming)"]}</td>
                <td className="p-4 text-gray-700">{h["Connectivity"]}</td>
                <td className="p-4 text-gray-700">{h["Battery"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
