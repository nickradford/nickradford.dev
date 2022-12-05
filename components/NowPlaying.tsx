import classnames from "classnames";
import { useNowPlaying } from "@/hooks/useNowPlaying";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { Progress } from "./Progress";
import Image from "next/image";

export function NowPlaying() {
  const { nowPlaying, isLoading, isError } = useNowPlaying();
  const nowPlayingClasses = classnames(
    "opacity-0 transition-all flex items-center gap-3 duration-500 bg-transparent rounded-md px-2 group cursor-pointer relative",
    "hover:bg-zinc-800/75",
    {
      "opacity-100": !isLoading && !isError && nowPlaying.isPlaying,
    }
  );

  return (
    <div className={nowPlayingClasses}>
      <FontAwesomeIcon
        icon={faSpotify}
        className="text-emerald-600 "
        size="xl"
      />

      <div className="flex flex-col text-sm gap-0.5">
        <div>{nowPlaying.title}</div>
        <Progress value={nowPlaying.progress} />
      </div>

      <div className="absolute p-4 mb-4 space-y-2 transition-all duration-500 -translate-x-1/2 opacity-0 pointer-events-none left-1/2 bottom-full bg-zinc-800/50 backdrop-blur rounded-xl group-hover:opacity-100">
        <Image
          src={nowPlaying.albumImageUrl}
          width={nowPlaying.albumImageDimensions.width}
          height={nowPlaying.albumImageDimensions.height}
          alt={nowPlaying.album}
          unoptimized
          className="rounded-md min-w-[150px] max-w-[150px]"
        />
        <figcaption>
          <p className="text-sm text-zinc-200">{nowPlaying.album}</p>
          <p className="text-xs whitespace-nowrap">{nowPlaying.artist}</p>
        </figcaption>
      </div>
    </div>
  );
}
