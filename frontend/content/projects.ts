import { Project } from '../types';

const projects: Project[] = [
  {
    isFeatured: false,
    title: 'Squares',
    description:
      'As part of the Hashnode/PlanetScale hackathon in July 2022, I made Squares which is a GitHub analyitcs app to let people inspect their repos and commits in one central location.',
    url: 'https://squares.so',
    githubUrl: 'https://github.com/conermurphy/squares',
    image: '/images/projects/squares-app-signin.png',
    technologies: ['TAILWINDCSS', 'NEXTJS', 'PRISMA', 'PLANETSCALE'],
  },
  {
    isFeatured: true,
    title: 'Crossable',
    description:
      'Are you a blogger? Want to make cross-posting your work a breeze? Then Crossable is the app for you! Crossable allows you to cross-post your content to multiple platforms with ease.',
    url: 'https://crossable.io',
    image: '/images/projects/crossable.jpg',
    technologies: ['TAILWINDCSS', 'NEXTJS', 'AWS'],
  },
  {
    isFeatured: true,
    title: 'Harken',
    description:
      'Interested in seeing how your Spotify playlists change over time? Want to restore previous playlists? Or, just want to generate your own playlists using AI? Then Harken is the app for you!',
    url: 'https://harken.so',
    image: '/images/projects/harken.png',
    technologies: ['TAILWINDCSS', 'NEXTJS', 'AWS'],
  },
  {
    isFeatured: false,
    title: 'Murphy Wedding',
    description:
      "Getting married is an organisational nightmare so as a web developer I decided to make mine and my fiancée's life a bit easier by building a custom application for guests to manage their details through.",
    url: 'https://murphy.wedding',
    image: '/images/projects/murphy-wedding.png',
    technologies: ['TAILWINDCSS', 'NEXTJS', 'AWS'],
  },
];

export default projects;
