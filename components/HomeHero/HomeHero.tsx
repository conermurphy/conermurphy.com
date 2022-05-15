import { useTheme } from 'next-themes';
import Link from 'next/link';
import React from 'react';
import TypewriterComponent from 'typewriter-effect';
import { HOME_TYPEWRITER_TEXT, TECHS } from '../../constants';
import { getIcon } from '../../utils';
import { HeaderBackground } from '../Header/components';

export default function HomeHero(): JSX.Element {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center bg-primaryBg dark:bg-primaryBgDark -mt-16">
      <HeaderBackground bg="bg-primaryBg dark:bg-primaryBgDark" />
      <section className="sm:max-w-[1372px] px-6 sm:px-20 w-full text-primaryText dark:text-primaryTextDark pb-10 sm:pb-72 pt-8 sm:pt-72">
        <p
          className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-5xl"
          data-testid="hey-text"
        >
          Hey, I&apos;m Coner Murphy 👋
        </p>
        <ul className="flex flex-row flex-wrap sm:flex-nowrap items-center gap-6 mb-8 mt-6 sm:mb-12 sm:mt-8">
          {TECHS.map((tech) => {
            return (
              <li key={`${tech}-icon`}>
                {getIcon({
                  icon: tech,
                  size: '32px',
                  color:
                    theme === 'light'
                      ? 'var(--primaryText)'
                      : 'var(--primaryTextDark)',
                })}
              </li>
            );
          })}
        </ul>
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl mt-6 sm:mt-12 min-h-[32px] sm:min-h-[40px] md:min-h-[48px] lg:min-h-[60px] xl:min-h-[72px] 2xl:min-h-[96px]">
          <TypewriterComponent
            options={{
              strings: HOME_TYPEWRITER_TEXT,
              autoStart: true,
              loop: true,
            }}
          />
        </h1>
        <div className="flex flex-row items-center mt-6 mb-8 sm:mb-72 sm:mt-12 gap-3">
          <p className="hidden md:flex flex-row items-center font-semibold text-[200px] opacity-100 max-h-[150px]">
            <span>&gt;</span>
            <span className="ml-[-50px]">&gt;</span>
          </p>
          <p className="text-base sm:text-xl lg:text-2xl">
            I&apos;m a TypeScript developer from the United Kingdom 🇬🇧. I
            regularly write technical articles and create content on social
            media around web development, content creation and running an online
            business to help others on their journies.
          </p>
        </div>
        <div className="flex flex-row items-center gap-x-4 sm:gap-x-10">
          <Link href="/contact" passHref>
            <a className="bg-primaryText dark:bg-primaryTextDark text-primaryBg dark:text-primaryBgDark text-base sm:text-xl rounded-lg py-3 px-7 sm:px-12 font-semibold">
              Hire Me
            </a>
          </Link>
          <Link href="/blog" passHref>
            <a className="text-base sm:text-xl font-semibold">
              Latest Blog Posts
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
