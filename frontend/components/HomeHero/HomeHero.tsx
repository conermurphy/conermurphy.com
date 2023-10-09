import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Socials from '../Socials/Socials';

export default function HomeHero() {
  return (
    <section className="flex flex-col items-center w-full mt-24 z-20">
      <div className="max-w-sm sm:max-w-7xl flex flex-col w-full items-center justify-center gap-12 px-4">
        <Image
          src="/coner-murphy.jpg"
          height={120}
          width={120}
          priority
          alt="Selfie of Coner Murphy with a background of plants and bushes in a garden"
          className="drop-shadow-xl rounded-2xl"
        />

        <div className="flex flex-col max-w-5xl items-center text-center gap-12">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-3xl md:text-4xl">Coner Murphy</h1>
            <p className="text-lg md:text-xl">
              I&apos;m Coner, a full-stack developer, content creator, and indie
              hacker based in Norwich, UK 🇬🇧.
            </p>
          </div>
          <div className="flex flex-col gap-8 items-center">
            <Socials />
            <div className="flex flex-row gap-6 items-center">
              <Link
                href="/contact"
                className="font-heading font-bold text-lg border-2 border-solid border-text/90 py-3 px-4 rounded-lg"
              >
                Get In Touch
              </Link>
              <Link
                href="/blog"
                className="font-heading font-bold text-lg text-background bg-text/90 rounded-lg py-3 px-4"
              >
                Latest Posts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
