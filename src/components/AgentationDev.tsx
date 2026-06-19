import { useEffect, useState } from "react";
import type { ComponentType } from "react";

export default function AgentationDev() {
  const [Agentation, setAgentation] = useState<ComponentType | null>(null);

  useEffect(() => {
    let mounted = true;

    if (import.meta.env.DEV) {
      import("agentation").then((mod) => {
        if (mounted) {
          setAgentation(() => mod.Agentation);
        }
      });
    }

    return () => {
      mounted = false;
    };
  }, []);

  if (!Agentation) return null;
  return <Agentation />;
}
