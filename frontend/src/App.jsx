import { useEffect, useState, useRef, useCallback } from "react";
import "./App.css";

// ═══════════════════════════════════════════════════════════
// ICONS (inline SVG — no extra deps)
// ═══════════════════════════════════════════════════════════
const Icon = {
  Grid: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="7" height="7" rx="1.5"/><rect x="11" y="2" width="7" height="7" rx="1.5"/>
      <rect x="2" y="11" width="7" height="7" rx="1.5"/><rect x="11" y="11" width="7" height="7" rx="1.5"/>
    </svg>
  ),
  Cpu: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="5" width="10" height="10" rx="1.5"/>
      <path d="M7 2v3M10 2v3M13 2v3M7 15v3M10 15v3M13 15v3M2 7h3M2 10h3M2 13h3M15 7h3M15 10h3M15 13h3"/>
    </svg>
  ),
  Bell: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2a6 6 0 0 1 6 6v3l2 3H2l2-3V8a6 6 0 0 1 6-6z"/>
      <path d="M8 16a2 2 0 0 0 4 0"/>
    </svg>
  ),
  Brain: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2C7.5 2 5 4 5 7c0 1-.5 2-1.5 2.5C2 10.5 2 13 4 14c.5.3 1 .5 1.5.5V17h9v-2.5c.5 0 1-.2 1.5-.5 2-1 2-3.5.5-4.5C15.5 9 15 8 15 7c0-3-2.5-5-5-5z"/>
    </svg>
  ),
  Settings: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="3"/>
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4"/>
    </svg>
  ),
  Search: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <circle cx="8.5" cy="8.5" r="5.5"/><path d="M14.5 14.5L18 18"/>
    </svg>
  ),
  Refresh: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10a6 6 0 1 1 1.8 4.3"/><path d="M4 14V10h4"/>
    </svg>
  ),
  Download: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 3v10M6 9l4 4 4-4"/><path d="M3 16h14"/>
    </svg>
  ),
  Warning: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 3L2 17h16L10 3z"/><path d="M10 9v4"/><circle cx="10" cy="15" r="0.5" fill="currentColor"/>
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2l7 3v5c0 4-3 7-7 8C7 17 4 14 3 10V5l7-3z"/>
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10l5 5 7-8"/>
    </svg>
  ),
  Activity: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 10h3l3-6 3 12 3-8 2 2h2"/>
    </svg>
  ),
  Server: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="16" height="5" rx="1.5"/>
      <rect x="2" y="10" width="16" height="5" rx="1.5"/>
      <circle cx="5.5" cy="5.5" r="0.8" fill="currentColor"/>
      <circle cx="5.5" cy="12.5" r="0.8" fill="currentColor"/>
    </svg>
  ),
  User: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="10" cy="7" r="4"/><path d="M3 18c0-3.9 3.1-7 7-7s7 3.1 7 7"/>
    </svg>
  ),
  Network: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="2"/><circle cx="3" cy="5" r="1.5"/><circle cx="17" cy="5" r="1.5"/>
      <circle cx="3" cy="15" r="1.5"/><circle cx="17" cy="15" r="1.5"/>
      <path d="M8.5 9L4.2 6M11.5 9l3.8-3M8.5 11L4.2 14M11.5 11l3.8 3"/>
    </svg>
  ),
};

// ═══════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════
function getColor(v, w = 60, c = 85) {
  if (v >= c) return "var(--red)";
  if (v >= w) return "var(--amber)";
  return "var(--green)";
}
function getColorClass(v, w = 60, c = 85) {
  if (v >= c) return "text-crit";
  if (v >= w) return "text-warn";
  return "text-ok";
}
function getPillClass(v, w = 60, c = 85) {
  if (v >= c) return "pill-crit";
  if (v >= w) return "pill-warn";
  return "pill-ok";
}

function useNow() {
  const [t, setT] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setT(new Date()), 1000); return () => clearInterval(id); }, []);
  return t;
}

// ═══════════════════════════════════════════════════════════
// MOCK DATA
// ═══════════════════════════════════════════════════════════
const INIT_PROCESSES = [
  { name: "ollama.exe",   pid: 4821, cpu: 0,   memory: 13.34, status: "idle",   type: "AI" },
  { name: "Code.exe",     pid: 9102, cpu: 1.0, memory: 6.91,  status: "active", type: "Dev" },
  { name: "chrome.exe",   pid: 3345, cpu: 0,   memory: 5.65,  status: "idle",   type: "Browser" },
  { name: "Code.exe",     pid: 9108, cpu: 0,   memory: 3.60,  status: "idle",   type: "Dev" },
  { name: "chrome.exe",   pid: 3401, cpu: 6.2, memory: 1.74,  status: "active", type: "Browser" },
  { name: "explorer.exe", pid: 1024, cpu: 0,   memory: 1.67,  status: "idle",   type: "System" },
  { name: "oracle.exe",   pid: 6610, cpu: 0,   memory: 1.61,  status: "idle",   type: "DB" },
  { name: "MsMpEng.exe",  pid: 2288, cpu: 0,   memory: 1.42,  status: "idle",   type: "Security" },
  { name: "Code.exe",     pid: 9120, cpu: 0,   memory: 1.29,  status: "idle",   type: "Dev" },
  { name: "chrome.exe",   pid: 3502, cpu: 2.1, memory: 1.25,  status: "active", type: "Browser" },
];

