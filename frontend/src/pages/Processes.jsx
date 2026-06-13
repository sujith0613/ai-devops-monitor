import { useState } from "react";
import { RefreshCw, Search, Bot, Code, Globe, Database, Shield, Terminal } from "lucide-react";
import { getColor, getPillClass } from "../helpers";
import { GridBeam } from "../reactbits/GridBeam";
import SpotlightCard from "../reactbits/SpotlightCard";
import { TextureButton } from "../components/ui/texture-button";

const PROCESS_TYPE_ICONS = { AI: Bot, Dev: Code, Browser: Globe, DB: Database, Security: Shield, System: Terminal };

export default function ProcessesPage({ processes }) {
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
          <TextureButton variant="minimal" size="sm"><RefreshCw size={14} strokeWidth={2.5}/> Refresh</TextureButton>
        </div>
      </div>

      <div className="processes-toolbar">
        <div className="search-box">
          <Search size={14} strokeWidth={2.5} style={{ color: "var(--t3)" }}/>
          <input placeholder="Search by name or PID&hellip;" value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
        {filters.map(f => (
          <TextureButton key={f.id} variant="minimal" size="sm" className={`filter-pill-btn${filter === f.id ? " active" : ""}`} onClick={() => setFilter(f.id)}>
            {f.label}
          </TextureButton>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--t3)" }}>
          Sort:
          {["cpu","memory"].map(k => (
            <TextureButton key={k} variant="minimal" size="sm" className={`filter-pill-btn${sortKey === k ? " active" : ""}`} onClick={() => setSortKey(k)}>
              {k.toUpperCase()}
            </TextureButton>
          ))}
        </div>
      </div>

      <GridBeam strength={3}>
      <SpotlightCard className="card" spotlightColor="rgba(6,182,212,0.04)">
        <table className="proc-full-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Process Name</th>
              <th>PID</th>
              <th>Type</th>
              <th className={sortKey === "cpu" ? "sort-active sortable" : "sortable"} onClick={() => setSortKey("cpu")}>CPU &#x21D5;</th>
              <th className={sortKey === "memory" ? "sort-active sortable" : "sortable"} onClick={() => setSortKey("memory")}>RAM &#x21D5;</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7}><div className="empty-state"><div className="empty-state-icon"><Search size={24} strokeWidth={1} style={{ color: "var(--t3)" }}/></div><div className="empty-state-title">No processes found</div><div className="empty-state-desc">Try adjusting your search or filters</div></div></td></tr>
            ) : filtered.map((p, i) => (
              <tr className="proc-full-row" key={i}>
                <td className="proc-num">{String(i + 1).padStart(2, "0")}</td>
                <td>
                  <div className="proc-name-wrap">
                    <div className="proc-name-icon">
                      {(() => { const Pi = PROCESS_TYPE_ICONS[p.type] || Terminal; return <Pi size={14}/>; })()}
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
      </SpotlightCard>
      </GridBeam>
    </div>
  );
}
