import { Header } from "@/components/Header";
import {Session} from '@supabase/auth-helpers-react';
import Hero from "@/components/ui/Hero";

export default function Home() {
  return (
    <main className="h-screen pb-14 bg-right bg-cover w-screen">
      <Header />
      <div className="mt-10">
      <Hero
        image=""
        title="Get a handle on your estimates"
        subtitle="Doing estimates sucks. Track them, get insights from the community, and get better at one of the worst thing of software development."
      />
      </div>
    </main>
  );
}
