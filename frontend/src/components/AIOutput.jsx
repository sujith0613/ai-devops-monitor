import { useEffect, useState, useRef } from "react";

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

export default function AIOutput({ text, compact = true }) {
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
