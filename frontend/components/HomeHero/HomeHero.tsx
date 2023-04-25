import React, { ReactElement } from 'react';
import Image from 'next/image';
import NoScrollLink from '../NoScrollLink/NoScrollLink';

export function HomeHeroWrapper({
  children,
}: {
  children: ReactElement;
}): JSX.Element {
  return (
    <section className="relative bg-[url('/grain.png')] bg-brand/40 py-32">
      <div className="absolute bottom-0 left-0 right-0 border-transparent border-x-[50vw] border-y-[10vh] border-b-background border-r-background z-10" />
      <div className="w-full flex items-center justify-center">{children}</div>
    </section>
  );
}

export default function HomeHero() {
  return (
    <HomeHeroWrapper>
      <div className="flex flex-row justify-between items-center w-full max-w-7xl z-20">
        <div className="max-w-md flex flex-col gap-6">
          <h1 className="text-5xl">Coner Murphy</h1>
          <p className="text-xl">
            Hey 👋, I&apos;m Coner, a full-stack developer, freelancer,
            technical writer, and content creator from Norwich, UK.
          </p>
          <div className="flex flex-row gap-6 items-center">
            <NoScrollLink
              href="/contact"
              className="font-heading font-extrabold text-lg"
            >
              Get In Touch
            </NoScrollLink>
            <NoScrollLink
              href="/blog"
              className="font-heading font-extrabold text-lg text-background bg-brand rounded-lg py-3 px-4"
            >
              Latest Posts
            </NoScrollLink>
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
