import { getColor } from "../helpers";
import { TextureButton } from "../components/ui/texture-button";
import {
  TextureCardStyled,
  TextureSeparator,
} from "../components/ui/texture-card";
import { LayoutGrid, Cpu, BrainCircuit, Settings, Gauge } from "lucide-react";
import BellIcon from "./BellIcon";

const NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    section: "main",
    icon: <LayoutGrid size={18} strokeWidth={1.5}/>,
  },
  {
    id: "processes",
    label: "Processes",
    section: "main",
    icon: <Cpu size={18} strokeWidth={1.5}/>,
  },
  {
    id: "alerts",
    label: "Alerts",
    section: "main",
    badge: true,
    icon: <BellIcon size={18}/>,
  },
  {
    id: "ai",
    label: "AI Analysis",
    section: "main",
    icon: <BrainCircuit size={18} strokeWidth={1.5}/>,
  },
  {
    id: "settings",
    label: "Settings",
    section: "config",
    icon: <Settings size={18} strokeWidth={1.5}/>,
  },
];

export default function Sidebar({ page, setPage, alertCount, metrics }) {
  return (
    <aside className="sidebar">
      <TextureCardStyled>
        <div className="tc-inner-content">
          <div className="sb-brand">
            <div className="sb-brand-icon">
              <Gauge size={16} strokeWidth={1.5}/>
            </div>
            <div className="sb-brand-text">
              <span className="sb-brand-name">DevOps Monitor</span>
              <span className="sb-brand-sub">v2.4.1</span>
            </div>
          </div>

          <TextureSeparator />

          <nav className="sb-nav">
            <div className="sb-section-label">Main</div>
            {NAV_ITEMS.filter(n => n.section === "main").map(n => (
              <TextureButton key={n.id} variant="minimal" size="sm" className={`sb-nav-btn${page === n.id ? " active" : ""}`} onClick={() => setPage(n.id)}>
                {n.icon}
                {n.label}
                {n.badge && alertCount > 0 && <span className="sb-item-badge">{alertCount}</span>}
              </TextureButton>
            ))}
            <div className="sb-section-label">Config</div>
            {NAV_ITEMS.filter(n => n.section === "config").map(n => (
              <TextureButton key={n.id} variant="minimal" size="sm" className={`sb-nav-btn${page === n.id ? " active" : ""}`} onClick={() => setPage(n.id)}>
                {n.icon}
                {n.label}
              </TextureButton>
            ))}
          </nav>

          <TextureSeparator />

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
        </div>
      </TextureCardStyled>
    </aside>
  );
}
