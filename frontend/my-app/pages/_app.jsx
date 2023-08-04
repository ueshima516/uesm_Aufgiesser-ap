import { ProvideAuth } from "@/components/Cognito/UseAuth";
import { Noto_Sans_JP } from "next/font/google";
import '../styles/global.css';

const notojp = Noto_Sans_JP({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

function MyApp({ Component, pageProps }) {
  return (
    <div className={notojp.className}>
      <ProvideAuth>
        <Component {...pageProps} />
      </ProvideAuth>
    </div>
  );
}

export default MyApp;