const ALERT_RULES = [
  {
    id: "mem_crit",
    check: m => m.memory >= 90,
    severity: "critical", icon: "🔴",
    title: "Critical Memory Pressure",
    desc: m => `System memory at ${m.memory.toFixed(1)}% — nearing swap exhaustion. Immediate action required to prevent OOM kills.`,
    source: "Memory Monitor",
  },
  {
    id: "mem_warn",
    check: m => m.memory >= 75 && m.memory < 90,
    severity: "warning", icon: "🟡",
    title: "High Memory Utilization",
    desc: m => `Memory at ${m.memory.toFixed(1)}%. Multiple processes consuming significant heap. Monitor for further increase.`,
    source: "Memory Monitor",
  },
  {
    id: "cpu_crit",
    check: m => m.cpu >= 85,
    severity: "critical", icon: "🔴",
    title: "CPU Saturation",
    desc: m => `CPU at ${m.cpu.toFixed(1)}% — system throughput severely degraded. Identify runaway processes.`,
    source: "CPU Monitor",
  },
  {
    id: "cpu_warn",
    check: m => m.cpu >= 60 && m.cpu < 85,
    severity: "warning", icon: "🟡",
    title: "Elevated CPU Load",
    desc: m => `CPU at ${m.cpu.toFixed(1)}%. Sustained load may impact responsiveness. Review active processes.`,
    source: "CPU Monitor",
  },
  {
    id: "ollama",
    check: (_m, procs) => procs.some(p => p.name === "ollama.exe" && p.memory > 10),
    severity: "warning", icon: "🤖",
    title: "Idle AI Model Consuming RAM",
    desc: () => "ollama.exe holds an active model in memory while idle. Unloading would free ~2GB.",
    source: "Process Analyzer",
  },
  {
    id: "ok",
    check: m => m.cpu < 60 && m.memory < 75,
    severity: "ok", icon: "🟢",
    title: "All Systems Nominal",
    desc: () => "CPU and memory within healthy operating thresholds. No action required.",
    source: "Health Check",
  },
];

const AI_TEXT = `**Short Summary:**
System is operating under sustained memory pressure with multiple heavyweight processes loaded simultaneously.

**Risk Level:**
Medium-High — memory at 85.3% with no clear headroom remaining.

**Top Cause:**
ollama.exe retains a loaded LLM in VRAM and system RAM despite being idle (13.3% RAM). Three concurrent Chrome renderer processes and three VS Code windows compound heap usage significantly.

**One Fix:**
Run \`ollama stop\` in terminal to unload the idle model. This reclaims approximately 2.1 GB, dropping memory utilization to ~72% — safely below warning threshold.`;

// ═══════════════════════════════════════════════════════════
// SPARKLINE
// ═══════════════════════════════════════════════════════════
function Sparkline({ data, color, height = 60 }) {
  if (!data || data.length < 2) return null;
  const w = 500; const h = height;
  const min = Math.min(...data);
  const max = Math.max(...data) || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h * 0.85) - h * 0.075;
    return `${x},${y}`;
  });
  const line = pts.join(" L ");
  const area = `M ${pts[0]} L ${line} L ${w},${h} L 0,${h} Z`;
  return (
    <svg className="sparkline-svg" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ height }}>
      <defs>
        <linearGradient id={`sg-${color.replace(/[^a-z]/gi,"")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#sg-${color.replace(/[^a-z]/gi,"")})`}/>
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════
// TYPEWRITER AI
// ═══════════════════════════════════════════════════════════
function parseAIText(raw) {
  if (!raw) return [];
  const TAG_MAP = {
    "Short Summary": "summary",
    "Risk Level":    "risk",
    "Top Cause":     "cause",
    "One Fix":       "fix",
  };
  const lines = raw.split("\n");
  const sections = [];
  let current = null;
  for (const line of lines) {
    const stripped = line.replace(/\*\*/g, "").trim();
    const tagKey = Object.keys(TAG_MAP).find(k => stripped === k + ":");
    if (tagKey) {
      if (current) sections.push(current);
      current = { type: TAG_MAP[tagKey], title: tagKey, lines: [] };
    } else if (stripped && current) {
      current.lines.push(stripped);
    }
  }
  if (current) sections.push(current);
  return sections;
}

