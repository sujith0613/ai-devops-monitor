import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { INIT_PROCESSES, ALERT_RULES, AI_TEXT } from "./constants";
import { useNow } from "./helpers";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import DashboardPage from "./pages/Dashboard";
import ProcessesPage from "./pages/Processes";
import AlertsPage from "./pages/Alerts";
import AIPage from "./pages/AI";
import SettingsPage from "./pages/Settings";
import Grainient from "./reactbits/Grainient";
import ClickSpark from "./reactbits/ClickSpark";
import { TextureCardStyled } from "./components/ui/texture-card";
import "./App.css";

const pageVariants = {
  initial: { opacity: 0, y: 12, filter: "blur(2px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -8, filter: "blur(1px)" },
};

const PAGES_MAP = {
  dashboard: DashboardPage,
  processes: ProcessesPage,
  alerts: AlertsPage,
  ai: AIPage,
  settings: SettingsPage,
};

export default function App() {
  const [page, setPage]         = useState("dashboard");
  const [metrics, setMetrics]   = useState({ cpu: 9.3, memory: 85.3 });
  const [processes, setProcesses] = useState(INIT_PROCESSES);
  const [ai, setAi]             = useState(AI_TEXT);
  const now                     = useNow();

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
  const Page = PAGES_MAP[page];

  return (
    <ClickSpark sparkColor="#00d4ff" sparks={8} sparkSize={6}>
      <div className="app">
        <div className="grainient-bg"><Grainient color1="#FF9FFC" color2="#5227FF" color3="#B497CF" timeSpeed={0.25} grainAmount={0.06} warpStrength={1.0} warpFrequency={5.0} contrast={1.5} zoom={0.9}/></div>
        <Sidebar page={page} setPage={setPage} alertCount={activeAlerts.length} metrics={metrics}/>
        <div className="main-area">
          <Topbar page={page} metrics={metrics} now={now}/>
          <div className="page-wrap">
          <TextureCardStyled className="page-content-card">
            <div className="tc-inner-content">
            <AnimatePresence mode="wait">
              <motion.div key={page} variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }} style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
                <Page metrics={metrics} processes={processes} ai={ai} alerts={activeAlerts}/>
              </motion.div>
            </AnimatePresence>
            </div>
          </TextureCardStyled>
          </div>
        </div>
      </div>
    </ClickSpark>
  );
}
