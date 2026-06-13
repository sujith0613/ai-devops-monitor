import { useMemo } from "react";
import { motion } from "motion/react";
import { Cpu, Brain, RefreshCw, Download, Bot, Code, Globe, Database, Shield, Terminal, AlertTriangle } from "lucide-react";
import BellIcon from "../components/BellIcon";
import { getColor, getColorClass, getPillClass } from "../helpers";
import AnimatedValue from "../components/AnimatedValue";
import { SEVERITY_ICONS, SEV_CLASS, SEV_BG, SEV_ICON_COLOR } from "../constants";
import AIOutput from "../components/AIOutput";
import Sparkline from "../components/Sparkline";
import { GridBeam } from "../reactbits/GridBeam";
import GlareHover from "../reactbits/GlareHover";
import { TextureButton } from "../components/ui/texture-button";

const PROCESS_TYPE_ICONS = { AI: Bot, Dev: Code, Browser: Globe, DB: Database, Security: Shield, System: Terminal };

function mockHistory(current, points = 20) {
  const arr = [];
  let v = current;
  for (let i = points; i >= 0; i--) {
    v += (Math.random() - 0.5) * 4;
    v = Math.max(0, Math.min(100, v));
    arr.push(v);
  }
  arr[arr.length - 1] = current;
  return arr;
}

