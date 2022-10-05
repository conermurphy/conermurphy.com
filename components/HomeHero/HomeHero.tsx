import React from 'react';
import Logo from '../Logo/Logo';

export default function HomeHero() {
  return (
    <div className="flex flex-col items-center justify-center pt-6 md:pt-16 pb-16 md:pb-32 text-center overflow-x-hidden">
      <section className="flex flex-col items-center gap-24 md:gap-36 md:max-w-7xl px-6 md:px-0 w-full">
        <Logo classes="w-24 h-24" />
        <div className="flex flex-row gap-4 md:gap-8 items-center">
          <div className="flex flex-col gap-4 items-end">
            <div className="w-12 border-b-4 border-accent rounded-full" />
            <div className="w-12 border-b-4 border-secondaryBgDark dark:border-secondaryBg rounded-full mx-4" />
            <div className="w-12 border-b-4 border-accent rounded-full mx-8" />
            <div className="w-12 border-b-4 border-secondaryBgDark dark:border-secondaryBg rounded-full mx-4" />
            <div className="w-12 border-b-4 border-accent rounded-full" />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl tracking-wider uppercase">
            Web Dev<span className="text-accent">. </span>
            Tech<span className="text-accent">. </span>
            Productivity<span className="text-accent">.</span>
          </h1>
          <div className="flex flex-col gap-4 items-start">
            <div className="w-12 border-b-4 border-accent rounded-full" />
            <div className="w-12 border-b-4 border-secondaryBgDark dark:border-secondaryBg rounded-full mx-4" />
            <div className="w-12 border-b-4 border-accent rounded-full mx-8" />
            <div className="w-12 border-b-4 border-secondaryBgDark dark:border-secondaryBg rounded-full mx-4" />
            <div className="w-12 border-b-4 border-accent rounded-full" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl uppercase tracking-widest">Coner Murphy</h2>
          <div className="flex flex-row gap-4">
            <div className="w-6 border-b-4 border-accent rounded-full" />
            <div className="w-12 border-b-4 border-secondaryBgDark dark:border-secondaryBg rounded-full" />
            <div className="w-3 border-b-4 border-accent rounded-full" />
            <div className="w-12 border-b-4 border-secondaryBgDark dark:border-secondaryBg rounded-full" />
            <div className="w-6 border-b-4 border-accent rounded-full" />
          </div>
        </div>
      </section>
    </div>
  );
}
