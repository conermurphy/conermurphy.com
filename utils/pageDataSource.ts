import { servicesData, testimonialsData } from '../content';

interface IProps {
  services?: boolean;
  blog?: boolean;
  testimonials?: boolean;
}

export default function pageDataSource({
  services = false,
  testimonials = false,
}: IProps) {
  const data = [];

  if (services) {
    data.push({ services: servicesData });
  }

  if (testimonials) {
    data.push({ testimonials: testimonialsData });
  }

  return data;
}
