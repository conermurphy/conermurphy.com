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
        title: 'What My Clients Say...',
        subTitle: 'Don’t take my word for it.',
      }}
    >
      <ul className="flex flex-col flex-wrap gap-6 md:flex-row w-full items-start justify-center">
        {testimonials
          .slice(0, 3)
          .map(({ copy, quotee: { name, jobTitle, company, image } }) => {
            return (
              <article
                key={`${name.replaceAll(' ', '-')}-${jobTitle.replaceAll(
                  ' ',
                  '-'
                )}-${company.replaceAll(' ', '-')}`}
                className="flex flex-col gap-8 h-full justify-between max-w-[272px] sm:max-w-[360px] bg-primaryBg rounded-lg px-8 py-6"
              >
                <p className="text-sm md:text-base">{copy}</p>
                <div className="flex flex-row items-center gap-2">
                  <div className="relative h-[50px] w-[50px] rounded-lg overflow-hidden">
                    <div className="shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.10)] h-full w-full relative z-10" />
                    <Img src={image} alt={name} layout="fill" />
                  </div>
                  <div>
                    <p className="text-sm md:text-base font-bold opacity-100">
                      {name}
                    </p>
                    <p className="text-xs md:text-sm">
                      {jobTitle} @ {company}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
      </ul>
    </ComponentWrapper>
  );
}
