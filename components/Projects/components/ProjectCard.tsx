import React from 'react';
import { Project } from '../../../types';
import Logo from '../../Logo/Logo';
import ProjectCardBody from './ProjectCardBody';
import ProjectLanguages from './ProjectLanguages';

interface IProps {
  project: Project;
}

export default function ProjectCard({ project }: IProps) {
  return (
    <article className="flex flex-col gap-6 rounded-md overflow-hidden bg-secondaryBg dark:bg-secondaryBgDark p-6">
      <div className="flex flex-row justify-between items-center">
        <Logo classes="w-12 h-12" />
        <ProjectLanguages project={project} />
      </div>
      <div className="flex flex-col gap-4 justify-start">
        <h3 className="text-xl font-bold border-b-4 pb-2 border-accent w-max">
          {project.title}
        </h3>
        <ProjectCardBody project={project} />
      </div>
    </article>
  );
}
