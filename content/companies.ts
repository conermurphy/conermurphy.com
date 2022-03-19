import * as fauna from './assets/companies/fauna-logo.svg';
import * as logrocket from './assets/companies/logrocket-logo.svg';
import * as prismic from './assets/companies/prismic-logo.svg';

type Company = {
  icon: typeof import('*.svg');
  alt: string;
};

const companies: Company[] = [
  { icon: fauna, alt: 'Fauna Logo' },
  { icon: logrocket, alt: 'LogRocket Logo' },
  { icon: prismic, alt: 'Prismic Logo' },
];

export default companies;
