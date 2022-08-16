import Link from "next/link";
import { LinkButton } from "./button";

const noop = () => {};

const Navigation = ({ className, onClick = noop }) => {
  const classNames = `md:border-0 border-t border-surface0`;
  return (
    <div
      className={`md:grid md:grid-cols-4 gap-2 border-opacity-50 ${className}`}
    >
      <LinkButton className={classNames} href="/client-work" onClick={onClick}>
        Client Work
      </LinkButton>
      <LinkButton className={classNames} href="/projects" onClick={onClick}>
        Projects
      </LinkButton>
      <LinkButton
        className={classNames}
        href="https://standardresume.co/r/nickradford"
        onClick={onClick}
      >
        My Résumé
      </LinkButton>
      <LinkButton
        className={`${classNames} sm:hidden`}
        href="https://github.com/nickradford"
      >
        My Github
      </LinkButton>
      <LinkButton
        className={`${classNames} sm:hidden`}
        href="https://www.linkedin.com/in/nickradford"
      >
        My LinkedIn
      </LinkButton>
      <LinkButton
        href="/contact"
        className={classNames}
        onClick={onClick}
      >
        Contact Me
      </LinkButton>
    </div>
  );
};

export default Navigation;
