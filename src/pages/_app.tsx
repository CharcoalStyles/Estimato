import { AppProps } from "next/app";
// import { getSupabase } from "../util/supabase";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import "./globals.css";
import { ADLaM_Display, Jost } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { supabaseAtom } from "@/util/supabase";

const queryClient = new QueryClient();

const adlam = ADLaM_Display({
  adjustFontFallback: false,
  weight: "400",
  display: "swap",
  variable: "--font-adlam",
  subsets: ["latin"],
});

const jost = Jost({
  weight: "600",
  display: "swap",
  variable: "--font-jost",
  subsets: ["latin-ext", "latin"],
});

function MyApp({ Component, pageProps }: AppProps) {
  const [supabase] = useAtom(supabaseAtom);
  return (
    <main className={`${adlam.variable} ${jost.variable}`}>
      <QueryClientProvider client={queryClient}>
        <SessionContextProvider supabaseClient={supabase}>
          <Component {...pageProps} />
        </SessionContextProvider>
      </QueryClientProvider>
    </main>
  );
}

export default MyApp;
