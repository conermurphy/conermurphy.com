import Image from 'next/image';
import React from 'react';

interface IProps {
  title: string;
  description?: string;
  tag?: string;
  is404Page?: boolean;
}

export default function PageHero({
  title,
  description,
  tag = '',
  is404Page = false,
}: IProps): JSX.Element {
  const pageDescription =
    description ||
    'Thoughts, stories, and actionable advice for creators, builders, entrepreneurs, and more straight to your inbox weekly.';

  return (
    <section className="relative bg-brand/40 py-16 md:pb-32 overflow-hidden">
      <div className="w-full flex items-center justify-center">
        <div className="flex flex-row justify-center items-center w-full max-w-7xl">
          <div className="flex flex-col items-center justify-center">
            <section className="flex flex-col gap-16 md:max-w-7xl w-full z-10">
              <div className="flex flex-col items-center gap-6">
                <p className="text-text bg-brand py-2 px-3 rounded-md font-heading font-extrabold">
                  {tag}
                </p>
                <div className="flex flex-col items-center text-center gap-4">
                  <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-text/90">
                    {title}
                  </h2>
                  <p className="text-lg md:text-xl max-w-xs md:max-w-lg">
                    {pageDescription}
                  </p>
                </div>
              </div>
              {is404Page ? (
                <p className="text-2xl">
                  Oops, that isn&apos;t a page. If you think this is a mistake,
                  please contact me below.
                </p>
              ) : null}
            </section>
            <Image src="/grain.png" alt="" fill priority />
          </div>
        </div>
      </div>
    </section>
  );
}
