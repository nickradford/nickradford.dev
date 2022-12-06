import { getNowPlaying } from "@/lib/spotify";

export default async function handler(req, res) {
  const data = await getNowPlaying();

  return res.status(200).json(data);
}
