import React from 'react';
import Link from 'next/link';
import { Project } from '../../types';
import ComponentWrapper from '../ComponentWrapper/ComponentWrapper';
import ProjectCard from './components/ProjectCard';

interface IProps {
  projects: Project[];
}

export default function Projects({ projects }: IProps): JSX.Element {
  return (
    <ComponentWrapper>
      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-16 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col gap-4">
              <p className="text-lg md:text-xl text-brand font-heading font-extrabold">
                Work
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-text/90 sm:text-4xl">
                My Projects
              </h2>
              <p className="mt-1 text-base leading-7 text-text/75">
                Here are all of my existing projects and products I&apos;ve
                created. If you have any questions or want to talk about any of
                them, feel free to reach out!
              </p>
              <Link
                className="text-lg md:text-xl text-brand font-heading font-extrabold"
                href="/contact"
              >
                Get In Touch ➡️
              </Link>
            </div>
            <ul className="col-span-2 grid grid-cols-1 gap-12 lg:gap-20 lg:grid-cols-2">
              {projects.map((project) => (
                <li key={project.title} className="group">
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
}
