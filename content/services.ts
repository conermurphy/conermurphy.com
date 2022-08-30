import { ICONS } from '../constants';
import { Service } from '../types';

const services: Service[] = [
  {
    title: 'Fullstack Developer',
    copy: "Whether it's a new marketing website or a fullstack application you need built. As a fullstack web developer I'm able to take your ideas and make them a reality using the latest technologies.",
    icon: ICONS.CODE.name,
  },
  {
    title: 'Technical Writer',
    copy: "Regardless if it's documentation, explanations, or tutorials. I'm able to accomodate your needs and deliver high-quality technical articles that your platform and readers will love.",
    icon: ICONS.KEYBOARD.name,
  },
  {
    title: 'Content Creator',
    copy: 'Do you need content created for your brand account? Or, just want to get your product infront of an engaged audience? Regardless of your goals, social media can help you achieve them.',
    icon: ICONS.SOCIALS.name,
  },
];

export default services;
