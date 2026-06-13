import { useState } from "react";
import { Settings, TrendingUp, Brain, User } from "lucide-react";
import BellIcon from "../components/BellIcon";
import { TextureButton } from "../components/ui/texture-button";
import GlareHover from "../reactbits/GlareHover";
import { GridBeam } from "../reactbits/GridBeam";

export default function SettingsPage() {
  const [toggles, setToggles] = useState({ liveUpdates: true, aiAnalysis: true, notifications: false, darkMode: true, compactView: false });
  const [activeSection, setActiveSection] = useState("general");

  const toggle = k => setToggles(p => ({ ...p, [k]: !p[k] }));

  const sections = [
    { id: "general",   label: "General",        icon: Settings },
    { id: "monitor",   label: "Monitoring",      icon: TrendingUp },
    { id: "alerts",    label: "Alert Rules",     icon: BellIcon },
    { id: "ai",        label: "AI Engine",       icon: Brain },
    { id: "account",   label: "Account",         icon: User },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <div className="page-title">Settings</div>
          <div className="page-subtitle">Configure monitoring preferences and alert thresholds</div>
        </div>
        <div className="page-actions">
          <TextureButton variant="minimal" size="sm">Discard</TextureButton>
          <TextureButton variant="primary" size="sm">Save Changes</TextureButton>
        </div>
      </div>

      <div className="settings-grid">
        <div>
          <div className="settings-nav">
            {sections.map(s => {
              const SecIcon = s.icon;
              return (
              <div key={s.id} className={`settings-nav-item${activeSection === s.id ? " active" : ""}`} onClick={() => setActiveSection(s.id)}>
                <span style={{ width: 16, height: 16, opacity: 0.7, display: "inline-flex", alignItems: "center" }}><SecIcon size={16}/></span>
                {s.label}
              </div>
            );
            })}
          </div>
        </div>

        <div className="settings-panel">
          <GridBeam strength={3}>
          {activeSection === "general" && (
            <>
              <GlareHover className="settings-group" glareColor="rgba(255,255,255,0.03)" borderRadius="14px">
                <div className="settings-group-header">Display</div>
                <div className="settings-row">
                  <div><div className="settings-row-label">Dark Mode</div><div className="settings-row-desc">Use dark theme across the dashboard</div></div>
                  <div className={`toggle${toggles.darkMode ? " on" : ""}`} onClick={() => toggle("darkMode")}><div className="toggle-thumb"/></div>
                </div>
                <div className="settings-row">
                  <div><div className="settings-row-label">Compact View</div><div className="settings-row-desc">Reduce spacing for denser information display</div></div>
                  <div className={`toggle${toggles.compactView ? " on" : ""}`} onClick={() => toggle("compactView")}><div className="toggle-thumb"/></div>
                </div>
              </GlareHover>
              <GlareHover className="settings-group" glareColor="rgba(255,255,255,0.03)" borderRadius="14px">
                <div className="settings-group-header">Data</div>
                <div className="settings-row">
                  <div><div className="settings-row-label">Refresh Interval</div><div className="settings-row-desc">How often metrics are fetched from the backend</div></div>
                  <select className="settings-select"><option>1s</option><option>2s</option><option>5s</option><option>10s</option></select>
                </div>
                <div className="settings-row">
                  <div><div className="settings-row-label">History Retention</div><div className="settings-row-desc">Sparkline history window</div></div>
                  <select className="settings-select"><option>30s</option><option>1m</option><option>5m</option><option>15m</option></select>
                </div>
              </GlareHover>
            </>
          )}

          {activeSection === "monitor" && (
            <GlareHover className="settings-group" glareColor="rgba(255,255,255,0.03)" borderRadius="14px">
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
            </GlareHover>
          )}

          {activeSection === "alerts" && (
            <GlareHover className="settings-group" glareColor="rgba(255,255,255,0.03)" borderRadius="14px">
              <div className="settings-group-header">Alert Rules</div>
              <div className="settings-row">
                <div><div className="settings-row-label">Browser Notifications</div><div className="settings-row-desc">Show OS-level alerts for critical events</div></div>
                <div className={`toggle${toggles.notifications ? " on" : ""}`} onClick={() => toggle("notifications")}><div className="toggle-thumb"/></div>
              </div>
              <div className="settings-row">
                <div><div className="settings-row-label">Alert Sound</div><div className="settings-row-desc">Play audio on critical alerts</div></div>
                <select className="settings-select"><option>Off</option><option>Subtle</option><option>Loud</option></select>
              </div>
            </GlareHover>
          )}

          {activeSection === "ai" && (
            <GlareHover className="settings-group" glareColor="rgba(255,255,255,0.03)" borderRadius="14px">
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
            </GlareHover>
          )}

          {activeSection === "account" && (
            <GlareHover className="settings-group" glareColor="rgba(255,255,255,0.03)" borderRadius="14px">
              <div className="settings-group-header">Account</div>
              <div className="settings-row">
                <div><div className="settings-row-label">Username</div></div>
                <input className="settings-input" style={{ width: 160 }} defaultValue="admin"/>
              </div>
              <div className="settings-row">
                <div><div className="settings-row-label">Host</div><div className="settings-row-desc">Monitored server hostname</div></div>
                <input className="settings-input" style={{ width: 160 }} defaultValue="localhost"/>
              </div>
            </GlareHover>
          )}
          </GridBeam>
        </div>
      </div>
    </div>
  );
}
