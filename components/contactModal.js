import { CloseIcon } from "./closeIcon";

export const ContactModal = ({ visible, onModalHide }) => {
  const [isShowing, setIsShowing] = React.useState(false);

  React.useEffect(() => {
    setIsShowing(visible);
    if (visible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [visible]);

  if (!isShowing) {
    return null;
  }

  return (
    <div
      className="fixed top-0 right-0 left-0 h-full bg-black bg-opacity-50 z-50 md:justify-center md:grid "
      style={{ placeItems: "center" }}
      onClick={() => onModalHide()}
    >
      <div
        className="bg-gray-800 w-full h-full md:h-auto max-w-3xl md:rounded p-8 shadow-2xl lg:flex flex-col text-white overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between">
          <h1 className="border-b-4 fancy-border text-3xl inline-block">
            Contact Me 📧
          </h1>
          <button
            className="hover:bg-black transition duration-100 rounded-full w-12 flex bg-gray-900 justify-center hover:shadow-xl"
            title="Close contact form"
            onClick={() => onModalHide()}
          >
            <CloseIcon width={32} className="relative" style={{ top: 3 }} />
          </button>
        </header>
        <main className="mt-8 block">
          <aside className="prose">
            <p>Hi there!</p>
            <p>
              Before you fill out this contact form, please read over{" "}
              <a
                className="whitespace-no-wrap"
                target="_blank"
                href="https://standardresume.co/r/nickradford"
              >
                My Resume
              </a>
              , to ensure that your needs and my skills are at least somewhat
              aligned.
            </p>
          </aside>
          <div className="text-white flex flex-col text-xl mt-8">
            <input
              className="mb-2 px-3 py-2 rounded bg-gray-700 shadow-inner transition duration-100 focus:bg-gray-900"
              placeholder="Name"
            />
            <input
              className="mb-2 px-3 py-2 rounded bg-gray-700 shadow-inner transition duration-100 focus:bg-gray-900 "
              placeholder="Email address"
            />
            <input
              className="mb-2 px-3 py-2 rounded bg-gray-700 shadow-inner transition duration-100 focus:bg-gray-900 "
              placeholder="Subject"
            />
            <textarea
              className="mb-2 px-3 py-2 rounded bg-gray-700 shadow-inner transition duration-100 focus:bg-gray-900"
              rows={8}
              placeholder="Your message"
            ></textarea>
          </div>
        </main>
        <footer className="flex justify-end pt-8 mb-8 md:mb-0">
          <button className="contact-form-button">send email</button>
        </footer>
      </div>
    </div>
  );
};
