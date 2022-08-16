import Link from "next/link";
import { useRouter } from "next/router";

const buttonClasses =
  "font-scp font-bold hover:text-base px-2 py-2 block text-center hover:bg-red transition-colors rounded";

const LinkButton = ({
  children,
  href,
  className = "",
  target = href.startsWith("/") ? "" : "_blank",
  onClick = () => {},
}) => {
  const router = useRouter();
  const isActivePath =
    router.pathname === href
      ? "bg-red text-black"
      : "bg-transparent text-text";
  return (
    <Link href={href}>
      <a
        rel="noopener"
        target={target}
        className={`${isActivePath} ${buttonClasses} ${className}`}
        onClick={onClick}
      >
        {children}
      </a>
    </Link>
  );
};

const Button = ({ children, className = "", ...rest }) => (
  <button
    className={`bg-transparent ${buttonClasses} ${className} disabled:opacity-50`}
    {...rest}
    tabIndex={0}
  >
    {children}
  </button>
);

export { Button, LinkButton };
