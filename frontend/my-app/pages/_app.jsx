import { ProvideAuth } from "@/components/Cognito/UseAuth";

function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <Component {...pageProps} />
    </ProvideAuth>
  );
 }

 export default MyApp;
