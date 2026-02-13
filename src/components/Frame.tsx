type Corner =
  | "all"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight";

type Props = {
  corners?: Corner[];
};

export default function Frame({ corners = ["top"] }: Props) {
  const set = new Set(corners);
  const showTopLeft =
    set.has("all") || set.has("top") || set.has("left") || set.has("topLeft");
  const showTopRight =
    set.has("all") || set.has("top") || set.has("right") || set.has("topRight");
  const showBottomLeft =
    set.has("all") ||
    set.has("bottom") ||
    set.has("left") ||
    set.has("bottomLeft");
  const showBottomRight =
    set.has("all") ||
    set.has("bottom") ||
    set.has("right") ||
    set.has("bottomRight");

  return (
    <div className="dark:text-zinc-700 text-white/40 z-10">
      {showTopLeft && (
        <svg
          className="absolute left-0 top-0 size-4 pointer-events-none -translate-x-1/2 -translate-y-1/2"
          viewBox="0 0 8 8"
        >
          <line
            x1="4"
            y1="0"
            x2="4"
            y2="8"
            stroke="currentColor"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="4"
            x2="8"
            y2="4"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      )}
      {showTopRight && (
        <svg
          className="absolute right-0 top-0 size-4 translate-x-1/2 -translate-y-1/2 pointer-events-none"
          viewBox="0 0 8 8"
        >
          <line
            x1="4"
            y1="0"
            x2="4"
            y2="8"
            stroke="currentColor"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="4"
            x2="8"
            y2="4"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      )}
      {showBottomLeft && (
        <svg
          className="absolute left-0 bottom-0 size-4 pointer-events-none -translate-x-1/2 translate-y-1/2"
          viewBox="0 0 8 8"
        >
          <line
            x1="4"
            y1="0"
            x2="4"
            y2="8"
            stroke="currentColor"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="4"
            x2="8"
            y2="4"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      )}
      {showBottomRight && (
        <svg
          className="absolute right-0 bottom-0 size-4 translate-x-1/2 translate-y-1/2 pointer-events-none"
          viewBox="0 0 8 8"
        >
          <line
            x1="4"
            y1="0"
            x2="4"
            y2="8"
            stroke="currentColor"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="4"
            x2="8"
            y2="4"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      )}
    </div>
  );
}
