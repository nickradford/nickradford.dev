export default function Footer() {
  return (
    <footer className="z-10 flex flex-col items-center justify-between w-full gap-4 py-8 mt-8 border-t md:flex-row border-zinc-800/75">
      <ul className="flex gap-8 text-sm font-semibold text-zinc-400">
        <li>Mastodon</li>
        <li>GitHub</li>
      </ul>
      <span className="text-sm text-zinc-400">
        &copy; {new Date().getFullYear()} Nick Radford, All rights reserved.
      </span>
    </footer>
  );
}
