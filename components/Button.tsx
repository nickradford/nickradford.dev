import classNames from "classnames";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export function Button(props: ButtonProps) {
  const classes = classNames(
    "flex items-center justify-center w-full gap-4 py-3 transition-colors rounded-xl",
    "bg-zinc-200 text-zinc-700 hover:bg-zinc-300",
    "dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800"
  );
  return (
    <button className={classes} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
