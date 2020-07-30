import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { CloseIcon } from "./closeIcon";

const ContactFormSchema = Yup.object().shape({
  name: Yup.string().required("What should I call you?"),
  email: Yup.string()
    .email()
    .required("I need your email in order to respond 😊"),
  subject: Yup.string().required("What's this email concerning?"),
  message: Yup.string()
    .min(20, "Please have at least 20 characters in your message.")
    .required("I think you forgot a message 😇"),
});

const CustomErrorMessage = (props) => (
  <div
    className="bg-gray-900 text-yellow-100 px-3 py-2 text-sm rounded-b relative"
    style={{ top: -2 }}
    {...props}
  />
);

export const ContactModal = ({ visible, onModalHide }) => {
  const [isShowing, setIsShowing] = useState(false);
  const [sent, setSent] = useState(false);

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
          {sent ? (
            <div className="mb-8">
              <p>{sent.name}, thanks so much for your email!</p>
              <p>
                I'll be sure to get back to you at {sent.email} as soon as I
                can!
              </p>
            </div>
          ) : (
            <>
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
                  , to ensure that your needs and my skills are at least
                  somewhat aligned.
                </p>
              </aside>
              <div className="text-white text-xl mt-8">
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                  }}
                  validationSchema={ContactFormSchema}
                  onSubmit={async (
                    { message, ...values },
                    { setSubmitting }
                  ) => {
                    const response = await fetch(
                      "https://api.nickradford.dev/api/sendmail",
                      {
                        headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json",
                        },
                        method: "POST",
                        body: JSON.stringify({
                          ...values,
                          feedback: message,
                          from:
                            "NickRadford.Dev Contact Form<no-reply@nickradford.dev>",
                        }),
                      }
                    );

                    if (response.ok) {
                      setSubmitting(false);
                      setSent(values);
                    }
                  }}
                >
                  {({ isSubmitting, errors, touched, isValid, dirty }) => (
                    <Form className="flex flex-col">
                      <Field
                        name="name"
                        className="contact-form-input"
                        placeholder="Your name"
                      />
                      <ErrorMessage
                        name="name"
                        component={CustomErrorMessage}
                      />

                      <Field
                        name="email"
                        type="email"
                        className="contact-form-input"
                        placeholder="Email address"
                      />
                      <ErrorMessage
                        name="email"
                        component={CustomErrorMessage}
                      />

                      <Field
                        name="subject"
                        className="contact-form-input"
                        placeholder="Subject"
                      />
                      <ErrorMessage
                        name="subject"
                        component={CustomErrorMessage}
                      />

                      <Field
                        as="textarea"
                        name="message"
                        className="contact-form-input"
                        placeholder="Your message"
                        rows={8}
                      />
                      <ErrorMessage
                        name="message"
                        component={CustomErrorMessage}
                      />

                      <div className="flex justify-end mt-8 pb-8">
                        {isSubmitting ? (
                          <div>Sending your email!</div>
                        ) : (
                          <button
                            className="contact-form-button"
                            type="submit"
                            disabled={!dirty || !isValid}
                          >
                            send email
                          </button>
                        )}
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};
