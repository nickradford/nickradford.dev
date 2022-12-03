import Image, { StaticImageData } from "next/image";

export type JobItemProps = {
  company: string;
  extraInfo?: string;
  img: StaticImageData;
  role: string;
  startDate: string;
  endDate: string;
};

export function JobItem(props: JobItemProps) {
  return (
    <li className="flex items-center gap-4">
      <div className="relative flex items-center justify-center flex-none w-10 h-10 mt-1 rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image
          src={props.img}
          className="rounded-full w-7 h-7"
          alt={`${props.company} logo`}
        />
      </div>
      <dl className="flex flex-wrap flex-auto gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="flex-none w-full text-sm font-medium text-zinc-100">
          {props.company}{" "}
          {props.extraInfo && (
            <span className="text-xs font-normal text-zinc-400">
              ({props.extraInfo})
            </span>
          )}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-400">{props.role}</dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="text-xs md:ml-auto text-zinc-500"
          aria-label="2021 until Present"
        >
          <time dateTime={props.startDate}>{props.startDate}</time>{" "}
          <span aria-hidden="true">—</span>{" "}
          <time dateTime={props.endDate}>{props.endDate}</time>
        </dd>
      </dl>
    </li>
  );
}
