// import { useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { Send } from "react-feather";

// import { Button } from "../components/button";
// import Page from "../components/page";
// import { Bold } from "../components/typography";

// const ContactFormSchema = Yup.object().shape({
//   name: Yup.string().required("What should I call you?"),
//   email: Yup.string()
//     .email()
//     .required("I need your email in order to respond 😊"),
//   subject: Yup.string().required("What's this email concerning?"),
//   message: Yup.string()
//     .min(20, "Please have at least 20 characters in your message.")
//     .required("I think you forgot a message 😇"),
// });

// const CustomErrorMessage = (props) => (
//   <div
//     className="relative px-3 py-2 text-sm border-t border-b border-l border-r rounded-b text-red bg-crust font-scp border-surface0 peer-focus:border-surface1"
//     style={{ top: -2 }}
//     {...props}
//   />
// );

// export default function Contact() {
//   const [sent, setSent] = useState(false);

//   return (
//     <Page pageTitle="Contact">
//       <h1 className="mb-6 text-2xl font-scp">Contact Me</h1>
//       <p className="mb-2">
//         Hi! I&apos;m currently available for <Bold>Full Time Employment</Bold>{" "}
//         and <Bold>Freelance Projects</Bold>.
//       </p>
//       <p className="mb-2">
//         Please take a look at my Client Work, Projects, and Résumé to see if
//         your needs and my skills might be a match.
//       </p>

//       <Formik
//         initialValues={{
//           name: "",
//           email: "",
//           subject: "",
//           message: "",
//         }}
//         validationSchema={ContactFormSchema}
//         onSubmit={async ({ message, ...values }, { setSubmitting }) => {
//           const response = await fetch(
//             "https://api.nickradford.dev/api/sendmail",
//             {
//               headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//               },
//               method: "POST",
//               body: JSON.stringify({
//                 ...values,
//                 feedback: message,
//                 from: "NickRadford.Dev Contact Form<no-reply@nickradford.dev>",
//               }),
//             }
//           );

//           if (response.ok) {
//             setSubmitting(false);
//             setSent([true, values]);
//           }
//         }}
//       >
//         {({ isSubmitting, errors, touched, isValid, dirty, resetForm }) =>
//           sent[0] ? (
//             <div className="flex flex-col p-4 mt-8 text-lg bg-black bg-opacity-50 font-scp">
//               <div>
//                 Thanks for the email, {sent[1].name}, I&apos;ll get back to you
//                 as soon as I can!
//               </div>
//               <Button
//                 className="self-end w-full mt-4 border hover:border-primary sm:w-auto"
//                 onClick={() => {
//                   resetForm();
//                   setSent([false, sent[1]]);
//                 }}
//               >
//                 Send Another Email
//               </Button>
//             </div>
//           ) : (
//             <Form className="flex flex-col">
//               <div className="grid-cols-2 gap-2 sm:grid">
//                 <div className="flex flex-col">
//                   <Field
//                     name="name"
//                     className="contact-form-input peer"
//                     placeholder="Your name"
//                     autoComplete="name"
//                     autoFocus={true}
//                   />
//                   <ErrorMessage name="name" component={CustomErrorMessage} />
//                 </div>
//                 <div className="flex flex-col">
//                   <Field
//                     name="email"
//                     type="email"
//                     className="contact-form-input peer"
//                     placeholder="Email address"
//                   />
//                   <ErrorMessage name="email" component={CustomErrorMessage} />
//                 </div>
//               </div>

//               <Field
//                 name="subject"
//                 className="contact-form-input peer"
//                 placeholder="Subject"
//               />
//               <ErrorMessage name="subject" component={CustomErrorMessage} />

//               <Field
//                 as="textarea"
//                 name="message"
//                 className="contact-form-input peer"
//                 placeholder="Your message"
//                 rows={8}
//               />
//               <ErrorMessage name="message" component={CustomErrorMessage} />

//               <div className="flex justify-end pb-8 mt-8">
//                 {isSubmitting ? (
//                   <div className="font-scp">Sending your email...</div>
//                 ) : (
//                   <Button
//                     className={`border transition-all hover:border-green focus:bg-green focus:border-green hover:bg-green focus:text-black disabled:hover:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-white disabled:hover:text-white ${dirty && isValid && 'shadow shadow-lg shadow-green'}`}
//                     type="submit"
//                     disabled={!dirty || !isValid}
//                   >
//                     <Send className="inline" /> Send Email
//                   </Button>
//                 )}
//               </div>
//             </Form>
//           )
//         }
//       </Formik>
//     </Page>
//   );
// }
