import { RefreshCw, Download, Brain } from "lucide-react";
import { getColor } from "../helpers";
import AIOutput from "../components/AIOutput";
import { TextureButton } from "../components/ui/texture-button";
import { GridBeam } from "../reactbits/GridBeam";
import GlareHover from "../reactbits/GlareHover";

export default function AIPage({ ai, metrics, processes }) {
  const topMem = processes.reduce((a, b) => b.memory > a.memory ? b : a, processes[0] || { memory: 0, name: "&mdash;" });
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
          <TextureButton variant="secondary" size="sm"><RefreshCw size={14} strokeWidth={2.5}/> Re-analyze</TextureButton>
          <TextureButton variant="accent" size="sm"><Download size={14} strokeWidth={2.5}/> Export Report</TextureButton>
        </div>
      </div>

      <div className="ai-page-grid">
        <GridBeam strength={3}>
        <GlareHover className="card" glareColor="rgba(255,255,255,0.03)" borderRadius="14px">
          <div className="card-header">
            <div className="card-title">
              <span className="card-title-icon" style={{ background: "rgba(139,92,246,0.1)", color: "var(--violet2)" }}><Brain size={14}/></span>
              Diagnostic Output
            </div>
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--violet2)", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", padding: "2px 8px", borderRadius: 4 }}>AI Model &middot; Live</span>
          </div>
          <div className="card-body">
            <AIOutput text={ai} compact={false}/>
          </div>
        </GlareHover>
        </GridBeam>

        <div className="ai-stats-col">
          <GlareHover className="ai-stat-card" glareColor="rgba(255,255,255,0.03)" borderRadius="14px">
            <div className="ai-stat-label">Risk Score</div>
            <div className="ai-stat-value" style={{ color: riskColor }}>{riskScore}<span style={{ fontSize: 14, color: "var(--t3)", fontWeight: 400 }}>/100</span></div>
            <div className="ai-stat-sub" style={{ color: riskScore >= 60 ? "var(--red2)" : riskScore >= 35 ? "var(--amber2)" : "var(--green2)" }}>
              {riskScore >= 60 ? "High Risk" : riskScore >= 35 ? "Medium Risk" : "Low Risk"}
            </div>
            <div className="ai-risk-bar">
              <div className="ai-risk-fill" style={{ width: `${riskScore}%`, background: riskColor }}/>
            </div>
          </GlareHover>

          <GlareHover className="ai-stat-card" glareColor="rgba(255,255,255,0.03)" borderRadius="14px">
            <div className="ai-stat-label">CPU Load</div>
            <div className="ai-stat-value" style={{ color: getColor(metrics.cpu, 60, 85) }}>{metrics.cpu.toFixed(1)}<span style={{ fontSize: 14, color: "var(--t3)", fontWeight: 400 }}>%</span></div>
            <div className="ai-stat-sub">{metrics.cpu < 60 ? "Within normal range" : "Above threshold"}</div>
          </GlareHover>

          <GlareHover className="ai-stat-card" glareColor="rgba(255,255,255,0.03)" borderRadius="14px">
            <div className="ai-stat-label">Memory Pressure</div>
            <div className="ai-stat-value" style={{ color: getColor(metrics.memory, 75, 90) }}>{metrics.memory.toFixed(1)}<span style={{ fontSize: 14, color: "var(--t3)", fontWeight: 400 }}>%</span></div>
            <div className="ai-stat-sub">Top: {topMem.name} ({topMem.memory.toFixed(1)}%)</div>
          </GlareHover>

          <GlareHover className="ai-stat-card" glareColor="rgba(255,255,255,0.03)" borderRadius="14px">
            <div className="ai-stat-label">Processes Monitored</div>
            <div className="ai-stat-value">{processes.length}</div>
            <div className="ai-stat-sub">{processes.filter(p => p.cpu > 1).length} active, {processes.filter(p => p.cpu <= 1).length} idle</div>
          </GlareHover>

          <GlareHover className="ai-stat-card" glareColor="rgba(255,255,255,0.03)" borderRadius="14px">
            <div className="ai-stat-label">Recommended Action</div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--t2)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "var(--r-sm)", padding: "8px 12px", marginTop: 8, lineHeight: 1.6 }}>
              ollama stop
            </div>
          </GlareHover>
        </div>
      </div>
    </div>
  );
}
