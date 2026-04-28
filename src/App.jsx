import React, { useEffect, useMemo, useState } from "react";
import { Car, Check, Clipboard, LogIn, LogOut, Plus, Search, Shield, Star, Trash2, Trophy } from "lucide-react";
import { supabase } from "./lib/supabase";

const tracks = [
  "Barcelona",
  "Brands Hatch",
  "Circuit of the Americas (COTA)",
  "Donington Park",
  "Hungaroring",
  "Imola",
  "Indianapolis",
  "Kyalami",
  "Laguna Seca",
  "Misano",
  "Monza",
  "Mount Panorama",
  "Nürburgring",
  "Nürburgring 24h",
  "Oulton Park",
  "Paul Ricard",
  "Red Bull Ring",
  "Silverstone",
  "Snetterton",
  "Spa-Francorchamps",
  "Suzuka",
  "Valencia",
  "Watkins Glen",
  "Zandvoort",
  "Zolder"
];

const cars = [
  "Alpine A110 GT4",
  "Aston Martin AMR V8 Vantage GT4",
  "Aston Martin V12 Vantage GT3",
  "Aston Martin V8 Vantage GT3",
  "Audi R8 LMS GT2",
  "Audi R8 LMS GT3",
  "Audi R8 LMS GT3 Evo",
  "Audi R8 LMS GT3 Evo II",
  "Audi R8 LMS GT4",
  "Bentley Continental GT3 2015",
  "Bentley Continental GT3 2018",
  "BMW M2 CS Racing",
  "BMW M4 GT3",
  "BMW M4 GT4",
  "BMW M6 GT3",
  "Chevrolet Camaro GT4.R",
  "Ferrari 296 GT3",
  "Ferrari 488 Challenge Evo",
  "Ferrari 488 GT3",
  "Ferrari 488 GT3 Evo",
  "Ford Mustang GT3",
  "Ginetta G55 GT4",
  "Honda NSX GT3",
  "Honda NSX GT3 Evo",
  "Jaguar Emil Frey G3",
  "KTM X-Bow GT2",
  "KTM X-Bow GT4",
  "Lamborghini Huracán GT3",
  "Lamborghini Huracán GT3 Evo",
  "Lamborghini Huracán GT3 EVO2",
  "Lamborghini Huracán Super Trofeo EVO2",
  "Lexus RC F GT3",
  "Maserati GT2",
  "Maserati GranTurismo MC GT4",
  "McLaren 570S GT4",
  "McLaren 650S GT3",
  "McLaren 720S GT3",
  "McLaren 720S GT3 Evo",
  "Mercedes-AMG GT2",
  "Mercedes-AMG GT3",
  "Mercedes-AMG GT3 Evo",
  "Mercedes-AMG GT4",
  "Nissan GT-R Nismo GT3 2015",
  "Nissan GT-R Nismo GT3 2018",
  "Porsche 718 Cayman GT4 Clubsport",
  "Porsche 911 GT2 RS Clubsport Evo",
  "Porsche 911 GT3 Cup (992)",
  "Porsche 911 GT3 R",
  "Porsche 911 II GT3 R",
  "Porsche 911 (992) GT3 R",
  "Porsche 935",
  "Reiter Engineering R-EX GT3"
];


const IconElectronics = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="5" y="5" width="14" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>
);

const IconDamper = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2v4M12 18v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <rect x="9" y="6" width="6" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M7 8h10M7 16h10M10 10h4M10 14h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconSpoiler = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 14h16l-2.2 4H6.2L4 14Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M7 14l1.5-5h7L17 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M5 9h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const setupTabs = [
  { id: "tyres", label: "Reifen", icon: "🛞" },
  { id: "electronics", label: "Elektronik", icon: <IconElectronics /> },
  { id: "mechanical", label: "Mechanischer Grip", icon: "⚙️" },
  { id: "dampers", label: "Stossdämpfer", icon: <IconDamper /> },
  { id: "aero", label: "Spoiler", icon: <IconSpoiler /> }
];

