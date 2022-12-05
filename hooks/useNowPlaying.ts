import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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
};

export function useNowPlaying({ interval = 2000 }: { interval?: number } = {}) {
  const {
    data: song,
    error,
    mutate: refetch,
  } = useSWR<NowPlaying>("/api/spotify", fetcher, {
    refreshInterval: interval,
  });

  const isPlaying = song?.is_playing;
  const title = song?.item.name;
  const artist = song?.item.artists.map((_artist) => _artist.name).join(", ");
  const album = song?.item.album.name;
  const albumImageUrl = song?.item.album.images[0].url;
  const albumImageDimensions = {
    width: song?.item.album.images[0].width,
    height: song?.item.album.images[0].height,
  };
  const songUrl = song?.item.external_urls.spotify;
  const currentProgress = song?.progress_ms;
  const duration = song?.item.duration_ms;
  const progress = (currentProgress / duration) * 100;
  const id = song?.item.id;

  return {
    nowPlaying: {
      isPlaying,
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
