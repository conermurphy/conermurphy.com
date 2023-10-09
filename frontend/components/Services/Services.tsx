import React from 'react';
import Link from 'next/link';
import { Service } from '../../types';
import ComponentWrapper from '../ComponentWrapper/ComponentWrapper';
import { getIcon } from '../../utils';

interface IProps {
  services: Service[];
}

export default function Services({ services }: IProps): JSX.Element {
  return (
    <ComponentWrapper>
      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-16 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col gap-4">
              <p className="text-lg md:text-xl text-brand font-heading font-extrabold">
                About Me
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-text/90 sm:text-4xl">
                How I Can Help You
              </h2>
              <p className="mt-1 text-base leading-7 text-text/75">
                Here are all the services I currently offer but if you require
                something not listed, please get in touch with me and I&apos;d
                be happy to have a conversation.
              </p>
              <Link
                className="text-lg md:text-xl text-brand font-heading font-extrabold"
                href="/contact"
              >
                Get In Touch ➡️
              </Link>
            </div>
            <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
              {services.map((service) => (
                <div key={service.name}>
                  <dt className="text-base font-semibold leading-7 text-text/90">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-text/90">
                      {getIcon({ icon: service.icon, color: 'white' })}
                    </div>
                    {service.name}
                  </dt>
                  <dd className="mt-1 text-base leading-7 text-text/75">
                    {service.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
}