const starterSetups = [
  {
    id: "demo-1",
    title: "Safe Race Setup",
    track: "Silverstone",
    car: "BMW M4 GT3",
    driver: "NRT White",
    visibility: "public",
    weather: "Trocken",

    tyre_fl: "27.0",
    tyre_fr: "27.1",
    tyre_rl: "26.9",
    tyre_rr: "27.0",

    tc1: "4",
    tc2: "2",
    abs: "3",
    ecu_map: "1",

    toe_fl: "0.0",
    toe_fr: "0.0",
    toe_rl: "0.10",
    toe_rr: "0.10",
    camber_fl: "-3.8",
    camber_fr: "-3.8",
    camber_rl: "-3.2",
    camber_rr: "-3.2",
    caster_fl: "11.0",
    caster_fr: "11.0",
    arb_front: "5",
    arb_rear: "3",
    diff_preload: "90 Nm",

    bump_fl: "10",
    bump_fr: "10",
    bump_rl: "8",
    bump_rr: "8",
    fast_bump_fl: "6",
    fast_bump_fr: "6",
    fast_bump_rl: "5",
    fast_bump_rr: "5",
    rebound_fl: "14",
    rebound_fr: "14",
    rebound_rl: "12",
    rebound_rr: "12",
    fast_rebound_fl: "8",
    fast_rebound_fr: "8",
    fast_rebound_rl: "7",
    fast_rebound_rr: "7",

    ride_height_front: "58",
    ride_height_rear: "72",
    rear_wing: "7",
    diffuser: "2",
    brake_duct_front: "3",
    brake_duct_rear: "3",
    rating: 5,
    created_at: new Date().toISOString()
  }
];

const emptyForm = {
  title: "",
  track: "Silverstone",
  car: "BMW M4 GT3",
  driver: "",
  visibility: "public",
  weather: "Trocken",

  tyre_fl: "",
  tyre_fr: "",
  tyre_rl: "",
  tyre_rr: "",

  tc1: "",
  tc2: "",
  abs: "",
  ecu_map: "",

  toe_fl: "",
  toe_fr: "",
  toe_rl: "",
  toe_rr: "",
  camber_fl: "",
  camber_fr: "",
  camber_rl: "",
  camber_rr: "",
  caster_fl: "",
  caster_fr: "",
  arb_front: "",
  arb_rear: "",
  diff_preload: "",
  brake_bias: "",
  steering_ratio: "",
  steer_rate_fl: "",
  steer_rate_fr: "",
  steer_rate_rl: "",
  steer_rate_rr: "",
  damp_rate_fl: "",
  damp_rate_fr: "",
  damp_rate_rl: "",
  damp_rate_rr: "",
  travel_fl: "",
  travel_fr: "",
  travel_rl: "",
  travel_rr: "",

  bump_fl: "",
  bump_fr: "",
  bump_rl: "",
  bump_rr: "",
  fast_bump_fl: "",
  fast_bump_fr: "",
  fast_bump_rl: "",
  fast_bump_rr: "",
  rebound_fl: "",
  rebound_fr: "",
  rebound_rl: "",
  rebound_rr: "",
  fast_rebound_fl: "",
  fast_rebound_fr: "",
  fast_rebound_rl: "",
  fast_rebound_rr: "",

  ride_height_front: "",
  ride_height_rear: "",
  rear_wing: "",
  diffuser: "",
  brake_duct_front: "",
  brake_duct_rear: "",
  rating: 3
};

function loadLocal(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

function saveLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export default function App() {
  const [session, setSession] = useState(null);
  const [setups, setSetups] = useState([]);
  const [activeTab, setActiveTab] = useState("setups");
  const [setupTab, setSetupTab] = useState("tyres");
  const [authMode, setAuthMode] = useState("login");
  const [auth, setAuth] = useState({ email: "", password: "", driverName: "" });
  const [search, setSearch] = useState("");
  const [trackFilter, setTrackFilter] = useState("Alle Strecken");
  const [carFilter, setCarFilter] = useState("Alle Fahrzeuge");
  const [message, setMessage] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [compareAId, setCompareAId] = useState("");
  const [compareBId, setCompareBId] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
  const timer = setTimeout(() => {
    setShowSplash(false);
  }, 1800);

  return () => clearTimeout(timer);
}, []);

  useEffect(() => {

    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    loadSupabaseData();

    return () => listener.subscription.unsubscribe();
  }, []);

  async function loadSupabaseData() {
  const { data, error } = await supabase
    .from("setups")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    setMessage("Fehler beim Laden.");
    return;
  }

  setSetups(data || []);
}

  async function handleAuth() {
    setMessage("");

    if (authMode === "register") {
      const { error } = await supabase.auth.signUp({
        email: auth.email,
        password: auth.password,
        options: { data: { driver_name: auth.driverName } }
      });
      setMessage(error ? error.message : "Registriert. Bitte E-Mail bestätigen, falls Supabase das verlangt.");
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: auth.email,
        password: auth.password
      });
      if (error) setMessage(error.message);
      else {
        setSession(data.session);
        setMessage("Login erfolgreich.");
      }
    }
  }

  async function logout() {
  await supabase.auth.signOut();
  setSession(null);
}
useEffect(() => {
  loadSupabaseData()
}, [])
  async function addSetup() {
  if (!form.title.trim()) {
    setMessage("Bitte Setup Name eintragen.");
    return;
  }

  const { data, error } = await supabase
    .from("setups")
    .insert([{ ...form, rating: Number(form.rating) }])
    .select()
    .single();

  if (error) {
    console.error(error);
    setMessage("Fehler beim Speichern in Supabase.");
    return;
  }

setSetups([data, ...setups]);
setForm({ ...emptyForm, track: form.track, car: form.car, weather: form.weather });
setMessage("Setup gespeichert.");
}

