import classNames from "classnames";

export type TextProps = {
  children: React.ReactNode;
  className?: string;
};

const baseHeadingClasses = classNames(
  "font-geist-mono font-bold text-zinc-900 dark:text-zinc-50 transition-colors tracking-tight",
);

export function H1(props: TextProps) {
  const classes = classNames(
    baseHeadingClasses,
    "text-4xl md:text-5xl leading-tight",
    props.className,
  );
  return <h1 className={classes}>{props.children}</h1>;
}

export function H2(props: TextProps) {
  const classes = classNames(
    baseHeadingClasses,
    "text-2xl md:text-3xl leading-snug",
    props.className,
  );
  return <h2 className={classes}>{props.children}</h2>;
}

export function H3(props: TextProps) {
  const classes = classNames(
    baseHeadingClasses,
    "text-lg md:text-xl",
    props.className,
  );
  return <h3 className={classes}>{props.children}</h3>;
}

export function Text(props: TextProps) {
  const classes = classNames(
    "max-w-[75ch] leading-relaxed text-zinc-700",
    "dark:text-zinc-300",
    props.className,
  );
  return <p className={classes}>{props.children}</p>;
}

export function LightGray({ children }: TextProps) {
  return <span className="text-base text-gray-400">{children}</span>;
}

export function Bold({ children }: TextProps) {
  return (
    <span className="font-bold text-green whitespace-nowrap">{children}</span>
  );
}

export function Code({ children }: TextProps) {
  return (
    <span className="font-geist-mono text-sm text-yellow">{children}</span>
  );
}
