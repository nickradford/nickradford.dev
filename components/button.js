const buttonClasses =
  "font-scp bg-whit font-bold text-white hover:text-black px-2 py-2 block text-center hover:bg-primary transition-colors";

const LinkButton = ({
  children,
  href,
  additionalClasses = "",
  target = href.startsWith("/") ? "" : "_blank",
}) => (
  <a
    href={href}
    rel="noopener"
    target={target}
    className={`${buttonClasses} ${additionalClasses} `}
  >
    {children}
  </a>
);

const Button = ({ children, className = "", ...rest }) => (
  <button className={`${buttonClasses} ${className}`} {...rest}>
    {children}
  </button>
);

export { Button, LinkButton };
