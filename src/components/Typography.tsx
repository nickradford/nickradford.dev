import classNames from "classnames";

export type TextProps = {
  children: React.ReactNode;
  className?: string;
};

export function Text(props: TextProps) {
  const classes = classNames(
    "max-w-[75ch] leading-relaxed text-zinc-700",
    "dark:text-zinc-300",
    props.className,
  );
  return <p className={classes}>{props.children}</p>;
}
