import { getNowPlaying } from "@/lib/spotify";

export default async function handler(req, res) {
  const resp = await getNowPlaying();

  const data = await resp.json();

  return res.status(resp.status).json(data);
}
