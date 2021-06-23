import Link from "next/link";

import { LinkButton } from "./button";
const Navigation = ({ className }) => {
  const classNames = `md:border-0 border-t border-primary border-opacity-70`;
  return (
    <div
      className={`md:grid md:grid-cols-4 gap-2 border-opacity-50 ${className}`}
    >
      <LinkButton additionalClasses={classNames} href="/client-work">
        Client Work
      </LinkButton>
      <LinkButton additionalClasses={classNames} href="/projects">
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
      >
        My Résumé
      </LinkButton>
      <LinkButton
        href="/contact"
        additionalClasses="md:border-0 border-t border-b border-primary border-opacity-70"
      >
        Contact Me
      </LinkButton>
    </div>
  );
};

export default Navigation;
