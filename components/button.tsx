import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
};

function Button(props: ButtonProps) {
  return (
    <button
      className="flex items-center justify-center w-full gap-4 py-3 transition-colors rounded-xl bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export { Button };
