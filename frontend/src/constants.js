import { AlertTriangle, CheckCircle } from "lucide-react";

export const INIT_PROCESSES = [
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

export const SEVERITY_ICONS = { critical: AlertTriangle, warning: AlertTriangle, ok: CheckCircle };
export const SEV_CLASS = { critical: "sev-critical", warning: "sev-warning", ok: "sev-ok", info: "sev-info" };
export const SEV_BG    = { critical: "rgba(239,68,68,0.1)", warning: "rgba(245,158,11,0.1)", ok: "rgba(16,185,129,0.08)", info: "rgba(59,130,246,0.1)" };
export const SEV_ICON_COLOR = { critical: "var(--red)", warning: "var(--amber)", ok: "var(--green)", info: "var(--blue)" };

export const ALERT_RULES = [
  {
    id: "mem_crit",
    check: m => m.memory >= 90,
    severity: "critical",
    title: "Critical Memory Pressure",
    desc: m => `System memory at ${m.memory.toFixed(1)}% — nearing swap exhaustion. Immediate action required to prevent OOM kills.`,
    source: "Memory Monitor",
  },
  {
    id: "mem_warn",
    check: m => m.memory >= 75 && m.memory < 90,
    severity: "warning",
    title: "High Memory Utilization",
    desc: m => `Memory at ${m.memory.toFixed(1)}%. Multiple processes consuming significant heap. Monitor for further increase.`,
    source: "Memory Monitor",
  },
  {
    id: "cpu_crit",
    check: m => m.cpu >= 85,
    severity: "critical",
    title: "CPU Saturation",
    desc: m => `CPU at ${m.cpu.toFixed(1)}% — system throughput severely degraded. Identify runaway processes.`,
    source: "CPU Monitor",
  },
  {
    id: "cpu_warn",
    check: m => m.cpu >= 60 && m.cpu < 85,
    severity: "warning",
    title: "Elevated CPU Load",
    desc: m => `CPU at ${m.cpu.toFixed(1)}%. Sustained load may impact responsiveness. Review active processes.`,
    source: "CPU Monitor",
  },
  {
    id: "ollama",
    check: (_m, procs) => procs.some(p => p.name === "ollama.exe" && p.memory > 10),
    severity: "warning",
    title: "Idle AI Model Consuming RAM",
    desc: () => "ollama.exe holds an active model in memory while idle. Unloading would free ~2GB.",
    source: "Process Analyzer",
  },
  {
    id: "ok",
    check: m => m.cpu < 60 && m.memory < 75,
    severity: "ok",
    title: "All Systems Nominal",
    desc: () => "CPU and memory within healthy operating thresholds. No action required.",
    source: "Health Check",
  },
];

export const AI_TEXT = `**Short Summary:**
System is operating under sustained memory pressure with multiple heavyweight processes loaded simultaneously.

**Risk Level:**
Medium-High — memory at 85.3% with no clear headroom remaining.

**Top Cause:**
ollama.exe retains a loaded LLM in VRAM and system RAM despite being idle (13.3% RAM). Three concurrent Chrome renderer processes and three VS Code windows compound heap usage significantly.

**One Fix:**
Run \`ollama stop\` in terminal to unload the idle model. This reclaims approximately 2.1 GB, dropping memory utilization to ~72% — safely below warning threshold.`;
