import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="#ED5E93" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
