import classNames from "classnames";

export type TextProps = {
  children: React.ReactNode;
  className?: string;
};

const baseHeadingClasses = classNames(
  "font-plex font-semibold text-zinc-900 dark:text-zinc-100"
);

export function H1(props: TextProps) {
  const classes = classNames(
    baseHeadingClasses,
    "text-3xl tracking-tighter",
    "md:text-6xl md:leading-tight",
    props.className
  );
  return <h1 className={classes}>{props.children}</h1>;
}

export function H2(props: TextProps) {
  const classes = classNames(
    baseHeadingClasses,
    "text-3xl tracking-tight",
    props.className
  );
  return <h2 className={classes}>{props.children}</h2>;
}

export function H3(props: TextProps) {
  const classes = classNames(
    baseHeadingClasses,
    "text-xl tracking-tight text-zinc-800",
    props.className
  );
  return <h3 className={classes}>{props.children}</h3>;
}

export function Text(props: TextProps) {
  const classes = classNames(
    "max-w-[80ch] leading-8 text-zinc-500",
    "dark:text-zinc-400",
    props.className
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
