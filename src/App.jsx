import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import Intro from "./components/Intro";
import "./App.scss";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : 4500;
    const timeoutId = window.setTimeout(() => setShowIntro(false), duration);

    return () => window.clearTimeout(timeoutId);
  }, []);

  if (showIntro) {
    return <Intro />;
  }

  return <Dashboard />;
}

export default App;
