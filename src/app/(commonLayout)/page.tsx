import Head from "next/head";
import { Hero } from "@/components/modules/Home/Hero";
import { PopularDestinations } from "@/components/modules/Home/PopularDestinations";
import { TopRatedGuides } from "@/components/modules/Home/TopRatedGuides";
import { HowItWorks } from "@/components/modules/Home/HowItWorks";
import { Reviews } from "@/components/modules/Home/Reviews";
import CTA from "@/components/modules/Home/CTA";

export default function Home() {
  return (
    <>
      <Head>
        <title>Local Guide Platform - Discover Your City</title>
        <meta
          name="description"
          content="Connect with passionate guides who share authentic experiences, hidden gems, and the stories that make their cities come alive."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
        <PopularDestinations />
        <TopRatedGuides />
        <HowItWorks />
        <Reviews />
        <CTA />
      </main>
    </>
  );
}
