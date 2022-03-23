import { servicesData, testimonialsData } from '../content';
import { Service, Testimonial } from '../types';

interface IProps {
  services?: boolean;
  blog?: boolean;
  testimonials?: boolean;
}

interface ReturnType {
  services: false | Service[];
  testimonials: false | Testimonial[];
}

export default function pageDataSource({
  services = false,
  testimonials = false,
}: IProps): ReturnType {
  return {
    services: services && servicesData,
    testimonials: testimonials && testimonialsData,
  };
}
