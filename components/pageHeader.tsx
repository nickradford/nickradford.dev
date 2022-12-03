import { useState, useRef } from "react";
import useOnClickOutside from "use-onclickoutside";

const PageHeader = () => {
  const [menuShowing, setMenuShowing] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setMenuShowing(false));

  return (
    <div className="absolute top-0 z-20 w-full" ref={ref}>
      <nav className="flex justify-center">
        <ul className="flex gap-6 p-2 px-8 mt-6 text-sm border rounded-full shadow-md bg-zinc-800 border-zinc-700/75 ">
          <li>Home</li>
          <li>Blog</li>
          <li>Projects</li>
          <li>Contact</li>
        </ul>
      </nav>
    </div>
  );
};

export default PageHeader;
