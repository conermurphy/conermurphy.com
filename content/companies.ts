import { Company } from '../types';
import * as fauna from './assets/companies/fauna-logo.svg';
import * as logrocket from './assets/companies/logrocket-logo.svg';
import * as prismic from './assets/companies/prismic-logo.svg';

const companies: Company[] = [
  { icon: fauna, alt: 'Fauna Logo', invertDark: false },
  { icon: logrocket, alt: 'LogRocket Logo', invertDark: false },
  { icon: prismic, alt: 'Prismic Logo', invertDark: true },
];

export default companies;