export default function DashboardPage({ metrics, processes, ai, alerts }) {
  const cpuC   = getColor(metrics.cpu, 60, 85);
  const memC   = getColor(metrics.memory, 75, 90);
  const topCpu = processes.reduce((a, b) => b.cpu > a.cpu ? b : a, processes[0] || { cpu: 0, name: "—" });
  const cpuHistory = useMemo(() => mockHistory(metrics.cpu), [metrics.cpu]);
  const memHistory = useMemo(() => mockHistory(metrics.memory), [metrics.memory]);

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <div className="page-title">System Overview</div>
          <div className="page-subtitle">Real-time performance metrics &amp; diagnostics</div>
        </div>
        <div className="page-actions">
          <TextureButton variant="minimal" size="sm"><RefreshCw size={14} strokeWidth={2.5}/> Refresh</TextureButton>
          <TextureButton variant="secondary" size="sm"><Download size={14} strokeWidth={2.5}/> Export</TextureButton>
        </div>
      </div>

      <motion.div className="kpi-grid" variants={{ animate: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } } }} initial="initial" animate="animate">
        <GlareHover glareColor="rgba(255,255,255,0.04)" borderRadius="18px">
          <motion.div className="kpi-card" variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
            <div className="kpi-label">
              <div className="kpi-label-dot" style={{ background: cpuC }}/>
              CPU Utilization
            </div>
            <div className="kpi-value" style={{ color: cpuC }}>
              <AnimatedValue value={metrics.cpu}/><span>%</span>
            </div>
            <div className="kpi-trend">
              <span className={getColorClass(metrics.cpu, 60, 85)}>
                {metrics.cpu < 60 ? "Healthy" : metrics.cpu < 85 ? "Elevated" : "Critical"}
              </span>
            </div>
            <div className="sparkline-wrap" style={{ padding: "8px 0 4px" }}>
              <Sparkline data={cpuHistory} color={cpuC} height={32}/>
            </div>
            <div className="kpi-bar-track">
              <div className="kpi-bar-fill" style={{ width: `${metrics.cpu}%`, background: cpuC }}/>
            </div>
          </motion.div>
        </GlareHover>

        <GlareHover glareColor="rgba(255,255,255,0.04)" borderRadius="18px">
          <motion.div className="kpi-card" variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
            <div className="kpi-label">
              <div className="kpi-label-dot" style={{ background: memC }}/>
              Memory Usage
            </div>
            <div className="kpi-value" style={{ color: memC }}>
              <AnimatedValue value={metrics.memory}/><span>%</span>
            </div>
            <div className="kpi-trend">
              <span className={getColorClass(metrics.memory, 75, 90)}>
                {metrics.memory < 75 ? "Healthy" : metrics.memory < 90 ? "High" : "Critical"}
              </span>
            </div>
            <div className="sparkline-wrap" style={{ padding: "8px 0 4px" }}>
              <Sparkline data={memHistory} color={memC} height={32}/>
            </div>
            <div className="kpi-bar-track">
              <div className="kpi-bar-fill" style={{ width: `${metrics.memory}%`, background: memC }}/>
            </div>
          </motion.div>
        </GlareHover>

        <GlareHover glareColor="rgba(255,255,255,0.04)" borderRadius="18px">
          <motion.div className="kpi-card" variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
            <div className="kpi-label">
              <div className="kpi-label-dot" style={{ background: "rgba(255,255,255,0.15)" }}/>
              Active Processes
            </div>
            <div className="kpi-value" style={{ color: "var(--blue2)" }}>
              <motion.span key={processes.length} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>{processes.length}</motion.span><span> procs</span>
            </div>
            <div className="kpi-trend text-muted">
              Top: <span style={{ color: "var(--t2)" }}>{topCpu.name}</span>
            </div>
            <div className="kpi-bar-track">
              <div className="kpi-bar-fill" style={{ width: `${(processes.length / 20) * 100}%`, background: "var(--blue)" }}/>
            </div>
          </motion.div>
        </GlareHover>

        <GlareHover glareColor="rgba(255,255,255,0.04)" borderRadius="18px">
          <motion.div className="kpi-card" variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
            <div className="kpi-label">
              <div className="kpi-label-dot" style={{ background: alerts.length > 1 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)" }}/>
              Active Alerts
            </div>
            <div className="kpi-value" style={{ color: alerts.length > 1 ? "var(--amber2)" : "var(--green2)" }}>
              <motion.span key={alerts.length} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>{alerts.length}</motion.span><span> alerts</span>
            </div>
            <div className="kpi-trend">
              <span className={alerts.length > 0 ? "text-warn" : "text-ok"}>
                {alerts.some(a => a.severity === "critical") ? "Critical active" : alerts.length > 0 ? "Warnings active" : "All clear"}
              </span>
            </div>
            <div className="kpi-bar-track">
              <div className="kpi-bar-fill" style={{ width: `${Math.min(alerts.length * 25, 100)}%`, background: alerts.length > 1 ? "var(--amber)" : "var(--green)" }}/>
            </div>
          </motion.div>
        </GlareHover>
      </motion.div>

      <motion.div className="dash-grid" variants={{ animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }} initial="initial" animate="animate">
        <motion.div className="dash-grid-left" variants={{ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
          <GridBeam strength={3}>
          <GlareHover className="card" glareColor="rgba(255,255,255,0.03)" borderRadius="14px">
            <div className="card-header">
              <div>
                <div className="card-title">
                  <span className="card-title-icon" style={{ background: "rgba(59,130,246,0.1)", color: "var(--blue2)" }}><Cpu size={14}/></span>
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
                          {(() => { const Pi = PROCESS_TYPE_ICONS[p.type] || Terminal; return <Pi size={14}/>; })()}
                        </div>
                        <div>
                          <div className="proc-name">{p.name}</div>
                          <div className="proc-pid">PID {p.pid} &middot; {p.type}</div>
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
          </GlareHover>
          </GridBeam>
        </motion.div>

        <motion.div className="dash-grid-right" variants={{ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}>
          <GlareHover className="card" glareColor="rgba(255,255,255,0.03)" borderRadius="14px">
            <div className="card-header">
              <div>
                <div className="card-title">
                   <span className="card-title-icon" style={{ background: "rgba(245,158,11,0.1)", color: "var(--amber2)" }}><BellIcon size={14} color="currentColor"/></span>
                  Active Alerts
                </div>
                <div className="card-subtitle">{alerts.length} alert{alerts.length !== 1 ? "s" : ""} firing</div>
              </div>
            </div>
            <div className="alert-list">
              {alerts.map((a, i) => {
                const SevIcon = SEVERITY_ICONS[a.severity] || AlertTriangle;
                return (
                  <div className="alert-item" key={i}>
                    <div className="alert-icon-wrap" style={{ background: SEV_BG[a.severity], color: SEV_ICON_COLOR[a.severity] }}>
                      <SevIcon size={16} strokeWidth={a.severity === "ok" ? 1.5 : 2.5}/>
                    </div>
                    <div className="alert-body">
                      <div className="alert-title">{a.title}</div>
                      <div className="alert-desc">{a.desc(metrics)}</div>
                      <div className="alert-meta">
                        <span className="alert-time">just now</span>
                        <span className={`alert-severity ${SEV_CLASS[a.severity]}`}>{a.severity}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlareHover>

          <GlareHover className="card" style={{ flex: 1 }} glareColor="rgba(255,255,255,0.03)" borderRadius="14px">
            <div className="card-header">
              <div>
                <div className="card-title">
                  <span className="card-title-icon" style={{ background: "rgba(139,92,246,0.1)", color: "var(--violet2)" }}><Brain size={14}/></span>
                  AI Diagnostics
                </div>
                <div className="card-subtitle">Live analysis</div>
              </div>
              <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--violet2)", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", padding: "2px 8px", borderRadius: 4 }}>AI &middot; Live</span>
            </div>
            <div className="ai-panel-body">
              <AIOutput text={ai} compact={true}/>
            </div>
          </GlareHover>
        </motion.div>
      </motion.div>
    </div>
  );
}
