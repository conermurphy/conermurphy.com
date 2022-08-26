import { Project } from '../types';

const projects: Project[] = [
  {
    isFeatured: true,
    title: 'Squares',
    description:
      "Whether it be an AWS project you need help with, or a frontend built out. I'm a full stack TypeScript developer and always open to discussing new opportunities or projects where I can help.",
    url: 'https://squares.so',
    githubUrl: 'https://github.com/conermurphy/squares',
    image: '/images/projects/squares-app-signin.png',
    technologies: ['JAVASCRIPT'],
  },
  {
    isFeatured: false,
    title: 'Murphy Wedding',
    description:
      "Whether it be documentation, explanations, or tutorials. I'm able to accomodate your needs and deliver high-quality technical articles that your platform and audience will love.",
    url: 'https://murphy.wedding',
    image: '/images/projects/murphy-wedding.png',
    technologies: ['JAVASCRIPT'],
  },
];

export default projects;
