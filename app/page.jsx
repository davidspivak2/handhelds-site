"use client";

import { useEffect, useState } from "react";
import "./style.css";

export default function HandheldsPage() {
  const [handhelds, setHandhelds] = useState([]);
  const [filters, setFilters] = useState({ os: [], brand: [], connectivity: [], resolution: [], battery: [], screenType: [] });
  const [options, setOptions] = useState({ os: [], brand: [], connectivity: [], resolution: [], battery: [], screenType: [] });
  const [visibleDropdown, setVisibleDropdown] = useState(null);
  const [firstImage, setFirstImage] = useState(null);
  const [firstRow, setFirstRow] = useState(null);

  useEffect(() => {
    fetch("https://opensheet.vercel.app/1irg60f9qsZOkhp0cwOU7Cy4rJQeyusEUzTNQzhoTYTU/Handhelds")
      .then((res) => res.json())
      .then((data) => {
        setHandhelds(data);
        setFirstImage(data[0]?.["Donations welcome"]);
        setFirstRow(data[0]);
        setOptions({
          os: [...new Set(data.map((d) => d["OS"]).filter(Boolean))].sort(),
          brand: [...new Set(data.map((d) => d["Brand"]).filter(Boolean))].sort(),
          connectivity: [...new Set(data.map((d) => d["Connectivity"]).filter(Boolean))].sort(),
          resolution: [...new Set(data.map((d) => d["Resolution\n(Best resolutions for retro gaming)"]).filter(Boolean))].sort((a, b) => parseInt(a) - parseInt(b)),
          battery: [...new Set(data.map((d) => d["Battery"]).filter(Boolean))].sort((a, b) => parseInt(b) - parseInt(a)),
          screenType: [...new Set(data.map((d) => d["Screen Type"]).filter(Boolean))].sort()
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

  const toggleDropdown = (key) => {
    setVisibleDropdown(visibleDropdown === key ? null : key);
  };

  const quickSelectWifi6 = () => {
    setFilters((prev) => {
      const allWifi6 = options.connectivity.filter((val) => val.toLowerCase().includes("wifi 6"));
      return { ...prev, connectivity: allWifi6 };
    });
  };

  const quickSelectWifi7 = () => {
    setFilters((prev) => {
      const allWifi7 = options.connectivity.filter((val) => val.toLowerCase().includes("wifi 7"));
      return { ...prev, connectivity: allWifi7 };
    });
  };

  const quickSelect1080p = () => {
    setFilters((prev) => {
      return { ...prev, resolution: ["1920 x 1080"] };
    });
  };

  const quickSelectOLED = () => {
    setFilters((prev) => {
      const allOLED = handhelds.map((d) => d["Screen Type"]).filter((type) => type?.toLowerCase().includes("oled"));
      return { ...prev, screenType: [...new Set(allOLED)] };
    });
  };

  const filtered = handhelds.filter((h) => {
    return (
      (filters.os.length === 0 || filters.os.includes(h["OS"])) &&
      (filters.brand.length === 0 || filters.brand.includes(h["Brand"])) &&
      (filters.connectivity.length === 0 || filters.connectivity.includes(h["Connectivity"])) &&
      (filters.resolution.length === 0 || filters.resolution.includes(h["Resolution\n(Best resolutions for retro gaming)"])) &&
      (filters.battery.length === 0 || filters.battery.includes(h["Battery"])) &&
      (filters.screenType.length === 0 || filters.screenType.includes(h["Screen Type"]))
    );
  });

  return (
    <div className="wrapper">
      <h1 className="title">🎮 Handhelds for GeForce NOW</h1>

      <div className="quick-filter">
        <button className="dropdown-button" onClick={quickSelectWifi6}>
          💨 Quick Filter: WiFi 6
        </button>
        <button className="dropdown-button" onClick={quickSelectWifi7}>
          ⚡ Quick Filter: WiFi 7
        </button>
        <button className="dropdown-button" onClick={quickSelect1080p}>
          📺 Quick Filter: 1920 x 1080
        </button>
        <button className="dropdown-button" onClick={quickSelectOLED}>
          🖥️ Quick Filter: OLED
        </button>
      </div>

      <div className="filters">
        {Object.entries(options).map(([key, values]) => (
          <div key={key} className="dropdown-wrapper">
            <button onClick={() => toggleDropdown(key)} className="dropdown-button">
              Filter {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
            <div className={`dropdown ${visibleDropdown === key ? "" : "hidden"}`}>
              {values.map((val) => (
                <label key={val} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={filters[key]?.includes(val)}
                    onChange={() => toggleFilter(key, val)}
                  />
                  <span>{val}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Brand</th>
              <th>OS</th>
              <th>Released</th>
              <th>Performance</th>
              <th>Screen</th>
              <th>Connectivity</th>
              <th>Battery</th>
              <th>Screen Size</th>
              <th>Aspect Ratio</th>
              <th>Weight</th>
              <th>Dimensions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((h, i) => (
              <tr key={i}>
                <td>
                  <div dangerouslySetInnerHTML={{ __html: h["Donations welcome"] }} />
                </td>
                <td>{h["Handheld\n(Hover for latest updates)"]}</td>
                <td>{h["Brand"]}</td>
                <td>{h["OS"]}</td>
                <td>{h["Released"]}</td>
                <td>{h["Performance Rating\n(Hover for legend)"]}</td>
                <td>{h["Screen Type"]} — {h["Resolution\n(Best resolutions for retro gaming)"]}</td>
                <td>{h["Connectivity"]}</td>
                <td>{h["Battery"]}</td>
                <td>{h["Screen Size"]}</td>
                <td>{h["Aspect Ratio"]}</td>
                <td>{h["Weight"]}</td>
                <td>{h["Dimensions\n(Compare Sizes , RetroSizer , Retro Catalog)"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginTop: '2rem' }}>🛠 First Row Debug:</h2>
      <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.8rem', maxWidth: '100%', overflowX: 'auto' }}>{JSON.stringify(firstRow, null, 2)}</pre>
    </div>
  );
}
