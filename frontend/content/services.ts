import { ICONS } from '../constants';
import { Service } from '../types';

const services: Service[] = [
  {
    name: 'Fullstack Developer',
    description:
      "Whether it's a new marketing website or a new SaaS product you need building. As a fullstack web developer, I'm able to take your ideas and make them a reality using the latest technologies.",
    icon: ICONS.FULLSTACK_DEV.name,
  },
  {
    name: 'Technical Writer',
    description:
      "Regardless if it's documentation, explanations, or tutorials. I'm able to accommodate your needs and deliver high-quality technical articles that your platform and readers will love.",
    icon: ICONS.TECH_WRITER.name,
  },
  {
    name: 'Content Creator',
    description:
      'Do you need content created for your product or service? Or, just want to get your product in front of an engaged audience? Regardless of your goals, I can help you achieve them with high-quality content.',
    icon: ICONS.CONTENT_CREATOR.name,
  },
];

export default services;
