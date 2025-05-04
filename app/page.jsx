// build trigger

"use client";
import { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";

export default function HandheldsPage() {
  const [handhelds, setHandhelds] = useState([]);
  const [wifi, setWifi] = useState("");
  const [os, setOs] = useState("");
  const [screen, setScreen] = useState("");
  const [mobility, setMobility] = useState("");

  useEffect(() => {
    fetch("https://opensheet.vercel.app/1irg60f9qsZOkhp0cwOU7Cy4rJQeyusEUzTNQzhoTYTU/Handhelds")
      .then((res) => res.json())
      .then((data) => setHandhelds(data));
  }, []);

  const filtered = handhelds.filter((h) => {
    return (
      (wifi === "" || h.wifi?.toLowerCase().includes(wifi.toLowerCase())) &&
      (os === "" || h.os?.toLowerCase().includes(os.toLowerCase())) &&
      (screen === "" || h.screen?.toLowerCase().includes(screen.toLowerCase())) &&
      (mobility === "" || h.mobility?.toLowerCase().includes(mobility.toLowerCase()))
    );
  });

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input placeholder="Wi-Fi (e.g. 'Wi-Fi 6')" value={wifi} onChange={(e) => setWifi(e.target.value)} />
        <Input placeholder="OS (e.g. 'Android')" value={os} onChange={(e) => setOs(e.target.value)} />
        <Input placeholder="Screen (e.g. 'AMOLED')" value={screen} onChange={(e) => setScreen(e.target.value)} />
        <Input placeholder="Mobility (e.g. 'High')" value={mobility} onChange={(e) => setMobility(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((h, i) => (
          <Card key={i}>
            <CardContent className="p-4 space-y-1">
              <h2 className="text-xl font-bold">{h.name}</h2>
              <p><strong>Brand:</strong> {h.brand}</p>
              <p><strong>OS:</strong> {h.os}</p>
              <p><strong>Wi-Fi:</strong> {h.wifi}</p>
              <p><strong>Release:</strong> {h.release}</p>
              <p><strong>Performance:</strong> {h.performance}</p>
              <p><strong>Emulation:</strong> {h.emulation}</p>
              <p><strong>Screen:</strong> {h.screen}</p>
              <p><strong>Mobility:</strong> {h.mobility}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
