import PageHeader from "./pageHeader";
import { LinkButton } from "./button";

export default function Page({ children }) {
  return (
    <>
      <div
        className="bg-gray-800 flex flex-col min-h-screen items-center"
        style={{
          backgroundImage:
            "linear-gradient(200deg, rgba(171, 171, 171,0.05) 0%, rgba(171, 171, 171,0.05) 23%,rgba(90, 90, 90,0.05) 23%, rgba(90, 90, 90,0.05) 48%,rgba(65, 65, 65,0.05) 48%, rgba(65, 65, 65,0.05) 61%,rgba(232, 232, 232,0.05) 61%, rgba(232, 232, 232,0.05) 100%),linear-gradient(126deg, rgba(194, 194, 194,0.05) 0%, rgba(194, 194, 194,0.05) 11%,rgba(127, 127, 127,0.05) 11%, rgba(127, 127, 127,0.05) 33%,rgba(117, 117, 117,0.05) 33%, rgba(117, 117, 117,0.05) 99%,rgba(248, 248, 248,0.05) 99%, rgba(248, 248, 248,0.05) 100%),linear-gradient(144deg, rgba(64, 64, 64,0.05) 0%, rgba(64, 64, 64,0.05) 33%,rgba(211, 211, 211,0.05) 33%, rgba(211, 211, 211,0.05) 50%,rgba(53, 53, 53,0.05) 50%, rgba(53, 53, 53,0.05) 75%,rgba(144, 144, 144,0.05) 75%, rgba(144, 144, 144,0.05) 100%),linear-gradient(329deg, hsl(148,0%,0%),hsl(148,0%,0%))",
        }}
      >
        <PageHeader />

        <main className="w-screen text-white px-4 py-6 md:px-0 flex flex-1 flex-col max-w-3xl">
          {children}
        </main>

        <footer className="text-white font-scp p-4 bg-black bg-opacity-70 w-full">
          <div className="max-w-3xl m-auto grid grid-cols-3 items-center">
            <h4 className="text-lg col-span-2">© Nick Radford 2021</h4>
            <nav className="">
              {/* <h4 className="text-lg font-bold border-b border-dashed mb-2 border-gray-400">
              Links
            </h4> */}
              <ul className="grid grid-cols-2 gap-2">
                <li className="flex-1">
                  <LinkButton href="https://www.linkedin.com/in/nickradford">
                    LinkedIn
                  </LinkButton>
                </li>
                <li className="flex-1">
                  <LinkButton href="https://github.com/nickradford">
                    GitHub
                  </LinkButton>
                </li>
              </ul>
            </nav>
          </div>
        </footer>
      </div>
    </>
  );
}
