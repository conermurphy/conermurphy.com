import { Project } from '../types';

const projects: Project[] = [
  {
    isFeatured: true,
    title: 'Squares',
    description:
      'As part of the Hashnode/PlanetScale hackathon in July 2022, I made Squares which is a GitHub analyitcs app to let people inspect their repos and commits in one central location.',
    url: 'https://squares.so',
    githubUrl: 'https://github.com/conermurphy/squares',
    image: '/images/projects/squares-app-signin.png',
    technologies: ['TAILWINDCSS', 'NEXTJS', 'PRISMA', 'PLANETSCALE'],
  },
  {
    isFeatured: false,
    title: 'Murphy Wedding',
    description:
      "Getting married is an organisational nightmare so as a web developer I decided to make mine and my fiancée's life a bit easier by building a custom application for guests to manage their details through.",
    url: 'https://murphy.wedding',
    image: '/images/projects/murphy-wedding.png',
    technologies: ['TAILWINDCSS', 'NEXTJS', 'PRISMA', 'PLANETSCALE'],
  },
];

export default projects;
