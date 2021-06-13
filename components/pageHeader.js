import { Menu, X } from "react-feather";

import { LightGray } from "./typography";
import Navigation from "./navigation";
import { Button } from "./button";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const PageHeader = () => {
  const [menuShowing, setMenuShowing] = useState(false);
  return (
    <>
      <header className="text-2xl text-white font-scp bg-black bg-opacity-60 sticky backdrop-filter backdrop-blur-md top-0 right-0 left-0 px-4 py-3 w-screen shadow z-10">
        <div className="bg-red-60 max-w-3xl m-auto flex justify-between items-center">
          <h1 style={{ textShadow: "0 0 6px rgba(255, 255, 255, .75)" }}>
            Nick Radford
          </h1>
          <div className="inline-flex">
            <span className="hidden md:inline">
              <Navigation />
            </span>
            <span className="md:hidden">
              <Button onClick={() => setMenuShowing(!menuShowing)}>
                {menuShowing ? <X /> : <Menu />}
              </Button>
            </span>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {menuShowing && (
          <motion.div
            initial={{ top: "-200px" }}
            animate={{ top: "4rem" }}
            exit={{ top: "-200px" }}
            className="absolute text-primary bg-black bg-opacity-60 backdrop-filter backdrop-blur-md left-0 right-0 z-0 p-4 shadow md:hidden"
          >
            <Navigation />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PageHeader;
