import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Service } from '../../types';
import ComponentWrapper from '../ComponentWrapper/ComponentWrapper';
import { getIcon } from '../../utils';

interface IProps {
  services: Service[];
}

export default function Services({ services }: IProps): JSX.Element {
  const [activeService, setActiveService] = useState<Service>(services[0]);

  useEffect(() => {
    setInterval(() => {
      const currentServiceIndex = services.findIndex(
        (service) => service.title === activeService.title
      );

      const nextServiceIndex =
        currentServiceIndex + 1 > services.length - 1
          ? 0
          : currentServiceIndex + 1;

      setActiveService(services[nextServiceIndex]);
    }, 5000);
  }, [services, setActiveService, activeService]);

  return (
    <ComponentWrapper
      data={{
        title: 'What I Do',
        tag: 'About Me',
        description:
          'Lorem ipsum dolor sit amet consectetur. A arcu amet viverra et ullamcorper eget ac.',
      }}
    >
      <div className="flex flex-row items-center gap-12">
        <ul className="max-w-2xl">
          {services.map((service) => (
            <motion.li
              key={service.title}
              className={`border-l-8 ${
                activeService.title === service.title
                  ? 'border-brand'
                  : 'border-text/10'
              } p-8 flex flex-col gap-2`}
            >
              <h3 className="font-heading font-extrabold text-text/90 text-2xl">
                {service.title}
              </h3>
              <p className="text-lg">{service.copy}</p>
            </motion.li>
          ))}
        </ul>
        <div>{getIcon({ icon: activeService.icon, size: '200px' })}</div>
      </div>
    </ComponentWrapper>
  );
}
