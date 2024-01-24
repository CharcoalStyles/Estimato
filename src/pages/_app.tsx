
import { AppProps } from 'next/app';
import {getSupabase} from "../util/supabase"
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import './globals.css';
import { ADLaM_Display, Jost } from 'next/font/google'
 
const adlam = ADLaM_Display({
  weight: '400',
  display: 'swap',
  variable: '--font-adlam',
  subsets: ['latin']
})
 
const jost = Jost({
  weight: '600',
  display: 'swap',
  variable: '--font-jost',
  subsets:['latin-ext', 'latin']
})
 

function MyApp({ Component, pageProps }: AppProps) {
  return  <main className={`${adlam.variable} ${jost.variable}`}><SessionContextProvider supabaseClient={getSupabase()}><Component {...pageProps}/></SessionContextProvider></main>;
}

export default MyApp;
