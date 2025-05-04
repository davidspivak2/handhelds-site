"use client";

import { useEffect, useState, useRef } from "react";

export default function HandheldsPage() {
  const [handhelds, setHandhelds] = useState([]);
  const [filters, setFilters] = useState({ os: [], brand: [], connectivity: [] });
  const [options, setOptions] = useState({ os: [], brand: [], connectivity: [] });
  const dropdownRefs = useRef({});

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
    <div className="p-8 space-y-8 bg-gradient-to-br from-gray-100 to-white min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800">🎮 Handhelds for GeForce NOW</h1>

      <div className="flex flex-wrap gap-4 justify-center">
        {Object.entries(options).map(([key, values]) => (
          <div key={key} className="relative">
            <button
              onClick={() => {
                const ref = dropdownRefs.current[key];
                if (ref) ref.classList.toggle("hidden");
              }}
              className="px-5 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
            >
              Filter {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
            <div
              ref={(el) => (dropdownRefs.current[key] = el)}
              className="absolute z-10 mt-2 p-3 w-56 bg-white border border-gray-300 rounded-lg shadow-lg hidden max-h-64 overflow-y-auto"
            >
              {values.map((val) => (
                <label key={val} className="block text-sm space-x-2 cursor-pointer text-gray-700">
                  <input
                    type="checkbox"
                    checked={filters[key].includes(val)}
                    onChange={() => toggleFilter(key, val)}
                    className="accent-blue-500"
                  />
                  <span>{val}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto shadow-lg rounded-xl">
        <table className="min-w-full border-collapse bg-white text-sm">
          <thead className="bg-blue-50 text-gray-800">
            <tr>
              <th className="p-3 border-b text-left font-semibold">Image</th>
              <th className="p-3 border-b text-left font-semibold">Name</th>
              <th className="p-3 border-b text-left font-semibold">Brand</th>
              <th className="p-3 border-b text-left font-semibold">OS</th>
              <th className="p-3 border-b text-left font-semibold">Released</th>
              <th className="p-3 border-b text-left font-semibold">Performance</th>
              <th className="p-3 border-b text-left font-semibold">Screen</th>
              <th className="p-3 border-b text-left font-semibold">Connectivity</th>
              <th className="p-3 border-b text-left font-semibold">Battery</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((h, i) => (
              <tr key={i} className="hover:bg-blue-50 transition">
                <td className="p-3 border-b">
                  {h["Image"]?.startsWith("http") && (
                    <img src={h["Image"]} alt="Device" className="w-24 h-auto rounded shadow-md" />
                  )}
                </td>
                <td className="p-3 border-b font-medium text-gray-900">{h["Handheld (Hover for latest updates)"]}</td>
                <td className="p-3 border-b text-gray-700">{h["Brand"]}</td>
                <td className="p-3 border-b text-gray-700">{h["OS"]}</td>
                <td className="p-3 border-b text-gray-700">{h["Released"]}</td>
                <td className="p-3 border-b text-gray-700">{h["Performance Rating\n(Hover for legend)"]}</td>
                <td className="p-3 border-b text-gray-700">{h["Screen Type"]} — {h["Resolution\n(Best resolutions for retro gaming)"]}</td>
                <td className="p-3 border-b text-gray-700">{h["Connectivity"]}</td>
                <td className="p-3 border-b text-gray-700">{h["Battery"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
