import "@/styles/globals.css";
import type { AppProps } from "next/app";
import SiteHeader from "../../components/site-header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen w-full">
      <SiteHeader />
      <div className="w-full sm:container">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
