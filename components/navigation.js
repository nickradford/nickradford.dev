import Link from "next/link";

import { LinkButton } from "./button";
const Navigation = () => {
  return (
    <div className="md:grid md:grid-cols-4 gap-3 border-opacity-50">
      <LinkButton
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
      </LinkButton>
      <LinkButton
        additionalClasses="md:border-0 border-t border-primary border-opacity-70"
        href="https://standardresume.co/r/nickradford"
      >
        My Résumé
      </LinkButton>
      <Link href="/contact" passHref>
        <LinkButton
          additionalClasses="md:border-0 border-t border-b border-primary border-opacity-70"
          target={null}
        >
          Contact Me
        </LinkButton>
      </Link>
    </div>
  );
};

export default Navigation;
