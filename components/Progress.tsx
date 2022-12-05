import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";

type ProgressProps = {
  value: number;
  animationDuration?: number;
  refId?: string;
};

export function Progress({
  value,
  animationDuration = 5000,
  refId,
}: ProgressProps) {
  const bar = useRef<HTMLDivElement>();
  const [lastValue, setLastValue] = useState(0);

  const setWithDuration = useCallback(
    (value = 0, duration = 0) => {
      const currentDuration = bar.current.style.transitionDuration;
      bar.current.style.transitionDuration = `${duration}ms`;
      bar.current.style.width = `${value}%`;
      return setTimeout(
        () => (bar.current.style.transitionDuration = `${currentDuration}ms`),
        100
      );
    },
    [bar]
  );

  useEffect(() => {
    // New song
    if (bar.current && refId) {
      const timer = setWithDuration(0);
      setLastValue(0);
      return () => clearTimeout(timer);
    }
  }, [refId, setWithDuration]);

  useEffect(() => {
    // Progress update
    const percentageDifference = Math.abs(value - lastValue);

    if (percentageDifference > 20 || lastValue === 0) {
      const timer = setWithDuration(value, 100);
      setLastValue(value);
      return () => clearTimeout(timer);
    } else if (value > lastValue) {
      const timer = setWithDuration(value, animationDuration);
      setLastValue(value);
      return () => clearTimeout(timer);
    } else if (value < lastValue) {
      const timer = setWithDuration(value, 100);
      setLastValue(value);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationDuration, setWithDuration, value]);

  const containerClasses = classNames(
    "relative w-full h-0.5 transition-colors duration-500 shadow",
    "bg-zinc-400 group-hover:bg-zinc-100",
    "dark:bg-zinc-800 dark:group-hover:bg-zinc-900"
  );

  return (
    <div className={containerClasses}>
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
