import { Header } from "@/components";
import { Text, Hero } from "@/components/ui";

export default function Home() {
  return (
    <main className="h-screen pb-14 bg-right bg-cover w-screen">
      <Header>
        <a
          className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
          href="#"
        >
          <Text fontSize="5xl" fontType="heading" tag="h1" variant="primary">
            Estomato
          </Text>
        </a>
      </Header>
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
