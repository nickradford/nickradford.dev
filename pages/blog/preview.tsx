import { useRouter } from "next/router";
import Image from "next/legacy/image";
import { Twitter } from "react-feather";
import { format } from "date-fns";

const Preview = () => {
  const router = useRouter();
  const { title, date, slug } = router.query;
  const d = new Date(date as string);

  return (
    <div
      className="text-white h-screen w-full flex flex-col justify-center p-12 pb-0 bg-gradient-to-br from-base to-crust"
    >
      <h1 className="font-scp text-8xl text-white flex-1 flex flex-col justify-center">
        <div>{title}</div>
        <p className="text-3xl text-gray-400 mt-4">{format(d, "PPPP")}</p>
      </h1>
      <footer className="left-4 flex items-end">
        <Image
          src="/me.png"
          width={240}
          height={240}
          layout="intrinsic"
          alt="It's a me, Nick Radford"
          className="flex-shrink-0 -mb-24"
        />
        <div className="block text-4xl font-scp pb-2 text-gray-400">
          <h2 className="text-5xl mb-2">Nick Radford</h2>
          <p className="text-3xl mb-6">nickradford.dev/{slug}</p>
          <p className="flex items-center text-3xl">
            <Twitter className="mr-4 mt-2 stroke-white fill-white" />
            <span>@nick_radford</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Preview;

export async function getServerSideProps() {
  return {
    props: {},
  };
}
