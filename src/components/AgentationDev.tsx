import { useEffect, useState } from "react";
import type { ComponentType } from "react";

export default function AgentationDev() {
  const [Agentation, setAgentation] = useState<ComponentType | null>(null);

  useEffect(() => {
    if (import.meta.env.DEV) {
      import("agentation").then((mod) => {
        setAgentation(() => mod.Agentation);
      });
    }
  }, []);

  if (!Agentation) return null;
  return <Agentation />;
}
