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
    <div className="sticky top-0 z-20" ref={ref}>
      <div className="relative">
        <header className="text-2xl relative text-white font-scp bg-black bg-opacity-60 backdrop-filter backdrop-blur-md px-4 py-3 w-screen shadow z-10">
          <div className="max-w-3xl m-auto flex justify-between items-center">
            <Link href="/">
              <a className="" onClick={() => setMenuShowing(false)}>
                <h1 style={{ textShadow: "0 0 6px rgba(255, 255, 255, .75)" }}>
                  Nick Radford
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
              initial={{ top: "-200px" }}
              animate={{ top: "4rem" }}
              exit={{ top: "-200px" }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 38,
              }}
              className="absolute text-primary bg-black bg-opacity-60 backdrop-filter backdrop-blur-md left-0 right-0 z-0 shadow md:hidden text-xl"
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
