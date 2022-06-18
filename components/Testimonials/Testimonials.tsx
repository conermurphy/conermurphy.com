import React from 'react';
import Img from 'next/image';
import { motion } from 'framer-motion';
import { Testimonial } from '../../types';
import ComponentWrapper from '../ComponentWrapper/ComponentWrapper';
import { postComponent, viewportSettings } from '../../constants';

interface IProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: IProps): JSX.Element {
  return (
    <ComponentWrapper
      data={{
        title: 'Testimonials',
        subTitle: 'Don’t take my word for it.',
      }}
    >
      <ul className="flex flex-col flex-wrap gap-6 md:flex-row w-full items-start justify-center xl:justify-start">
        {testimonials
          .slice(0, 3)
          .map(({ copy, quotee: { name, jobTitle, company, image } }) => {
            return (
              <motion.li
                key={`${name.replace(/ /g, '-')}-${jobTitle.replace(
                  / /g,
                  '-'
                )}-${company.replace(/ /g, '-')}`}
                initial="offscreen"
                whileInView="onscreen"
                variants={postComponent}
                viewport={{ ...viewportSettings, amount: 0.2 }}
              >
                <article className="flex flex-col gap-8 h-full justify-between md:max-w-[425px] bg-primaryBg dark:bg-primaryBgDark rounded-lg px-8 py-6">
                  <p className="text-sm md:text-base">{copy}</p>
                  <div className="flex flex-row items-center gap-2">
                    <div className="relative w-full h-full max-w-[50px] rounded-lg overflow-hidden">
                      <div className="shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.10)] h-full w-full relative z-10" />
                      <Img
                        src={image.src}
                        alt={name}
                        width={50}
                        height={50}
                        layout="responsive"
                        objectFit="cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm md:text-base font-bold opacity-100">
                        {name}
                      </p>
                      <p className="text-xs md:text-sm">
                        {jobTitle} @ {company}
                      </p>
                    </div>
                  </div>
                </article>
              </motion.li>
            );
          })}
      </ul>
    </ComponentWrapper>
  );
}
