export type HeadingProps = {
  children: React.ReactNode;
  className?: string;
};

export function H1(props: HeadingProps) {
  return (
    <h1 className="text-5xl font-semibold tracking-tight">{props.children}</h1>
  );
}

export function H2(props: HeadingProps) {
  return (
    <h2 className="text-3xl font-semibold tracking-tight">{props.children}</h2>
  );
}

export function H3(props: HeadingProps) {
  return (
    <h3 className="text-xl font-semibold tracking-tight">{props.children}</h3>
  );
}

export function LightGray({ children }: HeadingProps) {
  return <span className="text-base text-gray-400">{children}</span>;
}

export function Bold({ children }: HeadingProps) {
  return (
    <span className="font-bold text-green whitespace-nowrap">{children}</span>
  );
}
