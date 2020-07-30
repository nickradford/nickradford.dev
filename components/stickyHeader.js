import { useState } from "react";
import debounce from "lodash.debounce";

const StickyHeader = (props) => {
  const [visible, setVisible] = useState(false);
  if (process.browser) {
    const test = debounce(
      () => {
        // console.log(
        //   props.domRef.current && props.domRef.current.getBoundingClientRect()
        // );
        const refBounds = props.domRef.current.getBoundingClientRect();
        if (refBounds.top < props.threshold && !visible) {
          setVisible(true);
        } else if (refBounds.top >= props.threshold && visible) {
          setVisible(false);
        }
      },
      200,
      { maxWait: 200 }
    );

    document.addEventListener("scroll", test);
  }

  const extraClasses = [];
  if (visible) {
    extraClasses.push("opacity-1");
  } else {
    extraClasses.push("opacity-0 pointer-events-none");
  }

  return (
    <div
      className={`${extraClasses} fixed bg-white p-4 shadow-2xl top-0 left-0 right-0 transition duration-300 z-40 border-b-4 fancy-border`}
    >
      <div className="container flex justify-between items-center m-auto">
        <a className="text-2xl" href="/">
          NickRadford.dev{" "}
          <div className="wave inline-block text-xl md:text-3xl ml-2">👋</div>
        </a>
        <div className="flex">{props.children}</div>
      </div>
    </div>
  );
};

export default StickyHeader;
