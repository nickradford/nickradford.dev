import { useCallback, useEffect, useRef, useState } from "react";

type ProgressProps = {
  value: number;
  animationDuration?: number;
  refId?: string;
  onProgressReset?: () => void;
};

export function Progress({
  value,
  animationDuration = 5000,
  refId,
  onProgressReset,
}: ProgressProps) {
  const bar = useRef<HTMLDivElement>();
  const [lastValue, setLastValue] = useState(0);

  const setWithDuration = useCallback(
    (value, duration = 0) => {
      console.log("setting", value, duration);
      const currentDuration = bar.current.style.transitionDuration;
      bar.current.style.transitionDuration = `${duration}ms`;
      bar.current.style.width = `${value}%`;
      return setTimeout(
        () => (bar.current.style.transitionDuration = currentDuration),
        100
      );
    },
    [bar]
  );

  useEffect(() => {
    // New song
    if (bar.current && refId) {
      console.log("resetting", refId);
      const timer = setWithDuration(0);
      onProgressReset?.();
      setLastValue(0);
      return () => clearTimeout(timer);
    }
  }, [refId]);

  useEffect(() => {
    // Progress update
    const percentageDifference = Math.abs(value - lastValue);

    if (percentageDifference > 20) {
      const timer = setWithDuration(value, 100);
      setLastValue(value);
      onProgressReset?.();
      return () => clearTimeout(timer);
    } else if (value > lastValue) {
      setLastValue(value);
    } else if (value < lastValue) {
      const timer = setWithDuration(value, 100);
      setLastValue(value);
      onProgressReset?.();
      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <div className="relative w-full h-0.5 bg-zinc-800 group-hover:bg-zinc-900 transition-colors">
      <div
        ref={bar}
        className="absolute top-0 left-0 h-full transition-all ease-linear bg-emerald-600"
        style={{
          width: `${value}%`,
          transitionDuration: `${animationDuration}ms`,
        }}
      />
    </div>
  );
}
