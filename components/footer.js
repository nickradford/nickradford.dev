import { LinkButton } from "./button";

const Footer = () => (
  <footer className="text-white font-scp p-4 bg-black bg-opacity-70 w-full">
    <span classname="pb-safe">
      <div className="max-w-3xl m-auto grid grid-cols-3 items-center">
        <h4 className="text-lg col-span-2">© Nick Radford 2021</h4>
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
    </span>
  </footer>
);

export default Footer;
