import { LinkButton } from "./button";

const Footer = () => (
  <footer className="z-10 w-full p-4 text-text font-scp pb-safe bg-gradient-to-t from-crust">
    <div className="grid items-center max-w-4xl grid-cols-3 m-auto">
      <h4 className="col-span-2 text-lg">© Nick Radford 2022</h4>
      <nav className="">
        <ul className="flex justify-end gap-6">
          <li>
            <LinkButton href="https://hachyderm.io/@nickradford">
              Mastodon
            </LinkButton>
          </li>
          <li>
            <LinkButton href="https://www.linkedin.com/in/nickradford">
              LinkedIn
            </LinkButton>
          </li>
          <li>
            <LinkButton href="https://github.com/nickradford">
              GitHub
            </LinkButton>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
);

export default Footer;
