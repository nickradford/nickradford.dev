import { useRouter } from "next/router";

const buttonClasses =
  "font-scp font-bold  hover:text-black px-2 py-2 block text-center hover:bg-primary transition-colors";

const LinkButton = ({
  children,
  href,
  additionalClasses = "",
  target = href.startsWith("/") ? "" : "_blank",
}) => {
  const router = useRouter();
  const isActivePath =
    router.pathname === href
      ? "bg-primary text-black"
      : "bg-transparent text-white";
  return (
    <a
      href={href}
      rel="noopener"
      target={target}
      className={`${isActivePath} ${buttonClasses} ${additionalClasses} `}
    >
      {children}
    </a>
  );
};

const Button = ({ children, className = "", ...rest }) => (
  <button className={`bg-transparent ${buttonClasses} ${className}`} {...rest}>
    {children}
  </button>
);

export { Button, LinkButton };
