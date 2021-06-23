import Link from "next/link";
import { LinkButton } from "./button";

const noop = () => {};

const Navigation = ({ className, onClick = noop }) => {
  const classNames = `md:border-0 border-t border-primary border-opacity-70`;
  return (
    <div
      className={`md:grid md:grid-cols-4 gap-2 border-opacity-50 ${className}`}
    >
      <LinkButton
        additionalClasses={classNames}
        href="/client-work"
        onClick={onClick}
      >
        Client Work
      </LinkButton>
      <LinkButton
        additionalClasses={classNames}
        href="/projects"
        onClick={onClick}
      >
        Projects
      </LinkButton>
      {/* <LinkButton
        additionalClasses="md:border-0 border-t border-primary border-opacity-70"
        href="https://github.com/nickradford"
      >
        My Github
      </LinkButton>
      <LinkButton
        additionalClasses="md:border-0 border-t border-primary border-opacity-70"
        href="https://www.linkedin.com/in/nickradford"
      >
        My LinkedIn
      </LinkButton> */}
      <LinkButton
        additionalClasses={classNames}
        href="https://standardresume.co/r/nickradford"
        onClick={onClick}
      >
        My Résumé
      </LinkButton>
      <LinkButton
        href="/contact"
        additionalClasses="md:border-0 border-t border-b border-primary border-opacity-70"
        onClick={onClick}
      >
        Contact Me
      </LinkButton>
    </div>
  );
};

export default Navigation;
