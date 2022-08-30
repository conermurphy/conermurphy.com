import React from 'react';
import Img from 'next/image';
import { Project } from '../../../types';
import ProjectCardBody from './ProjectCardBody';
import ProjectLanguages from './ProjectLanguages';

interface IProps {
  project: Project;
}

export default function FeaturedProjectCard({ project }: IProps) {
  return (
    <article className="flex flex-col gap-6 rounded-md overflow-hidden bg-secondaryBg dark:bg-secondaryBgDark p-6">
      <div className="relative w-full h-72 rounded-md overflow-hidden">
        <Img
          src={project.image}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          objectPosition="top left"
          priority
        />
      </div>
      <div className="flex flex-col gap-4 justify-start">
        <div className="flex flex-row flex-wrap justify-between items-center">
          <h3 className="text-2xl font-bold border-b-4 pb-2 border-accent w-max">
            {project.title}
          </h3>
          <ProjectLanguages project={project} />
        </div>
        <ProjectCardBody project={project} />
      </div>
    </article>
  );
}
