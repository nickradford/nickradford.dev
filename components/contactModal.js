import { Formik, Form, Field, ErrorMessage } from "formik";
import yup from "yup";

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
        className="bg-gray-800 w-full h-full md:h-auto max-w-3xl md:rounded px-8 pt-8 shadow-2xl lg:flex flex-col text-white overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between">
          <h1 className="border-b-4 fancy-border text-3xl inline-block">
            Contact Me 📧
          </h1>
          <button
            className="hover:bg-black transition duration-100 rounded-full w-12 flex border-gray-400 border-2 hover:border-black justify-center hover:shadow-xl"
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
                my résumé
              </a>
              , to ensure that your needs and my skills are at least somewhat
              aligned.
            </p>
          </aside>
          <div className="text-white text-xl mt-8">
            <Formik
              initialValues={{ name: "", email: "", subject: "", message: "" }}
              onSubmit={async ({ message, ...values }, { setSubmitting }) => {
                const response = await fetch(
                  "https://api.nickradford.dev/api/sendmail",
                  {
                    method: "POST",
                    body: JSON.stringify({ ...values, feedback: message }),
                  }
                );

                if (response.ok) {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col">
                  <Field
                    name="name"
                    className="contact-form-input"
                    placeholder="Name"
                  />
                  <Field
                    name="email"
                    type="email"
                    className="contact-form-input"
                    placeholder="Email address"
                  />
                  <Field
                    name="subject"
                    className="contact-form-input"
                    placeholder="Subject"
                  />
                  <Field
                    as="textarea"
                    name="message"
                    className="contact-form-input"
                    placeholder="Your message"
                    rows={8}
                  />
                  <div className="flex justify-end mt-8 pb-8">
                    <button className="contact-form-button" type="submit">
                      send email
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </main>
      </div>
    </div>
  );
};
