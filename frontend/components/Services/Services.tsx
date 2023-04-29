import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Service } from '../../types';
import ComponentWrapper from '../ComponentWrapper/ComponentWrapper';
import FullStackDeveloperGraphic from '../Graphics/Fullstack-Developer';
import TechWriterGraphic from '../Graphics/Tech-Writer';
import VideoMakerGraphic from '../Graphics/Video-Maker';

interface IProps {
  services: Service[];
}

export default function Services({ services }: IProps): JSX.Element {
  const [activeService, setActiveService] = useState<Service>(services[0]);
  const [activeGraphic, setActiveGraphic] = useState<JSX.Element | null>(null);

  useEffect(() => {
    switch (activeService.title) {
      case 'Fullstack Developer':
        setActiveGraphic(<FullStackDeveloperGraphic />);
        break;
      case 'Technical Writer':
        setActiveGraphic(<TechWriterGraphic />);
        break;
      case 'Content Creator':
        setActiveGraphic(<VideoMakerGraphic />);
        break;
      default:
        break;
    }
  }, [activeService, services]);

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
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full justify-items-center items-center ">
        <ul className="max-w-md lg:max-w-2xl">
          {services.map((service) => (
            <motion.li
              key={service.title}
              className={`border-l-8 ${
                activeService.title === service.title
                  ? 'border-brand'
                  : 'border-text/10'
              } p-8 flex flex-col gap-2`}
            >
              <h3 className="font-heading font-extrabold text-text/90 text-xl lg:text-2xl">
                {service.title}
              </h3>
              <p className="md:text-lg">{service.copy}</p>
            </motion.li>
          ))}
        </ul>
        <div className="flex flex-row items-center justify-center h-64 w-64 lg:h-96 lg:w-96">
          {activeGraphic}
        </div>
      </div>
    </ComponentWrapper>
  );
}