async function removeSetup(id) {
  await supabase.from("setups").delete().eq("id", id);

  const next = setups.filter((s) => s.id !== id);
  setSetups(next);
}

  function buildSetupText(setup) {
    const lines = [
      `🏁 ${setup.title}`,
      `${setup.track} · ${setup.car}`,
      setup.driver ? `Fahrer: ${setup.driver}` : null,
      setup.weather ? `Wetter: ${setup.weather}` : null,
      "",
      "🛞 Reifen:",
      setup.tyre_fl ? `- VL: ${setup.tyre_fl}` : null,
      setup.tyre_fr ? `- VR: ${setup.tyre_fr}` : null,
      setup.tyre_rl ? `- HL: ${setup.tyre_rl}` : null,
      setup.tyre_rr ? `- HR: ${setup.tyre_rr}` : null,
      groupLine("Spur", setup.toe_fl, setup.toe_fr, setup.toe_rl, setup.toe_rr),
      groupLine("Sturz", setup.camber_fl, setup.camber_fr, setup.camber_rl, setup.camber_rr),
      groupLine("Nachlauf", setup.caster_fl, setup.caster_fr, setup.caster_rl, setup.caster_rr),
      "",
      "🔌 Elektronik:",
      setup.tc1 ? `- TC1: ${setup.tc1}` : null,
      setup.tc2 ? `- TC2: ${setup.tc2}` : null,
      setup.abs ? `- ABS: ${setup.abs}` : null,
      setup.ecu_map ? `- ECU Map: ${setup.ecu_map}` : null,
      "",
      "⚙️ Mechanischer Grip:",
      setup.arb_front ? `- Stabilisator vorne: ${setup.arb_front}` : null,
      setup.arb_rear ? `- Stabilisator hinten: ${setup.arb_rear}` : null,
      setup.diff_preload ? `- Vorspannung Diff: ${setup.diff_preload}` : null,
      "",
      "🧯 Stossdämpfer:",
      groupLine("Druckstufe", setup.bump_fl, setup.bump_fr, setup.bump_rl, setup.bump_rr),
      groupLine("Schnelle Druckstufe", setup.fast_bump_fl, setup.fast_bump_fr, setup.fast_bump_rl, setup.fast_bump_rr),
      groupLine("Zugstufe", setup.rebound_fl, setup.rebound_fr, setup.rebound_rl, setup.rebound_rr),
      groupLine("Schnelle Zugstufe", setup.fast_rebound_fl, setup.fast_rebound_fr, setup.fast_rebound_rl, setup.fast_rebound_rr),
      "",
      "🌬️ Spoiler:",
      setup.ride_height_front ? `- Bodenfreiheit vorne: ${setup.ride_height_front}` : null,
      setup.ride_height_rear ? `- Bodenfreiheit hinten: ${setup.ride_height_rear}` : null,
      setup.rear_wing ? `- Heckflügel: ${setup.rear_wing}` : null,
      setup.diffuser ? `- Diffusor: ${setup.diffuser}` : null,
      setup.brake_duct_front || setup.brake_duct_rear ? `- Bremsluftkanäle: vorne ${setup.brake_duct_front || "-"} / hinten ${setup.brake_duct_rear || "-"}` : null,
      "",
      setup.rating ? `Rating: ${setup.rating}/5` : null
    ].filter((line) => line !== null);

    return lines.join("\n");
  }

  function groupLine(label, fl, fr, rl, rr) {
    if (!fl && !fr && !rl && !rr) return null;
    return `- ${label}: VL ${fl || "-"} / VR ${fr || "-"} / HL ${rl || "-"} / HR ${rr || "-"}`;
  }

  async function copySetup(setup) {
    const text = buildSetupText(setup);

    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(setup.id);
      setMessage("Setup wurde kopiert.");
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      setMessage("Kopieren nicht möglich. Dein Browser blockiert die Zwischenablage.");
    }
  }

  async function updateRating(id, rating) {
  const next = setups.map((s) => s.id === id ? { ...s, rating } : s);
  setSetups(next);

  await supabase.from("setups").update({ rating }).eq("id", id);
}

  const filtered = useMemo(() => setups
    .filter((s) => trackFilter === "Alle Strecken" || s.track === trackFilter)
    .filter((s) => carFilter === "Alle Fahrzeuge" || s.car === carFilter)
    .filter((s) => `${s.title} ${s.track} ${s.car} ${s.driver}`.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)), [setups, search, trackFilter, carFilter]);

  const compareA = setups.find((setup) => setup.id === compareAId);
  const compareB = setups.find((setup) => setup.id === compareBId);

  const currentUser = session?.user?.email || session?.user?.user_metadata?.driver_name || session?.driverName;
  
  if (showSplash) {
  return (
    <div className="splash-screen">
      <div className="splash-card">
        <div className="splash-badge">NOOB RACING TEAM</div>
        <h1>Noob Racing Team Setup Tool</h1>
		<p>Powered by Magarec</p>
        <div className="splash-loader">
          <span></span>
        </div>
        <p>Setups werden geladen...</p>
      </div>
    </div>
  );
}

  return (
    <div className="app">
      <header className="hero hero-simple">
        <div>
          <div className="badge">NOOB RACING TEAM</div>
          <h1>NRT ACC Setup Hub</h1>
          <p>Setup-Datenbank für ACC Console: Tabs, Rating, Copy-Funktion und schneller Zugriff pro Strecke und Fahrzeug.</p>
        </div>
      </header>

      <nav className="tabs">
        <button className={activeTab === "setups" ? "active" : ""} onClick={() => setActiveTab("setups")}><Car /> Setups</button>
      </nav>

      {message && <div className="message">{message}</div>}

      {activeTab === "setups" && (
        <section className="grid setup-grid">
          <div className="panel">
            <h2>Setup eintragen</h2>

            <div className="field-group">
              <h3>Basis</h3>
              <input placeholder="Setup Name" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <select value={form.track} onChange={(e) => setForm({ ...form, track: e.target.value })}>{tracks.map(t => <option key={t}>{t}</option>)}</select>
              <select value={form.car} onChange={(e) => setForm({ ...form, car: e.target.value })}>{cars.map(c => <option key={c}>{c}</option>)}</select>
              <input placeholder="Fahrer" value={form.driver} onChange={(e) => setForm({ ...form, driver: e.target.value })} />
              <select value={form.weather} onChange={(e) => setForm({ ...form, weather: e.target.value })}><option>Trocken</option><option>Regen</option><option>Nass</option><option>Mixed</option><option>Hotlap</option></select>
            </div>

            <div className="setup-tab-nav">
              {setupTabs.map(tab => (
                <button
                  key={tab.id}
                  className={setupTab === tab.id ? "active" : ""}
                  onClick={() => setSetupTab(tab.id)}
                  type="button"
                >
                  <span className="tab-icon">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="tab-panel">
              {setupTab === "tyres" && (
                <>
                  <FieldGroup title="Reifen">
                    <QuadInputs form={form} setForm={setForm} labels={["VL", "VR", "HL", "HR"]} fields={["tyre_fl", "tyre_fr", "tyre_rl", "tyre_rr"]} />
                  </FieldGroup>

                  <FieldGroup title="Spur">
                    <QuadInputs form={form} setForm={setForm} labels={["VL", "VR", "HL", "HR"]} fields={["toe_fl", "toe_fr", "toe_rl", "toe_rr"]} />
                  </FieldGroup>

                  <FieldGroup title="Sturz">
                    <QuadInputs form={form} setForm={setForm} labels={["VL", "VR", "HL", "HR"]} fields={["camber_fl", "camber_fr", "camber_rl", "camber_rr"]} />
                  </FieldGroup>

                  <FieldGroup title="Nachlauf">
  <div className="field-grid two-col">
    <label className="mini-field">
      <span>VL</span>
      <input
        value={form.caster_fl || ""}
        onChange={(e) => setForm({ ...form, caster_fl: e.target.value })}
      />
    </label>

    <label className="mini-field">
      <span>VR</span>
      <input
        value={form.caster_fr || ""}
        onChange={(e) => setForm({ ...form, caster_fr: e.target.value })}
      />
    </label>
  </div>
</FieldGroup>
                </>
              )}

              {setupTab === "electronics" && (
                <FieldGroup title="Elektronik">
  <QuadInputs
    form={form}
    setForm={setForm}
    labels={["TC1", "ABS", "ECU Map", "TC2"]}
    fields={["tc1", "abs", "ecu_map", "tc2"]}
  />
</FieldGroup>
              )}

              {setupTab === "mechanical" && (
                <>
                  <FieldGroup title="Lenkung & Bremse">
                    <input placeholder="Bremsverteilung" value={form.brake_bias} onChange={(e) => setForm({ ...form, brake_bias: e.target.value })} />
                    <input placeholder="Lenkübersetzung" value={form.steering_ratio} onChange={(e) => setForm({ ...form, steering_ratio: e.target.value })} />
                  </FieldGroup>

                  <FieldGroup title="Lenkrate">
                    <QuadInputs form={form} setForm={setForm} labels={["VL", "VR", "HL", "HR"]} fields={["steer_rate_fl", "steer_rate_fr", "steer_rate_rl", "steer_rate_rr"]} />
                  </FieldGroup>

                  <FieldGroup title="Dämpfungsrate">
                    <QuadInputs form={form} setForm={setForm} labels={["VL", "VR", "HL", "HR"]} fields={["damp_rate_fl", "damp_rate_fr", "damp_rate_rl", "damp_rate_rr"]} />
                  </FieldGroup>

                  <FieldGroup title="Federweg">
                    <QuadInputs form={form} setForm={setForm} labels={["VL", "VR", "HL", "HR"]} fields={["travel_fl", "travel_fr", "travel_rl", "travel_rr"]} />
                  </FieldGroup>

                  <FieldGroup title="Stabis & Diff">
                    <input placeholder="Stabilisator vorne" value={form.arb_front} onChange={(e) => setForm({ ...form, arb_front: e.target.value })} />
                    <input placeholder="Stabilisator hinten" value={form.arb_rear} onChange={(e) => setForm({ ...form, arb_rear: e.target.value })} />
                    <input placeholder="Vorspannung Diff" value={form.diff_preload} onChange={(e) => setForm({ ...form, diff_preload: e.target.value })} />
                  </FieldGroup>
                </>
              )}

              {setupTab === "dampers" && (
                <>
                  <FieldGroup title="Druckstufe">
                    <QuadInputs form={form} setForm={setForm} labels={["VL", "VR", "HL", "HR"]} fields={["bump_fl", "bump_fr", "bump_rl", "bump_rr"]} />
                  </FieldGroup>
                  <FieldGroup title="Schnelle Druckstufe">
                    <QuadInputs form={form} setForm={setForm} labels={["VL", "VR", "HL", "HR"]} fields={["fast_bump_fl", "fast_bump_fr", "fast_bump_rl", "fast_bump_rr"]} />
                  </FieldGroup>
                  <FieldGroup title="Zugstufe">
                    <QuadInputs form={form} setForm={setForm} labels={["VL", "VR", "HL", "HR"]} fields={["rebound_fl", "rebound_fr", "rebound_rl", "rebound_rr"]} />
                  </FieldGroup>
                  <FieldGroup title="Schnelle Zugstufe">
                    <QuadInputs form={form} setForm={setForm} labels={["VL", "VR", "HL", "HR"]} fields={["fast_rebound_fl", "fast_rebound_fr", "fast_rebound_rl", "fast_rebound_rr"]} />
                  </FieldGroup>
                </>
              )}

              {setupTab === "aero" && (
                <FieldGroup title="Spoiler">
                  <input placeholder="Bodenfreiheit vorne" value={form.ride_height_front} onChange={(e) => setForm({ ...form, ride_height_front: e.target.value })} />
                  <input placeholder="Bodenfreiheit hinten" value={form.ride_height_rear} onChange={(e) => setForm({ ...form, ride_height_rear: e.target.value })} />
                  <input placeholder="Heckflügel" value={form.rear_wing} onChange={(e) => setForm({ ...form, rear_wing: e.target.value })} />
                  <input placeholder="Diffusor" value={form.diffuser} onChange={(e) => setForm({ ...form, diffuser: e.target.value })} />
                  <div className="field-grid two-col">
                    <input placeholder="Bremsluftkanal vorne" value={form.brake_duct_front} onChange={(e) => setForm({ ...form, brake_duct_front: e.target.value })} />
                    <input placeholder="Bremsluftkanal hinten" value={form.brake_duct_rear} onChange={(e) => setForm({ ...form, brake_duct_rear: e.target.value })} />
                  </div>
                </FieldGroup>
              )}
            </div>

            <div className="form-rating">
              <span>Rating</span>
              <StarRating value={Number(form.rating)} onChange={(rating) => setForm({ ...form, rating })} />
            </div>

            <button className="primary" onClick={addSetup}><Plus /> Setup speichern</button>
          </div>

          <div className="content">
            <div className="filters filters-simple">
              <div className="search"><Search /><input placeholder="Setup suchen..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
              <select value={trackFilter} onChange={(e) => setTrackFilter(e.target.value)}><option>Alle Strecken</option>{tracks.map(t => <option key={t}>{t}</option>)}</select>
              <select value={carFilter} onChange={(e) => setCarFilter(e.target.value)}><option>Alle Fahrzeuge</option>{cars.map(c => <option key={c}>{c}</option>)}</select>
            </div>

            <ComparePanel
              setups={setups}
              compareAId={compareAId}
              compareBId={compareBId}
              setCompareAId={setCompareAId}
              setCompareBId={setCompareBId}
              compareA={compareA}
              compareB={compareB}
            />

            <div className="cards">
              {filtered.map(setup => (
                <article className="setup-card" key={setup.id}>
                  <div className="setup-head">
                    <div>
                      <h3>{setup.title}</h3>
                      <p>{setup.track} · {setup.car}</p>
                    </div>
                    <div className="card-actions">
                      <button className="icon copy-soft" title="Setup kopieren" onClick={() => copySetup(setup)}>
                        {copiedId === setup.id ? <Check /> : <Clipboard />}
                      </button>
                      <button className="icon danger-soft" title="Setup löschen" onClick={() => removeSetup(setup.id)}><Trash2 /></button>
                    </div>
                  </div>

                  <StarRating value={Number(setup.rating || 0)} onChange={(rating) => updateRating(setup.id, rating)} />

                  <Section title="Reifen">
                    <Info label="VL" value={setup.tyre_fl} />
                    <Info label="VR" value={setup.tyre_fr} />
                    <Info label="HL" value={setup.tyre_rl} />
                    <Info label="HR" value={setup.tyre_rr} />
                    <Info label="Spur" value={quadValue(setup.toe_fl, setup.toe_fr, setup.toe_rl, setup.toe_rr)} />
                    <Info label="Sturz" value={quadValue(setup.camber_fl, setup.camber_fr, setup.camber_rl, setup.camber_rr)} />
                    <Info label="Nachlauf" value={quadValue(setup.caster_fl, setup.caster_fr, setup.caster_rl, setup.caster_rr)} />
                  </Section>

                  <Section title="Elektronik">
                    <Info label="TC1" value={setup.tc1} />
                    <Info label="TC2" value={setup.tc2} />
                    <Info label="ABS" value={setup.abs} />
                    <Info label="ECU" value={setup.ecu_map} />
                  </Section>

                  <Section title="Mechanischer Grip">
                    <Info label="Bremsverteilung" value={setup.brake_bias} />
                    <Info label="Lenkübersetzung" value={setup.steering_ratio} />
                    <Info label="Lenkrate" value={quadValue(setup.steer_rate_fl, setup.steer_rate_fr, setup.steer_rate_rl, setup.steer_rate_rr)} />
                    <Info label="Dämpfungsrate" value={quadValue(setup.damp_rate_fl, setup.damp_rate_fr, setup.damp_rate_rl, setup.damp_rate_rr)} />
                    <Info label="Federweg" value={quadValue(setup.travel_fl, setup.travel_fr, setup.travel_rl, setup.travel_rr)} />
                    <Info label="Stabi vorne" value={setup.arb_front} />
                    <Info label="Stabi hinten" value={setup.arb_rear} />
                    <Info label="Diff" value={setup.diff_preload} />
                  </Section>

                  <Section title="Stossdämpfer">
                    <Info label="Druckstufe" value={quadValue(setup.bump_fl, setup.bump_fr, setup.bump_rl, setup.bump_rr)} />
                    <Info label="Schnell Druck" value={quadValue(setup.fast_bump_fl, setup.fast_bump_fr, setup.fast_bump_rl, setup.fast_bump_rr)} />
                    <Info label="Zugstufe" value={quadValue(setup.rebound_fl, setup.rebound_fr, setup.rebound_rl, setup.rebound_rr)} />
                    <Info label="Schnell Zug" value={quadValue(setup.fast_rebound_fl, setup.fast_rebound_fr, setup.fast_rebound_rl, setup.fast_rebound_rr)} />
                  </Section>

                  <Section title="Spoiler">
                    <Info label="Boden vorne" value={setup.ride_height_front} />
                    <Info label="Boden hinten" value={setup.ride_height_rear} />
                    <Info label="Heckflügel" value={setup.rear_wing} />
                    <Info label="Diffusor" value={setup.diffuser} />
                    <Info label="Bremskanäle" value={setup.brake_duct_front || setup.brake_duct_rear ? `V ${setup.brake_duct_front || "-"} / H ${setup.brake_duct_rear || "-"}` : ""} />
                  </Section>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer>
        <Trophy /> NRT ACC Setup Hub · gebaut für Konsole und Community-Setups
      </footer>
    </div>
  );
}

function quadValue(fl, fr, rl, rr) {
  if (!fl && !fr && !rl && !rr) return "";
  return `VL ${fl || "-"} / VR ${fr || "-"} / HL ${rl || "-"} / HR ${rr || "-"}`;
}


const compareSections = [
  {
    title: "Reifen",
    rows: [
      ["Reifen VL", "tyre_fl"],
      ["Reifen VR", "tyre_fr"],
      ["Reifen HL", "tyre_rl"],
      ["Reifen HR", "tyre_rr"],
      ["Spur VL", "toe_fl"],
      ["Spur VR", "toe_fr"],
      ["Spur HL", "toe_rl"],
      ["Spur HR", "toe_rr"],
      ["Sturz VL", "camber_fl"],
      ["Sturz VR", "camber_fr"],
      ["Sturz HL", "camber_rl"],
      ["Sturz HR", "camber_rr"],
      ["Nachlauf VL", "caster_fl"],
      ["Nachlauf VR", "caster_fr"]
    ]
  },
  {
    title: "Elektronik",
    rows: [
      ["TC1", "tc1"],
      ["TC2", "tc2"],
      ["ABS", "abs"],
      ["ECU Map", "ecu_map"]
    ]
  },
  {
    title: "Mechanischer Grip",
    rows: [
      ["Bremsverteilung", "brake_bias"],
      ["Lenkübersetzung", "steering_ratio"],
      ["Lenkrate VL", "steer_rate_fl"],
      ["Lenkrate VR", "steer_rate_fr"],
      ["Lenkrate HL", "steer_rate_rl"],
      ["Lenkrate HR", "steer_rate_rr"],
      ["Dämpfungsrate VL", "damp_rate_fl"],
      ["Dämpfungsrate VR", "damp_rate_fr"],
      ["Dämpfungsrate HL", "damp_rate_rl"],
      ["Dämpfungsrate HR", "damp_rate_rr"],
      ["Federweg VL", "travel_fl"],
      ["Federweg VR", "travel_fr"],
      ["Federweg HL", "travel_rl"],
      ["Federweg HR", "travel_rr"],
      ["Stabilisator vorne", "arb_front"],
      ["Stabilisator hinten", "arb_rear"],
      ["Vorspannung Diff", "diff_preload"]
    ]
  },
  {
    title: "Stossdämpfer",
    rows: [
      ["Druckstufe VL", "bump_fl"],
      ["Druckstufe VR", "bump_fr"],
      ["Druckstufe HL", "bump_rl"],
      ["Druckstufe HR", "bump_rr"],
      ["Schnelle Druckstufe VL", "fast_bump_fl"],
      ["Schnelle Druckstufe VR", "fast_bump_fr"],
      ["Schnelle Druckstufe HL", "fast_bump_rl"],
      ["Schnelle Druckstufe HR", "fast_bump_rr"],
      ["Zugstufe VL", "rebound_fl"],
      ["Zugstufe VR", "rebound_fr"],
      ["Zugstufe HL", "rebound_rl"],
      ["Zugstufe HR", "rebound_rr"],
      ["Schnelle Zugstufe VL", "fast_rebound_fl"],
      ["Schnelle Zugstufe VR", "fast_rebound_fr"],
      ["Schnelle Zugstufe HL", "fast_rebound_rl"],
      ["Schnelle Zugstufe HR", "fast_rebound_rr"]
    ]
  },
  {
    title: "Spoiler",
    rows: [
      ["Bodenfreiheit vorne", "ride_height_front"],
      ["Bodenfreiheit hinten", "ride_height_rear"],
      ["Heckflügel", "rear_wing"],
      ["Diffusor", "diffuser"],
      ["Bremsluftkanal vorne", "brake_duct_front"],
      ["Bremsluftkanal hinten", "brake_duct_rear"]
    ]
  }
];

function ComparePanel({ setups, compareAId, compareBId, setCompareAId, setCompareBId, compareA, compareB }) {
  const hasCompare = compareA && compareB;

  return (
    <div className="compare-panel">
      <div className="compare-head">
        <div>
          <h2>Setup Vergleich</h2>
          <p>Wähle zwei Setups aus. Unterschiede werden automatisch hervorgehoben.</p>
        </div>
      </div>

      <div className="compare-selects">
        <label>
          <span>Setup A</span>
          <select value={compareAId} onChange={(e) => setCompareAId(e.target.value)}>
            <option value="">Auswählen</option>
            {setups.map((setup) => (
              <option key={setup.id} value={setup.id}>{setup.title} · {setup.track}</option>
            ))}
          </select>
        </label>

        <label>
          <span>Setup B</span>
          <select value={compareBId} onChange={(e) => setCompareBId(e.target.value)}>
            <option value="">Auswählen</option>
            {setups.map((setup) => (
              <option key={setup.id} value={setup.id}>{setup.title} · {setup.track}</option>
            ))}
          </select>
        </label>
      </div>

      {hasCompare && (
        <div className="compare-table">
          <div className="compare-title-row">
            <div>Wert</div>
            <div>{compareA.title}</div>
            <div>{compareB.title}</div>
          </div>

          {compareSections.map((section) => (
            <div className="compare-section" key={section.title}>
              <h3>{section.title}</h3>
              {section.rows.map(([label, field]) => {
                const valueA = compareA[field] || "-";
                const valueB = compareB[field] || "-";
                const different = valueA !== valueB;

                return (
                  <div className={different ? "compare-row is-different" : "compare-row"} key={field}>
                    <div className="compare-label">{label}</div>
                    <div>{valueA}</div>
                    <div>{valueB}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


function FieldGroup({ title, children }) {
  return (
    <div className="field-group">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function QuadInputs({ form, setForm, labels, fields }) {
  return (
    <div className="field-grid four-col">
      {fields.map((field, index) => (
        <label key={field} className="mini-field">
          <span>{labels[index]}</span>
          <input value={form[field] || ""} onChange={(e) => setForm({ ...form, [field]: e.target.value })} placeholder={labels[index]} />
        </label>
      ))}
    </div>
  );
}

function Section({ title, children }) {
  const visible = React.Children.toArray(children).filter(Boolean);
  if (!visible.length) return null;

  return (
    <div className="setup-section">
      <h4>{title}</h4>
      <div className="specs">{children}</div>
    </div>
  );
}

function StarRating({ value, onChange }) {
  return (
    <div className="rating interactive-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={star <= value ? "star active" : "star"}
          onClick={() => onChange(star)}
          title={`${star} Sterne`}
        >
          <Star />
        </button>
      ))}
    </div>
  );
}

function Info({ label, value }) {
  if (!value) return null;
  return <div><span>{label}</span><b>{value}</b></div>;
}
