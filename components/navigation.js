import Link from "next/link";

import { LinkButton } from "./button";
const Navigation = () => {
  return (
    <div className="text-base md:grid grid-cols-4 gap-3">
      <LinkButton href="https://github.com/nickradford">My Github</LinkButton>
      <LinkButton href="https://www.linkedin.com/in/nickradford">
        My LinkedIn
      </LinkButton>
      <LinkButton href="https://standardresume.co/r/nickradford">
        My Résumé
      </LinkButton>
      <Link href="/contact" passHref>
        <LinkButton target={null}>Contact Me</LinkButton>
      </Link>
    </div>
  );
};

export default Navigation;
