import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { EmailProvider } from "@/context/EmailContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ToastContainer limit={1} />
      <EmailProvider>
        <Component {...pageProps} />
      </EmailProvider>
      <Analytics />
    </>
  );
}
