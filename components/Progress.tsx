type ProgressProps = {
  value: number;
};

export function Progress({ value }: ProgressProps) {
  return (
    <div className="relative w-24 h-0.5 bg-zinc-800 group-hover:bg-zinc-900 transition-colors">
      <div
        className="absolute top-0 left-0 h-full transition-all ease-linear duration-[1200ms] bg-emerald-600"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
