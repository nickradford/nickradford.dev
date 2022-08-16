import { LinkButton } from "./button";

const Footer = () => (
  <footer className="text-text font-scp p-4 bg-crust bg-opacity-70 w-full pb-safe z-10">
    <div className="max-w-4xl m-auto grid grid-cols-3 items-center">
      <h4 className="text-lg col-span-2">© Nick Radford 2022</h4>
      <nav className="">
        <ul className="sm:grid grid-cols-2 gap-2 hidden">
          <li className="flex-1">
            <LinkButton href="https://www.linkedin.com/in/nickradford">
              LinkedIn
            </LinkButton>
          </li>
          <li className="flex-1">
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
