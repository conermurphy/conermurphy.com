import { Testimonial } from '../types';
import Testimonial1 from './assets/testimonials/testimonial-1.jpg';
import Testimonial2 from './assets/testimonials/testimonial-2.jpg';
import Testimonial3 from './assets/testimonials/testimonial-3.jpg';
import Testimonial4 from './assets/testimonials/testimonial-4.jpg';

const testimonials: Testimonial[] = [
  {
    copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla arcu at facilisis dignissim arcu pretium tempus. Cras scelerisque urna amet sagittis donec arcu ipsum.',
    quotee: {
      name: 'Some Person 1',
      jobTitle: 'Job Title 1',
      company: 'Company',
      image: Testimonial1,
    },
  },
  {
    copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla arcu at facilisis dignissim arcu pretium tempus. Cras scelerisque urna amet sagittis donec arcu ipsum.  Cras scelerisque urna amet sagittis donec arcu ipsum.',
    quotee: {
      name: 'Some Person 2',
      jobTitle: 'Job Title 2',
      company: 'Company',
      image: Testimonial2,
    },
  },
  {
    copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla arcu at facilisis dignissim arcu pretium tempus',
    quotee: {
      name: 'Some Person 3',
      jobTitle: 'Job Title 3',
      company: 'Company',
      image: Testimonial3,
    },
  },
  {
    copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla arcu at facilisis dignissim arcu pretium tempus. Cras scelerisque urna amet sagittis donec arcu ipsum.  Cras scelerisque urna amet sagittis donec arcu ipsum. Cras scelerisque urna amet sagittis donec arcu ipsum.',
    quotee: {
      name: 'Some Person 4',
      jobTitle: 'Job Title 4',
      company: 'Company',
      image: Testimonial4,
    },
  },
];

export default testimonials;