function AIOutput({ text, compact = true }) {
  const [shown, setShown] = useState("");
  const prevRef = useRef("");
  const timerRef = useRef(null);

  useEffect(() => {
    if (!text) { setShown(""); prevRef.current = ""; return; }
    if (text === prevRef.current) return;
    if (timerRef.current) clearInterval(timerRef.current);
    const base = text.startsWith(prevRef.current) ? prevRef.current.length : 0;
    if (base === 0) { setShown(""); prevRef.current = ""; }
    let i = base;
    timerRef.current = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) { clearInterval(timerRef.current); prevRef.current = text; }
    }, 9);
    return () => clearInterval(timerRef.current);
  }, [text]);

  const isTyping = shown.length < (text || "").length;
  const sections = parseAIText(shown);

  if (!shown) return (
    <div className="ai-thinking">
      <div className="ai-dot-pulse">
        <div className="ai-dot"/><div className="ai-dot"/><div className="ai-dot"/>
      </div>
      Analyzing system state…
    </div>
  );

  const tagClass  = { summary: "ai-tag-summary", risk: "ai-tag-risk", cause: "ai-tag-cause", fix: "ai-tag-fix" };
  const tagLabel  = { summary: "◈ Summary", risk: "⚠ Risk Level", cause: "⬡ Root Cause", fix: "✦ Recommended Fix" };
  const isFull    = !compact;

  return (
    <div>
      {sections.map((s, i) => (
        <div className={compact ? "ai-section" : "ai-full-section"} key={i}>
          <div className={compact ? `ai-tag ${tagClass[s.type]}` : `ai-full-tag ${tagClass[s.type]}`}>
            {tagLabel[s.type]}
          </div>
          {s.type === "fix"
            ? <div className={compact ? "ai-code-block" : "ai-full-code"}>{s.lines.join(" ")}</div>
            : <div
                className={compact ? "ai-text" : "ai-full-text"}
                dangerouslySetInnerHTML={{ __html: s.lines.join(" ").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }}
              />
          }
        </div>
      ))}
      {isTyping && <span className="ai-cursor"/>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SIDEBAR
// ═══════════════════════════════════════════════════════════
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard",  Icon: Icon.Grid,     section: "main" },
  { id: "processes", label: "Processes",  Icon: Icon.Cpu,      section: "main" },
  { id: "alerts",    label: "Alerts",     Icon: Icon.Bell,     section: "main", badge: true },
  { id: "ai",        label: "AI Analysis",Icon: Icon.Brain,    section: "main" },
  { id: "settings",  label: "Settings",   Icon: Icon.Settings, section: "config" },
];

function Sidebar({ page, setPage, alertCount, metrics }) {
  return (
    <aside className="sidebar">
      <div className="sb-brand">
        <div className="sb-brand-icon">
          <svg viewBox="0 0 16 16" fill="none">
            <rect x="1" y="1" width="6" height="6" rx="1.2" fill="white" fillOpacity="0.9"/>
            <rect x="9" y="1" width="6" height="6" rx="1.2" fill="white" fillOpacity="0.5"/>
            <rect x="1" y="9" width="6" height="6" rx="1.2" fill="white" fillOpacity="0.5"/>
            <rect x="9" y="9" width="6" height="6" rx="1.2" fill="white" fillOpacity="0.9"/>
          </svg>
        </div>
        <div className="sb-brand-text">
          <span className="sb-brand-name">DevOps Monitor</span>
          <span className="sb-brand-sub">v2.4.1</span>
        </div>
      </div>

      <nav className="sb-nav">
        <div className="sb-section-label">Main</div>
        {NAV_ITEMS.filter(n => n.section === "main").map(n => (
          <div key={n.id} className={`sb-item${page === n.id ? " active" : ""}`} onClick={() => setPage(n.id)}>
            <span className="sb-item-icon"><n.Icon/></span>
            {n.label}
            {n.badge && alertCount > 0 && <span className="sb-item-badge">{alertCount}</span>}
          </div>
        ))}
        <div className="sb-section-label">Config</div>
        {NAV_ITEMS.filter(n => n.section === "config").map(n => (
          <div key={n.id} className={`sb-item${page === n.id ? " active" : ""}`} onClick={() => setPage(n.id)}>
            <span className="sb-item-icon"><n.Icon/></span>
            {n.label}
          </div>
        ))}
      </nav>

      <div className="sb-footer">
        <div className="sb-status-row">
          <div className="sb-status-dot" style={{ background: getColor(metrics.cpu, 60, 85) }}/>
          <span className="sb-status-text">CPU</span>
          <span className="sb-status-val">{metrics.cpu.toFixed(1)}%</span>
        </div>
        <div className="sb-status-row">
          <div className="sb-status-dot" style={{ background: getColor(metrics.memory, 75, 90) }}/>
          <span className="sb-status-text">Memory</span>
          <span className="sb-status-val">{metrics.memory.toFixed(1)}%</span>
        </div>
      </div>
    </aside>
  );
}

// ═══════════════════════════════════════════════════════════
// TOPBAR
// ═══════════════════════════════════════════════════════════
function Topbar({ page, metrics, now }) {
  const labels = { dashboard:"Dashboard", processes:"Processes", alerts:"Alerts", ai:"AI Analysis", settings:"Settings" };
  const memHigh = metrics.memory >= 75;
  return (
    <header className="topbar">
      <div className="topbar-breadcrumb">
        <span>Monitor</span>
        <span className="topbar-breadcrumb-sep">›</span>
        <span className="topbar-breadcrumb-current">{labels[page]}</span>
      </div>
      <div className="topbar-right">
        {memHigh && (
          <div className="topbar-chip warn">
            <div className="topbar-chip-dot"/>
            MEM {metrics.memory.toFixed(0)}%
          </div>
        )}
        <div className="topbar-chip live">
          <div className="topbar-chip-dot"/>
          Live
        </div>
        <div className="topbar-time">
          {now.toLocaleTimeString("en-US", { hour12: false })}
        </div>
        <div className="topbar-avatar">AD</div>
      </div>
    </header>
  );
}

// ═══════════════════════════════════════════════════════════
// PAGE: DASHBOARD
// ═══════════════════════════════════════════════════════════
function DashboardPage({ metrics, processes, ai, alerts }) {
  const cpuC   = getColor(metrics.cpu, 60, 85);
  const memC   = getColor(metrics.memory, 75, 90);
  const topCpu = processes.reduce((a, b) => b.cpu > a.cpu ? b : a, processes[0] || { cpu: 0, name: "—" });
  const totalMem = processes.reduce((s, p) => s + p.memory, 0);

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <div className="page-title">System Overview</div>
          <div className="page-subtitle">Real-time performance metrics &amp; diagnostics</div>
        </div>
        <div className="page-actions">
          <button className="btn btn-ghost"><Icon.Refresh/> Refresh</button>
          <button className="btn btn-ghost"><Icon.Download/> Export</button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="kpi-grid">
        {/* CPU */}
        <div className="kpi-card" style={{ "--accent": cpuC }}>
          <div className="kpi-card-accent" style={{ background: `linear-gradient(90deg, ${cpuC}, transparent)` }}/>
          <div className="kpi-label">
            <div className="kpi-label-dot" style={{ background: cpuC }}/>
            CPU Utilization
          </div>
          <div className="kpi-value" style={{ color: cpuC }}>
            {metrics.cpu.toFixed(1)}<span>%</span>
          </div>
          <div className="kpi-trend">
            <span className={getColorClass(metrics.cpu, 60, 85)}>
              {metrics.cpu < 60 ? "✓ Healthy" : metrics.cpu < 85 ? "⚠ Elevated" : "✖ Critical"}
            </span>
          </div>
          <div className="kpi-bar-track">
            <div className="kpi-bar-fill" style={{ width: `${metrics.cpu}%`, background: cpuC }}/>
          </div>
        </div>

        {/* Memory */}
        <div className="kpi-card">
          <div className="kpi-card-accent" style={{ background: `linear-gradient(90deg, ${memC}, transparent)` }}/>
          <div className="kpi-label">
            <div className="kpi-label-dot" style={{ background: memC }}/>
            Memory Usage
          </div>
          <div className="kpi-value" style={{ color: memC }}>
            {metrics.memory.toFixed(1)}<span>%</span>
          </div>
          <div className="kpi-trend">
            <span className={getColorClass(metrics.memory, 75, 90)}>
              {metrics.memory < 75 ? "✓ Healthy" : metrics.memory < 90 ? "⚠ High" : "✖ Critical"}
            </span>
          </div>
          <div className="kpi-bar-track">
            <div className="kpi-bar-fill" style={{ width: `${metrics.memory}%`, background: memC }}/>
          </div>
        </div>

        {/* Processes */}
        <div className="kpi-card">
          <div className="kpi-card-accent" style={{ background: "linear-gradient(90deg, var(--blue), transparent)" }}/>
          <div className="kpi-label">
            <div className="kpi-label-dot" style={{ background: "var(--blue)" }}/>
            Active Processes
          </div>
          <div className="kpi-value" style={{ color: "var(--blue2)" }}>
            {processes.length}<span> procs</span>
          </div>
          <div className="kpi-trend text-muted">
            Top: <span style={{ color: "var(--t2)" }}>{topCpu.name}</span>
          </div>
          <div className="kpi-bar-track">
            <div className="kpi-bar-fill" style={{ width: `${(processes.length / 20) * 100}%`, background: "var(--blue)" }}/>
          </div>
        </div>

        {/* Alerts */}
        <div className="kpi-card">
          <div className="kpi-card-accent" style={{ background: `linear-gradient(90deg, ${alerts.length > 1 ? "var(--amber)" : "var(--green)"}, transparent)` }}/>
          <div className="kpi-label">
            <div className="kpi-label-dot" style={{ background: alerts.length > 1 ? "var(--amber)" : "var(--green)" }}/>
            Active Alerts
          </div>
          <div className="kpi-value" style={{ color: alerts.length > 1 ? "var(--amber2)" : "var(--green2)" }}>
            {alerts.length}<span> alerts</span>
          </div>
          <div className="kpi-trend">
            <span className={alerts.length > 0 ? "text-warn" : "text-ok"}>
              {alerts.some(a => a.severity === "critical") ? "⚠ Critical active" : alerts.length > 0 ? "⚠ Warnings active" : "✓ All clear"}
            </span>
          </div>
          <div className="kpi-bar-track">
            <div className="kpi-bar-fill" style={{ width: `${Math.min(alerts.length * 25, 100)}%`, background: alerts.length > 1 ? "var(--amber)" : "var(--green)" }}/>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="dash-grid">
        <div className="dash-grid-left">
          {/* Process table */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">
                  <span className="card-title-icon" style={{ background: "rgba(59,130,246,0.1)", color: "var(--blue2)" }}><Icon.Cpu/></span>
                  Top Processes
                </div>
                <div className="card-subtitle">{processes.length} tracked &mdash; sorted by RAM</div>
              </div>
            </div>
            <table className="proc-table">
              <thead>
                <tr>
                  <th>#</th><th>Process</th><th>CPU</th><th>RAM</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {processes.slice(0, 8).map((p, i) => (
                  <tr className="proc-row" key={i}>
                    <td className="proc-num">{String(i + 1).padStart(2, "0")}</td>
                    <td>
                      <div className="proc-name-wrap">
                        <div className="proc-name-icon">
                          {p.type === "AI" ? "🤖" : p.type === "Dev" ? "⌨" : p.type === "Browser" ? "🌐" : p.type === "DB" ? "🗄" : p.type === "Security" ? "🛡" : "⚙"}
                        </div>
                        <div>
                          <div className="proc-name">{p.name}</div>
                          <div className="proc-pid">PID {p.pid} · {p.type}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="sparkbar">
                        <div className="sparkbar-track">
                          <div className="sparkbar-fill" style={{ width: `${Math.min((p.cpu / 10) * 100, 100)}%`, background: getColor(p.cpu, 5, 15) }}/>
                        </div>
                        <span className="sparkbar-val">{p.cpu.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td>
                      <div className="sparkbar">
                        <div className="sparkbar-track">
                          <div className="sparkbar-fill" style={{ width: `${Math.min((p.memory / 15) * 100, 100)}%`, background: getColor(p.memory, 5, 10) }}/>
                        </div>
                        <span className="sparkbar-val">{p.memory.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`status-pill ${getPillClass(Math.max(p.cpu * 5, p.memory), 20, 50)}`}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor", display: "inline-block" }}/>
                        {p.cpu > 4 ? "Active" : p.memory > 8 ? "Heavy" : "Idle"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dash-grid-right">
          {/* Alerts */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">
                  <span className="card-title-icon" style={{ background: "rgba(245,158,11,0.1)", color: "var(--amber2)" }}><Icon.Bell/></span>
                  Active Alerts
                </div>
                <div className="card-subtitle">{alerts.length} alert{alerts.length !== 1 ? "s" : ""} firing</div>
              </div>
            </div>
            <div className="alert-list">
              {alerts.map((a, i) => {
                const sevClass = { critical: "sev-critical", warning: "sev-warning", ok: "sev-ok", info: "sev-info" };
                const sevBg = { critical: "rgba(239,68,68,0.1)", warning: "rgba(245,158,11,0.1)", ok: "rgba(16,185,129,0.08)", info: "rgba(59,130,246,0.1)" };
                const sevIc = { critical: "var(--red)", warning: "var(--amber)", ok: "var(--green)", info: "var(--blue)" };
                return (
                  <div className="alert-item" key={i}>
                    <div className="alert-icon-wrap" style={{ background: sevBg[a.severity], color: sevIc[a.severity] }}>
                      {a.icon}
                    </div>
                    <div className="alert-body">
                      <div className="alert-title">{a.title}</div>
                      <div className="alert-desc">{a.desc(metrics)}</div>
                      <div className="alert-meta">
                        <span className="alert-time">just now</span>
                        <span className={`alert-severity ${sevClass[a.severity]}`}>{a.severity}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Panel */}
          <div className="card" style={{ flex: 1 }}>
            <div className="card-header">
              <div>
                <div className="card-title">
                  <span className="card-title-icon" style={{ background: "rgba(139,92,246,0.1)", color: "var(--violet2)" }}><Icon.Brain/></span>
                  AI Diagnostics
                </div>
                <div className="card-subtitle">Live analysis</div>
              </div>
              <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--violet2)", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", padding: "2px 8px", borderRadius: 4 }}>AI · Live</span>
            </div>
            <div className="ai-panel-body">
              <AIOutput text={ai} compact={true}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PAGE: PROCESSES
// ═══════════════════════════════════════════════════════════
function ProcessesPage({ processes }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortKey, setSortKey] = useState("memory");

  const filtered = processes
    .filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || String(p.pid).includes(search);
      const matchFilter = filter === "all" || p.type.toLowerCase() === filter || (filter === "active" && p.cpu > 1);
      return matchSearch && matchFilter;
    })
    .sort((a, b) => b[sortKey] - a[sortKey]);

  const filters = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "browser", label: "Browser" },
    { id: "dev", label: "Dev" },
    { id: "system", label: "System" },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <div className="page-title">Process Monitor</div>
          <div className="page-subtitle">All running processes with resource metrics</div>
        </div>
        <div className="page-actions">
          <button className="btn btn-ghost"><Icon.Refresh/> Refresh</button>
        </div>
      </div>

      <div className="processes-toolbar">
        <div className="search-box">
          <Icon.Search/>
          <input placeholder="Search by name or PID…" value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
        {filters.map(f => (
          <button key={f.id} className={`filter-pill${filter === f.id ? " active" : ""}`} onClick={() => setFilter(f.id)}>
            {f.label}
          </button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--t3)" }}>
          Sort:
          {["cpu","memory"].map(k => (
            <button key={k} className={`filter-pill${sortKey === k ? " active" : ""}`} onClick={() => setSortKey(k)}>
              {k.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <table className="proc-full-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Process Name</th>
              <th>PID</th>
              <th>Type</th>
              <th className={sortKey === "cpu" ? "sort-active sortable" : "sortable"} onClick={() => setSortKey("cpu")}>CPU ↕</th>
              <th className={sortKey === "memory" ? "sort-active sortable" : "sortable"} onClick={() => setSortKey("memory")}>RAM ↕</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7}><div className="empty-state"><div className="empty-state-icon">🔍</div><div className="empty-state-title">No processes found</div><div className="empty-state-desc">Try adjusting your search or filters</div></div></td></tr>
            ) : filtered.map((p, i) => (
              <tr className="proc-full-row" key={i}>
                <td className="proc-num">{String(i + 1).padStart(2, "0")}</td>
                <td>
                  <div className="proc-name-wrap">
                    <div className="proc-name-icon">
                      {p.type === "AI" ? "🤖" : p.type === "Dev" ? "⌨" : p.type === "Browser" ? "🌐" : p.type === "DB" ? "🗄" : p.type === "Security" ? "🛡" : "⚙"}
                    </div>
                    <span className="proc-name">{p.name}</span>
                  </div>
                </td>
                <td><span className="mono text-muted" style={{ fontSize: 12 }}>{p.pid}</span></td>
                <td><span className="mono" style={{ fontSize: 11, color: "var(--t3)" }}>{p.type}</span></td>
                <td>
                  <div className="sparkbar">
                    <div className="sparkbar-track">
                      <div className="sparkbar-fill" style={{ width: `${Math.min((p.cpu / 10) * 100, 100)}%`, background: getColor(p.cpu, 5, 15) }}/>
                    </div>
                    <span className="sparkbar-val">{p.cpu.toFixed(1)}%</span>
                  </div>
                </td>
                <td>
                  <div className="sparkbar">
                    <div className="sparkbar-track">
                      <div className="sparkbar-fill" style={{ width: `${Math.min((p.memory / 15) * 100, 100)}%`, background: getColor(p.memory, 5, 10) }}/>
                    </div>
                    <span className="sparkbar-val">{p.memory.toFixed(1)}%</span>
                  </div>
                </td>
                <td>
                  <span className={`status-pill ${p.cpu > 4 ? "pill-warn" : p.memory > 8 ? "pill-crit" : "pill-ok"}`}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor", display: "inline-block" }}/>
                    {p.cpu > 4 ? "Active" : p.memory > 8 ? "Heavy" : "Idle"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PAGE: ALERTS
// ═══════════════════════════════════════════════════════════
function AlertsPage({ alerts, metrics }) {
  const sevBg = { critical: "rgba(239,68,68,0.1)", warning: "rgba(245,158,11,0.1)", ok: "rgba(16,185,129,0.08)", info: "rgba(59,130,246,0.1)" };
  const sevIc = { critical: "var(--red)", warning: "var(--amber)", ok: "var(--green)", info: "var(--blue)" };
  const sevClass = { critical: "sev-critical", warning: "sev-warning", ok: "sev-ok", info: "sev-info" };
  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <div className="page-title">Alert Center</div>
          <div className="page-subtitle">{alerts.length} alert{alerts.length !== 1 ? "s" : ""} currently active across all monitors</div>
        </div>
        <div className="page-actions">
          <button className="btn btn-ghost"><Icon.Check/> Mark all read</button>
          <button className="btn btn-ghost"><Icon.Download/> Export</button>
        </div>
      </div>

      {/* Summary bar */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Critical", val: alerts.filter(a => a.severity === "critical").length, color: "var(--red)", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.2)" },
          { label: "Warning",  val: alerts.filter(a => a.severity === "warning").length,  color: "var(--amber)", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)" },
          { label: "Info",     val: alerts.filter(a => a.severity === "info").length,     color: "var(--blue2)", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.2)" },
          { label: "OK",       val: alerts.filter(a => a.severity === "ok").length,       color: "var(--green)", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)" },
        ].map((s, i) => (
          <div key={i} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: "var(--r-lg)", padding: "14px 18px" }}>
            <div style={{ fontSize: 10.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.09em", color: s.color, marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 28, fontWeight: 500, color: s.color }}>{s.val}</div>
          </div>
        ))}
      </div>

      <div className="alerts-full-list">
        {alerts.map((a, i) => (
          <div className="alert-card" key={i} style={{ borderLeftWidth: 3, borderLeftColor: sevIc[a.severity] }}>
            <div className="alert-card-icon" style={{ background: sevBg[a.severity], color: sevIc[a.severity] }}>
              {a.icon}
            </div>
            <div className="alert-card-body">
              <div className="alert-card-header">
                <div className="alert-card-title">{a.title}</div>
                <span className={`alert-severity ${sevClass[a.severity]}`} style={{ flexShrink: 0 }}>{a.severity}</span>
              </div>
              <div className="alert-card-desc">{a.desc(metrics)}</div>
              <div className="alert-card-footer">
                <span className="alert-card-time">Triggered just now</span>
                <span className="alert-card-source">{a.source}</span>
              </div>
            </div>
          </div>
        ))}
        {alerts.length === 0 && (
          <div className="card"><div className="empty-state">
            <div className="empty-state-icon">✅</div>
            <div className="empty-state-title">No active alerts</div>
            <div className="empty-state-desc">All systems are operating within normal thresholds</div>
          </div></div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PAGE: AI ANALYSIS
// ═══════════════════════════════════════════════════════════
function AIPage({ ai, metrics, processes }) {
  const topMem = processes.reduce((a, b) => b.memory > a.memory ? b : a, processes[0] || { memory: 0, name: "—" });
  const riskScore = Math.round(
    (metrics.cpu / 100) * 30 + (metrics.memory / 100) * 50 +
    (processes.filter(p => p.cpu > 4).length / processes.length) * 20
  );
  const riskColor = riskScore >= 60 ? "var(--red)" : riskScore >= 35 ? "var(--amber)" : "var(--green)";

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <div className="page-title">AI Analysis</div>
          <div className="page-subtitle">Live diagnostic report generated from system telemetry</div>
        </div>
        <div className="page-actions">
          <button className="btn btn-ghost"><Icon.Refresh/> Re-analyze</button>
          <button className="btn btn-primary"><Icon.Download/> Export Report</button>
        </div>
      </div>

      <div className="ai-page-grid">
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <span className="card-title-icon" style={{ background: "rgba(139,92,246,0.1)", color: "var(--violet2)" }}><Icon.Brain/></span>
              Diagnostic Output
            </div>
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--violet2)", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", padding: "2px 8px", borderRadius: 4 }}>AI Model · Live</span>
          </div>
          <div className="card-body">
            <AIOutput text={ai} compact={false}/>
          </div>
        </div>

        <div className="ai-stats-col">
          <div className="ai-stat-card">
            <div className="ai-stat-label">Risk Score</div>
            <div className="ai-stat-value" style={{ color: riskColor }}>{riskScore}<span style={{ fontSize: 14, color: "var(--t3)", fontWeight: 400 }}>/100</span></div>
            <div className="ai-stat-sub" style={{ color: riskScore >= 60 ? "var(--red2)" : riskScore >= 35 ? "var(--amber2)" : "var(--green2)" }}>
              {riskScore >= 60 ? "High Risk" : riskScore >= 35 ? "Medium Risk" : "Low Risk"}
            </div>
            <div className="ai-risk-bar">
              <div className="ai-risk-fill" style={{ width: `${riskScore}%`, background: riskColor }}/>
            </div>
          </div>

          <div className="ai-stat-card">
            <div className="ai-stat-label">CPU Load</div>
            <div className="ai-stat-value" style={{ color: getColor(metrics.cpu, 60, 85) }}>{metrics.cpu.toFixed(1)}<span style={{ fontSize: 14, color: "var(--t3)", fontWeight: 400 }}>%</span></div>
            <div className="ai-stat-sub">{metrics.cpu < 60 ? "Within normal range" : "Above threshold"}</div>
          </div>

          <div className="ai-stat-card">
            <div className="ai-stat-label">Memory Pressure</div>
            <div className="ai-stat-value" style={{ color: getColor(metrics.memory, 75, 90) }}>{metrics.memory.toFixed(1)}<span style={{ fontSize: 14, color: "var(--t3)", fontWeight: 400 }}>%</span></div>
            <div className="ai-stat-sub">Top: {topMem.name} ({topMem.memory.toFixed(1)}%)</div>
          </div>

          <div className="ai-stat-card">
            <div className="ai-stat-label">Processes Monitored</div>
            <div className="ai-stat-value">{processes.length}</div>
            <div className="ai-stat-sub">{processes.filter(p => p.cpu > 1).length} active, {processes.filter(p => p.cpu <= 1).length} idle</div>
          </div>

          <div className="ai-stat-card">
            <div className="ai-stat-label">Recommended Action</div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--cyan)", background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.15)", borderLeft: "3px solid var(--cyan)", borderRadius: "var(--r-sm)", padding: "8px 12px", marginTop: 8, lineHeight: 1.6 }}>
              ollama stop
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PAGE: SETTINGS
// ═══════════════════════════════════════════════════════════
function SettingsPage() {
  const [toggles, setToggles] = useState({ liveUpdates: true, aiAnalysis: true, notifications: false, darkMode: true, compactView: false });
  const [activeSection, setActiveSection] = useState("general");

  const toggle = k => setToggles(p => ({ ...p, [k]: !p[k] }));

  const sections = [
    { id: "general",   label: "General",        icon: Icon.Settings },
    { id: "monitor",   label: "Monitoring",      icon: Icon.Activity },
    { id: "alerts",    label: "Alert Rules",     icon: Icon.Bell },
    { id: "ai",        label: "AI Engine",       icon: Icon.Brain },
    { id: "account",   label: "Account",         icon: Icon.User },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <div className="page-title">Settings</div>
          <div className="page-subtitle">Configure monitoring preferences and alert thresholds</div>
        </div>
        <div className="page-actions">
          <button className="btn btn-ghost">Discard</button>
          <button className="btn btn-primary">Save Changes</button>
        </div>
      </div>

      <div className="settings-grid">
        <div>
          <div className="settings-nav">
            {sections.map(s => (
              <div key={s.id} className={`settings-nav-item${activeSection === s.id ? " active" : ""}`} onClick={() => setActiveSection(s.id)}>
                <span style={{ width: 16, height: 16, opacity: 0.7 }}><s.icon/></span>
                {s.label}
              </div>
            ))}
          </div>
        </div>

        <div className="settings-panel">
          {activeSection === "general" && (
            <>
              <div className="settings-group">
                <div className="settings-group-header">Display</div>
                <div className="settings-row">
                  <div><div className="settings-row-label">Dark Mode</div><div className="settings-row-desc">Use dark theme across the dashboard</div></div>
                  <div className={`toggle${toggles.darkMode ? " on" : ""}`} onClick={() => toggle("darkMode")}><div className="toggle-thumb"/></div>
                </div>
                <div className="settings-row">
                  <div><div className="settings-row-label">Compact View</div><div className="settings-row-desc">Reduce spacing for denser information display</div></div>
                  <div className={`toggle${toggles.compactView ? " on" : ""}`} onClick={() => toggle("compactView")}><div className="toggle-thumb"/></div>
                </div>
              </div>
              <div className="settings-group">
                <div className="settings-group-header">Data</div>
                <div className="settings-row">
                  <div><div className="settings-row-label">Refresh Interval</div><div className="settings-row-desc">How often metrics are fetched from the backend</div></div>
                  <select className="settings-select"><option>1s</option><option>2s</option><option>5s</option><option>10s</option></select>
                </div>
                <div className="settings-row">
                  <div><div className="settings-row-label">History Retention</div><div className="settings-row-desc">Sparkline history window</div></div>
                  <select className="settings-select"><option>30s</option><option>1m</option><option>5m</option><option>15m</option></select>
                </div>
              </div>
            </>
          )}

          {activeSection === "monitor" && (
            <div className="settings-group">
              <div className="settings-group-header">Monitoring</div>
              <div className="settings-row">
                <div><div className="settings-row-label">Live Updates</div><div className="settings-row-desc">Stream real-time metrics via WebSocket</div></div>
                <div className={`toggle${toggles.liveUpdates ? " on" : ""}`} onClick={() => toggle("liveUpdates")}><div className="toggle-thumb"/></div>
              </div>
              <div className="settings-row">
                <div><div className="settings-row-label">CPU Warning Threshold</div><div className="settings-row-desc">Trigger warning alert above this value</div></div>
                <input className="settings-input" defaultValue="60"/>
              </div>
              <div className="settings-row">
                <div><div className="settings-row-label">CPU Critical Threshold</div><div className="settings-row-desc">Trigger critical alert above this value</div></div>
                <input className="settings-input" defaultValue="85"/>
              </div>
              <div className="settings-row">
                <div><div className="settings-row-label">Memory Warning</div><div className="settings-row-desc">Memory warning threshold (%)</div></div>
                <input className="settings-input" defaultValue="75"/>
              </div>
              <div className="settings-row">
                <div><div className="settings-row-label">Memory Critical</div><div className="settings-row-desc">Memory critical threshold (%)</div></div>
                <input className="settings-input" defaultValue="90"/>
              </div>
            </div>
          )}

          {activeSection === "alerts" && (
            <div className="settings-group">
              <div className="settings-group-header">Alert Rules</div>
              <div className="settings-row">
                <div><div className="settings-row-label">Browser Notifications</div><div className="settings-row-desc">Show OS-level alerts for critical events</div></div>
                <div className={`toggle${toggles.notifications ? " on" : ""}`} onClick={() => toggle("notifications")}><div className="toggle-thumb"/></div>
              </div>
              <div className="settings-row">
                <div><div className="settings-row-label">Alert Sound</div><div className="settings-row-desc">Play audio on critical alerts</div></div>
                <select className="settings-select"><option>Off</option><option>Subtle</option><option>Loud</option></select>
              </div>
            </div>
          )}

          {activeSection === "ai" && (
            <div className="settings-group">
              <div className="settings-group-header">AI Engine</div>
              <div className="settings-row">
                <div><div className="settings-row-label">AI Analysis</div><div className="settings-row-desc">Enable live AI-powered diagnostics</div></div>
                <div className={`toggle${toggles.aiAnalysis ? " on" : ""}`} onClick={() => toggle("aiAnalysis")}><div className="toggle-thumb"/></div>
              </div>
              <div className="settings-row">
                <div><div className="settings-row-label">Analysis Interval</div><div className="settings-row-desc">How often AI re-analyzes system state</div></div>
                <select className="settings-select"><option>10s</option><option>30s</option><option>1m</option><option>5m</option></select>
              </div>
              <div className="settings-row">
                <div><div className="settings-row-label">WebSocket Endpoint</div><div className="settings-row-desc">AI analysis stream URL</div></div>
                <input className="settings-input" style={{ width: 200 }} defaultValue="ws://127.0.0.1:8000/ws/ai"/>
              </div>
            </div>
          )}

          {activeSection === "account" && (
            <div className="settings-group">
              <div className="settings-group-header">Account</div>
              <div className="settings-row">
                <div><div className="settings-row-label">Username</div></div>
                <input className="settings-input" style={{ width: 160 }} defaultValue="admin"/>
              </div>
              <div className="settings-row">
                <div><div className="settings-row-label">Host</div><div className="settings-row-desc">Monitored server hostname</div></div>
                <input className="settings-input" style={{ width: 160 }} defaultValue="localhost"/>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage]         = useState("dashboard");
  const [metrics, setMetrics]   = useState({ cpu: 9.3, memory: 85.3 });
  const [processes, setProcesses] = useState(INIT_PROCESSES);
  const [ai, setAi]             = useState(AI_TEXT);
  const now                     = useNow();

  // WebSocket connections
  useEffect(() => {
    const wsM = new WebSocket("ws://127.0.0.1:8000/ws/metrics");
    const wsP = new WebSocket("ws://127.0.0.1:8000/ws/processes");
    const wsA = new WebSocket("ws://127.0.0.1:8000/ws/ai");
    wsM.onmessage = e => { const d = JSON.parse(e.data); setMetrics(p => ({ ...p, cpu: d.cpu, memory: d.memory })); };
    wsP.onmessage = e => { const d = JSON.parse(e.data); if (d.processes?.length) setProcesses(d.processes); };
    wsA.onmessage = e => { const d = JSON.parse(e.data); if (d.analysis) setAi(d.analysis); };
    return () => { wsM.close(); wsP.close(); wsA.close(); };
  }, []);

  const activeAlerts = ALERT_RULES.filter(r => r.check(metrics, processes));

  return (
    <div className="app">
      <Sidebar page={page} setPage={setPage} alertCount={activeAlerts.length} metrics={metrics}/>
      <div className="main-area">
        <Topbar page={page} metrics={metrics} now={now}/>
        {page === "dashboard"  && <DashboardPage  metrics={metrics} processes={processes} ai={ai} alerts={activeAlerts}/>}
        {page === "processes"  && <ProcessesPage  processes={processes}/>}
        {page === "alerts"     && <AlertsPage     alerts={activeAlerts} metrics={metrics}/>}
        {page === "ai"         && <AIPage         ai={ai} metrics={metrics} processes={processes}/>}
        {page === "settings"   && <SettingsPage/>}
      </div>
    </div>
  );
}
