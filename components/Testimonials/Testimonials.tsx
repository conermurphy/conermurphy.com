import React from 'react';
import Img from 'next/image';
import { Testimonial } from '../../types';
import ComponentWrapper from '../ComponentWrapper/ComponentWrapper';

interface IProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: IProps): JSX.Element {
  return (
    <ComponentWrapper
      data={{
        title: 'Testimonials',
      }}
    >
      <ul className="flex flex-col flex-wrap gap-12 w-full items-start justify-center xl:justify-start">
        {testimonials
          .slice(0, 3)
          .map(({ copy, quotee: { name, jobTitle, company, image } }, i) => {
            const alignLeft = i % 2 === 0;

            return (
              <li
                key={`${name.replace(/ /g, '-')}-${jobTitle.replace(
                  / /g,
                  '-'
                )}-${company.replace(/ /g, '-')}`}
              >
                <article
                  className={`relative flex ${
                    alignLeft
                      ? 'flex-row after:left-9'
                      : 'flex-row-reverse after:right-9'
                  } gap-12 w-full items-center justify-between bg-secondaryBg dark:bg-secondaryBgDark rounded-md px-12 py-10 after:content-[''] after:border-transparent after:border-t-secondaryBg after:dark:border-t-secondaryBgDark after:-bottom-10 after:border-[20px] after:absolute after:border-solid after:hidden after:lg:block`}
                >
                  <div className="relative h-full w-full max-w-[150px] rounded-2xl overflow-hidden drop-shadow-md">
                    <Img
                      src={image.src}
                      alt={name}
                      width="100%"
                      height="100%"
                      layout="responsive"
                      objectFit="cover"
                    />
                  </div>
                  <div
                    className={`flex flex-col gap-8 text-primaryText dark:text-primaryTextDark ${
                      alignLeft ? 'text-left' : 'text-right'
                    }`}
                  >
                    <p className="text-sm md:text-lg">{copy}</p>
                    <div
                      className={`flex flex-col ${
                        alignLeft ? 'justify-start' : 'justify-end'
                      }`}
                    >
                      <p className="text-xs sm:text-sm md:text-base font-bold opacity-100">
                        - {name}
                      </p>
                      <p className="text-xs md:text-sm">
                        {jobTitle} @ {company}
                      </p>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
      </ul>
    </ComponentWrapper>
  );
}
