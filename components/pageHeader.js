import { Menu, X } from "react-feather";
import Link from "next/link";

import { LightGray } from "./typography";
import Navigation from "./navigation";
import { Button } from "./button";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useOnClickOutside from "use-onclickoutside";

const PageHeader = () => {
  const [menuShowing, setMenuShowing] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setMenuShowing(false));

  return (
    <div className="sticky top-0 z-20 w-full" ref={ref}>
      <div className="relative">
        <header className="text-2xl relative text-text bg-mantle inter font-thin px-4 py-3 w-full">
          <div className="max-w-4xl m-auto flex justify-between items-center relative">
            <Link href="/">
              <a className="" onClick={() => setMenuShowing(false)}>
                <h1>
                  Nick Radford
                  <span className="absolute top-0 font-scp font-bold whitespace-nowrap px-1 py-0.5 ml-2 text-xs bg-red text-black">for hire</span>
                </h1>
              </a>
            </Link>

            <Navigation className="hidden md:inline text-base" />
            <Button
              className="md:hidden"
              onClick={() => setMenuShowing(!menuShowing)}
            >
              {menuShowing ? <X /> : <Menu />}
            </Button>
          </div>
        </header>
        <AnimatePresence>
          {menuShowing && (
            <motion.div
              initial={{ top: "-300px" }}
              animate={{ top: "4rem" }}
              exit={{ top: "-300px" }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 38,
              }}
              className="absolute text-red bg-black bg-opacity-80 backdrop-filter backdrop-blur-md left-0 right-0 z-0 shadow md:hidden text-xl"
            >
              <Navigation
                onClick={() => {
                  setMenuShowing(false);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PageHeader;
