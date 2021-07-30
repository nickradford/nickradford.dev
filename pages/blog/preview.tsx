import { useRouter } from "next/router";
import Image from "next/image";
import { Twitter } from "react-feather";

const Preview = () => {
  const router = useRouter();
  const { title, date, slug } = router.query;
  return (
    <div
      className="text-white h-screen w-full flex flex-col justify-center p-12 pb-0"
      style={{
        backgroundImage:
          "linear-gradient(200deg, rgba(171, 171, 171,0.05) 0%, rgba(171, 171, 171,0.05) 23%,rgba(90, 90, 90,0.05) 23%, rgba(90, 90, 90,0.05) 48%,rgba(65, 65, 65,0.05) 48%, rgba(65, 65, 65,0.05) 61%,rgba(232, 232, 232,0.05) 61%, rgba(232, 232, 232,0.05) 100%),linear-gradient(126deg, rgba(194, 194, 194,0.05) 0%, rgba(194, 194, 194,0.05) 11%,rgba(127, 127, 127,0.05) 11%, rgba(127, 127, 127,0.05) 33%,rgba(117, 117, 117,0.05) 33%, rgba(117, 117, 117,0.05) 99%,rgba(248, 248, 248,0.05) 99%, rgba(248, 248, 248,0.05) 100%),linear-gradient(144deg, rgba(64, 64, 64,0.05) 0%, rgba(64, 64, 64,0.05) 33%,rgba(211, 211, 211,0.05) 33%, rgba(211, 211, 211,0.05) 50%,rgba(53, 53, 53,0.05) 50%, rgba(53, 53, 53,0.05) 75%,rgba(144, 144, 144,0.05) 75%, rgba(144, 144, 144,0.05) 100%),linear-gradient(329deg, hsl(148,0%,0%),hsl(148,0%,0%))",
      }}
    >
      <h1 className="font-scp text-8xl text-primary flex-1 flex flex-col justify-center">
        <div>{title}</div>
        <p className="text-3xl text-gray-400 mt-4">{date}</p>
      </h1>
      <footer className=" left-4 flex items-end">
        <Image
          src="/me.png"
          width={240}
          height={240}
          layout="intrinsic"
          alt="It's a me, Nick Radford"
          className="flex-shrink-0"
        />
        <div className="block text-4xl font-scp pb-2 text-gray-200">
          <h2 className="text-5xl mb-2">Nick Radford</h2>
          <p className="text-3xl mb-6">nickradford.dev/{slug}</p>
          <p className="flex items-center text-3xl">
            <Twitter fill="" className="mr-4 mt-2" />
            <span>@nick_radford</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Preview;
