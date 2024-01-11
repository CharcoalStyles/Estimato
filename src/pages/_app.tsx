
import { AppProps } from 'next/app';
import {supabase} from "../util/supabase"
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import './globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return  <SessionContextProvider supabaseClient={supabase}><Component {...pageProps} /></SessionContextProvider>;
}

export default MyApp;
