import classnames from "classnames";
import { useNowPlaying } from "@/hooks/useNowPlaying";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { Progress } from "./Progress";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import Link from "next/link";
import { ExternalLink } from "./ExternalLink";

type NowPlayingProps = {
  interval?: number;
};
export function NowPlaying({ interval = 5000 }: NowPlayingProps) {
  const { nowPlaying, isLoading, isError, refetch } = useNowPlaying({
    interval,
  });
  const nowPlayingClasses = classnames(
    "opacity-0 transition-all flex items-center gap-3 duration-500 bg-transparent rounded-md px-2 group cursor-pointer relative border border-transparent",
    "hover:bg-zinc-800/75 hover:border-zinc-700/75",
    {
      "opacity-100": !isLoading && !isError && nowPlaying.isPlaying,
    }
  );

  useEffect(() => {
    const timer = setTimeout(refetch, interval / 2);
    return () => clearTimeout(timer);
  }, [nowPlaying.id]);

  if (isLoading || isError || !nowPlaying.isPlaying) return null;

  return (
    <div className={nowPlayingClasses}>
      <FontAwesomeIcon
        icon={faSpotify}
        className="text-emerald-600 "
        size="xl"
      />

      <ExternalLink
        href={nowPlaying.songUrl}
        className="flex flex-col text-sm gap-0.5 w-48"
      >
        <div>{nowPlaying.title}</div>
        <Progress
          value={nowPlaying.progress}
          animationDuration={interval}
          refId={nowPlaying.id}
        />
      </ExternalLink>

      <div className="absolute p-4 mb-4 space-y-2 transition-all duration-500 -translate-x-1/2 border opacity-0 pointer-events-none left-1/2 bottom-full bg-zinc-800/50 backdrop-blur rounded-xl group-hover:opacity-100 border-zinc-700/75">
        <Image
          src={nowPlaying.albumImageUrl}
          width={nowPlaying.albumImageDimensions.width}
          height={nowPlaying.albumImageDimensions.height}
          alt={nowPlaying.album}
          unoptimized
          className="rounded-md min-w-[150px] "
        />
        <figcaption>
          <p className="text-sm text-zinc-200">{nowPlaying.album}</p>
          <p className="text-xs whitespace-nowrap">{nowPlaying.artist}</p>
        </figcaption>
      </div>
    </div>
  );
}
