import { IdProvider } from "@radix-ui/react-id";
import type { AppProps } from "next/app";
import { globalCss } from "stitches.config";

const globalStyles = globalCss({
  "*, ::before, ::after": {
    boxSizing: "border-box",
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "currentColor"
  },
  html: {
    overflowX: "hidden"
  },
  body: {
    // https://uigradients.com/#CrimsonTide
    background: "linear-gradient(to right, #C6426E, #642B73)",
    color: "$text",
    fontFamily: "$default",
    minWidth: "360px",
    scrollBehavior: "smooth",
    margin: 0,
    padding: 0
  },
  "#__next": {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  }
});

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <IdProvider>
      <Component {...pageProps} />
    </IdProvider>
  );
}

export default MyApp;
