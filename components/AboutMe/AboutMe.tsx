import React from 'react';
import Img from 'next/image';
import ComponentWrapper from '../ComponentWrapper/ComponentWrapper';
import NoScrollLink from '../NoScrollLink/NoScrollLink';

export default function AboutMe() {
  return (
    <ComponentWrapper
      data={{
        title: 'About Me',
      }}
    >
      <div className="flex flex-col-reverse md:flex-row justify-between gap-8">
        <div className="flex flex-col max-w-2xl gap-6 opacity-90 lg:text-lg">
          <p>
            Hello, I&apos;m Coner, a full-stack developer, freelancer, technical
            writer, and content creator from Norwich, UK.
          </p>
          <p>
            From my early teens, I&apos;ve always had a passion for technology
            and computers whether it be tinkering with websites and computers or
            playing games.
          </p>
          <p>
            And, ever since those early days, I&apos;ve always been involved
            with computers in some way whether it be building and managing them,
            gaming on them, or coding websites and applications.
          </p>
          <p>
            But, since 2019/20 I doubled down on development and have gained
            extensive experience in the JavaScript/TypeScript ecosystem which I
            leverage to build out exciting ideas and visions to solve real-world
            problems and challenges.
          </p>
          <p>
            Outside of development, I also do freelance technical writing for
            tech companies as well as create my own content on tech,
            productivity, and entrepreneurship to keep myself occupied.
          </p>
          <p>
            So, take a look at my projects and content to see what I&apos;m
            currently up to. And, if you have an idea you&apos;d like to work
            together on, make sure to
            <span className="font-bold text-accent">
              <NoScrollLink href="/contact"> get in touch.</NoScrollLink>
            </span>
          </p>
        </div>
        <div className="relative max-w-[400px] sm:max-w-[300px] lg:max-w-[400px] max-h-[400px] w-full h-full -rotate-2 border-accent border-8 lg:border-[12px] rounded-lg">
          <Img
            src="/self-portrait.png"
            layout="responsive"
            width="100%"
            height="100%"
            objectFit="contain"
            className="rotate-2 scale-105"
          />
        </div>
      </div>
    </ComponentWrapper>
  );
}
