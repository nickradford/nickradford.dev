import Image from "next/image";
import { useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import classnames from "classnames";

import { ExternalLink } from "./ExternalLink";
import { Progress } from "./Progress";

import { useNowPlaying } from "@/hooks/useNowPlaying";
import { useOnScreen } from "@/hooks/useOnScreen";

type NowPlayingProps = {
  interval?: number;
};
export function NowPlaying({ interval = 5000 }: NowPlayingProps) {
  const ref = useRef<HTMLDivElement>();
  const isOnScreen = useOnScreen(ref);
  const { nowPlaying, isError, refetch } = useNowPlaying({
    interval,
    enabled: isOnScreen,
  });
  const nowPlayingClasses = classnames(
    "transition-all flex items-center gap-3 duration-500 bg-transparent rounded-md px-2 group relative border border-transparent",
    "text-zinc-700",
    "dark:text-zinc-300"
  );

  const isPlayingClasses = classnames(
    `cursor-pointer`,
    "hover:bg-zinc-200/50 hover:shadow-md hover-border-zinc-300/75",
    "dark:hover:bg-zinc-800/75 dark:hover:border-zinc-700/75",
    {
      "opacity-100": !isError,
    }
  );

  useEffect(() => {
    const timer = setTimeout(refetch, interval / 2);
    return () => clearTimeout(timer);
  }, [interval, nowPlaying.id, refetch]);

  const classes = classnames(
    nowPlayingClasses,
    nowPlaying.isPlaying && isPlayingClasses
  );

  const SpotifyIcon = (
    <FontAwesomeIcon icon={faSpotify} className="text-emerald-600 " size="xl" />
  );

  const popoverClasses = classnames(
    "absolute p-4 mb-4 space-y-2 transition-all duration-500 -translate-x-1/2 translate-y-2 border opacity-0 pointer-events-none group-hover:translate-y-0 left-1/2 bottom-full backdrop-blur rounded-xl group-hover:opacity-100",
    "bg-zinc-200/50 text-zinc-700 border-zinc-300/75 shadow-lg",
    "dark:border-zinc-700/75 dark:bg-zinc-800/50 dark:text-zinc-200"
  );

  return (
    <div className={classes} ref={ref}>
      {nowPlaying.isPlaying ? (
        <>
          {SpotifyIcon}
          <ExternalLink
            href={nowPlaying.songUrl}
            className="flex flex-col text-sm gap-0.5 w-48"
          >
            <div className="truncate whitespace-nowrap">{nowPlaying.title}</div>
            <Progress
              value={nowPlaying.progress}
              animationDuration={interval}
              refId={nowPlaying.id}
            />
          </ExternalLink>

          <div className={popoverClasses}>
            <Image
              src={nowPlaying.albumImageUrl}
              width={nowPlaying.albumImageDimensions.width}
              height={nowPlaying.albumImageDimensions.height}
              alt={nowPlaying.album}
              unoptimized
              className="min-w-[256px] !w-64 rounded-md"
            />
            <figcaption>
              <p className="text-sm ">{nowPlaying.album}</p>
              <p className="text-xs whitespace-nowrap">{nowPlaying.artist}</p>
            </figcaption>
          </div>
        </>
      ) : (
        <>
          <FontAwesomeIcon
            icon={faSpotify}
            className="text-emerald-600 "
            size="xl"
          />
          <p>Not playing</p>
        </>
      )}
    </div>
  );
}
