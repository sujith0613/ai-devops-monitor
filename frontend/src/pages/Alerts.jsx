import { Check, Download, AlertTriangle, CheckCircle } from "lucide-react";
import { SEVERITY_ICONS, SEV_CLASS, SEV_BG, SEV_ICON_COLOR } from "../constants";
import { GridBeam } from "../reactbits/GridBeam";
import GlareHover from "../reactbits/GlareHover";
import { TextureButton } from "../components/ui/texture-button";

export default function AlertsPage({ alerts, metrics }) {
  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <div className="page-title">Alert Center</div>
          <div className="page-subtitle">{alerts.length} alert{alerts.length !== 1 ? "s" : ""} currently active across all monitors</div>
        </div>
        <div className="page-actions">
          <TextureButton variant="secondary" size="sm"><Check size={14} strokeWidth={2.5}/> Mark all read</TextureButton>
          <TextureButton variant="secondary" size="sm"><Download size={14} strokeWidth={2.5}/> Export</TextureButton>
        </div>
      </div>

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

      <GridBeam strength={3}>
      <div className="alerts-full-list">
        {alerts.map((a, i) => {
          const SevIcon = SEVERITY_ICONS[a.severity] || AlertTriangle;
          return (
          <GlareHover className="alert-card" glareColor="rgba(255,255,255,0.03)" borderRadius="14px"><div style={{ borderLeftWidth: 3, borderLeftColor: SEV_ICON_COLOR[a.severity], borderLeftStyle: "solid", paddingLeft: 14, display: "flex", alignItems: "flex-start", gap: 14, width: "100%" }}>
            <div className="alert-card-icon" style={{ background: SEV_BG[a.severity], color: SEV_ICON_COLOR[a.severity] }}>
              <SevIcon size={18} strokeWidth={a.severity === "ok" ? 1.5 : 2.5}/>
            </div>
            <div className="alert-card-body">
              <div className="alert-card-header">
                <div className="alert-card-title">{a.title}</div>
                <span className={`alert-severity ${SEV_CLASS[a.severity]}`} style={{ flexShrink: 0 }}>{a.severity}</span>
              </div>
              <div className="alert-card-desc">{a.desc(metrics)}</div>
              <div className="alert-card-footer">
                <span className="alert-card-time">Triggered just now</span>
                <span className="alert-card-source">{a.source}</span>
              </div>
            </div>
          </div></GlareHover>
          );
        })}
        {alerts.length === 0 && (
          <div className="card"><div className="empty-state">
            <div className="empty-state-icon"><CheckCircle size={24} strokeWidth={1} style={{ color: "var(--green)" }}/></div>
            <div className="empty-state-title">No active alerts</div>
            <div className="empty-state-desc">All systems are operating within normal thresholds</div>
          </div></div>
        )}
      </div>
      </GridBeam>
    </div>
  );
}
