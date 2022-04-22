import { ICONS } from '../constants';
import { Service } from '../types';

const services: Service[] = [
  {
    title: 'TypeScript Developer',
    copy: "Whether it be an AWS project you need help with, or a frontend built out. I'm a full stack TypeScript developer and always open to discussing new opportunities or projects where I can help.",
    icon: ICONS.CODE.name,
  },
  {
    title: 'Technical Writer',
    copy: "Whether it be documentation, explanations, or tutorials. I'm able to accomodate your needs and deliver high-quality technical articles that your platform and audience will love.",
    icon: ICONS.KEYBOARD.name,
  },
  {
    title: 'Content Creator',
    copy: 'Need content created for your brand? Or, want to get your product or service infront of an audience? I produce daily content on social media and make regular blog posts providing ample opportunities.',
    icon: ICONS.SOCIALS.name,
  },
];

export default services;
