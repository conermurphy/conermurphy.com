import React, { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function HomeHeroWrapper({
  children,
}: {
  children: ReactElement;
}): JSX.Element {
  return (
    <section className="relative bg-brand/40 py-6 lg:py-16">
      <div className="w-full flex items-center justify-center">{children}</div>
      <Image src="/grain.png" alt="" fill priority className="!h-auto" />
      <div className="absolute bottom-0 left-0 right-0 border-transparent border-x-[50vw] border-y-[10vh] border-b-background border-r-background" />
    </section>
  );
}

export default function HomeHero() {
  return (
    <HomeHeroWrapper>
      <div className="flex flex-col lg:flex-row justify-between items-center w-full max-w-7xl p-6 gap-8 z-20">
        <div className="max-w-xl lg:max-w-md flex flex-col gap-6 z-30">
          <h1 className="text-3xl md:text-5xl">Coner Murphy</h1>
          <p className="text-lg md:text-xl">
            Hey 👋, I&apos;m Coner, a full-stack developer, freelancer,
            technical writer, and content creator from Norwich, UK.
          </p>
          <div className="flex flex-row gap-6 items-center">
            <Link
              href="/contact"
              className="font-heading font-extrabold text-lg"
            >
              Get In Touch
            </Link>
            <Link
              href="/blog"
              className="font-heading font-extrabold text-lg text-background bg-brand rounded-lg py-3 px-4"
            >
              Latest Posts
            </Link>
          </div>
        </div>
        <Image
          src="/me.jpg"
          width={580}
          height={580}
          alt="Selfie of Coner Murphy with a background of plants and bushes in a garden"
          className="drop-shadow-2xl rounded-bl-[96px] rounded-tr-[96px]"
        />
      </div>
    </HomeHeroWrapper>
  );
}
