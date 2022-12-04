import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import classnames from "classnames";

export function BackButton() {
  const router = useRouter();

  const containerClasses = classnames("sticky top-[22px] z-50");

  const backBtnClasses = classnames(
    "fixed bottom-8 right-0 mr-8 z-50 no-underline bg-black p-2 rounded-full border border-zinc-700  text-zinc-200 cursor-pointer hover:bg-zinc-700 transition-colors",
    "md:absolute md:top-0 md:left-0 md:bottom-auto md:right-auto md:bg-zinc-800/80 md:-translate-x-[calc(100%+2rem)]"
  );
  return (
    <div className={containerClasses}>
      <a className={backBtnClasses} onClick={() => router.back()}>
        <ArrowLeftIcon className="w-6 h-6" />
      </a>
    </div>
  );
}
