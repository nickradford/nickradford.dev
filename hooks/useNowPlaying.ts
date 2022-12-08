import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return await res.json();
};

type NowPlaying = {
  item: {
    id: string;
    album: {
      images: {
        height: number;
        url: string;
        width: number;
      }[];
      name: string;
    };
    artists: {
      name: string;
    }[];
    name: string;
    duration_ms: number;
    external_urls: { spotify: string };
  };
  is_playing: boolean;
  progress_ms: number;
  currently_playing_type: "track" | "episode";
};

export function useNowPlaying({
  interval = 2000,
  enabled = true,
}: { interval?: number; enabled?: boolean } = {}) {
  const {
    data: song,
    error,
    mutate: refetch,
  } = useSWR<NowPlaying>(enabled ? "/api/spotify" : null, fetcher, {
    refreshInterval: interval,
  });

  const isPlaying = song?.is_playing;
  const nowPlayingType = song?.currently_playing_type;
  const title = song?.item?.name;
  const artist = song?.item?.artists.map((_artist) => _artist.name).join(", ");
  const album = song?.item?.album.name;
  const albumImageUrl = song?.item?.album.images[0].url;
  const albumImageDimensions = {
    width: song?.item?.album.images[0].width,
    height: song?.item?.album.images[0].height,
  };
  const songUrl = song?.item?.external_urls.spotify;
  const currentProgress = song?.progress_ms;
  const duration = song?.item?.duration_ms;
  const progress = (currentProgress / duration) * 100;
  const id = song?.item?.id;

  return {
    nowPlaying: {
      isPlaying,
      nowPlayingType,
      title,
      artist,
      album,
      albumImageUrl,
      albumImageDimensions,
      songUrl,
      progress,
      id,
    },
    isLoading: !error && !song,
    isError: error,
    refetch,
  };
}
