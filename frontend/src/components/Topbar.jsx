import { TextureCardStyled } from "../components/ui/texture-card";

export default function Topbar({ page, metrics, now }) {
  const labels = { dashboard:"Dashboard", processes:"Processes", alerts:"Alerts", ai:"AI Analysis", settings:"Settings" };
  const memHigh = metrics.memory >= 75;
  return (
    <header className="topbar">
      <TextureCardStyled>
        <div className="topbar-inner">
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
        </div>
      </TextureCardStyled>
    </header>
  );
}