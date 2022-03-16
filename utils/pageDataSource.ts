import Services from '../content/services.json';

interface IProps {
  services?: boolean;
  blog?: boolean;
  testimonials?: boolean;
}

export default function pageDataSource({ services = false }: IProps) {
  const data = [];

  if (services) {
    data.push({ services: Services });
  }

  return data;
}
