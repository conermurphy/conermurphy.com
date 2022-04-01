import { ICONS } from '../constants';
import { Service } from '../types';

const services: Service[] = [
  {
    title: 'Service Title 1',
    copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla arcu at facilisis dignissim arcu pretium tempus. Cras scelerisque urna amet sagittis donec arcu ipsum.',
    icon: ICONS.KEYBOARD.name,
  },
  {
    title: 'Service Title 2',
    copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla arcu at facilisis dignissim arcu pretium tempus. Cras scelerisque urna amet sagittis donec arcu ipsum.',
    icon: ICONS.CODE.name,
  },
  {
    title: 'Service Title 3',
    copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla arcu at facilisis dignissim arcu pretium tempus. Cras scelerisque urna amet sagittis donec arcu ipsum.',
    icon: ICONS.SOCIALS.name,
  },
];

export default services;
