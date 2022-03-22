import React from 'react';
import Img from 'next/image';
import { Testimonial } from '../../types';

interface IProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: IProps): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center py-10 md:py-72 bg-primary">
      <section className="max-w-[272px] md:max-w-[1372px] md:px-20 lg:px-106">
        <h2 className="text-32 text-offWhite max-w-max md:text-40">
          What My Clients Say...
        </h2>
        <p className="text-lg mb-10 mt-2.5 lg:mt-1 md:text-2xl text-offWhite max-w-max">
          Don’t take my word for it.
        </p>
        <ul className="flex flex-col items-center justify-start flex-wrap gap-6 md:items-start md:flex-row xl:flex-nowrap">
          {testimonials.map(
            ({ copy, quotee: { name, jobTitle, company, image } }) => {
              return (
                <article
                  key={`${name.replaceAll(' ', '-')}-${jobTitle.replaceAll(
                    ' ',
                    '-'
                  )}-${company.replaceAll(' ', '-')}`}
                  className="flex flex-col gap-8 max-w-[272px] bg-offWhite rounded-xl p-4"
                >
                  <p className="w-[240px] text-sm">{copy}</p>
                  <div className="flex flex-row items-start gap-2">
                    <div className="relative h-[50px] w-[50px] rounded-lg overflow-hidden">
                      <div className="shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.10)] h-full w-full relative z-10" />
                      <Img src={image} alt={name} layout="fill" />
                    </div>
                    <div>
                      <p className="font-bold opacity-100">{name}</p>
                      <p className="text-sm">
                        {jobTitle} @ {company}
                      </p>
                    </div>
                  </div>
                </article>
              );
            }
          )}
        </ul>
      </section>
    </div>
  );
}
