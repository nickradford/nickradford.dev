const LinkButton = ({
  children,
  href,
  additionalClasses = "",
  target = "_blank",
}) => (
  <a
    href={href}
    rel="noopener"
    target={target}
    className={`font-scp bg-white font-bold text-black px-2 py-2 block text-center ${additionalClasses}`}
    // style={{ boxShadow: "0 0 8px rgba(255, 255, 255, 0.5)" }}
  >
    {children}
  </a>
);

export default LinkButton;
