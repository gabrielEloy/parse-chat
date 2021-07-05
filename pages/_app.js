import "../styles/globals.css";
import { initializeParse } from "@parse/react-ssr";

initializeParse(
  "INSERT_YOUR_CUSTOM_URL_HERE",//custom url
  "INSERT_YOUR_APP_ID",//app id
  "INSERT_YOUR_JS_KEY"//js 
);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
