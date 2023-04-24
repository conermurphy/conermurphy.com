import React from 'react';
import { Project } from '../../../types';
import ProjectCardBody from './ProjectCardBody';
import ProjectLanguages from './ProjectLanguages';

interface IProps {
  project: Project;
}

export default function ProjectCard({ project }: IProps) {
  return (
    <article className="flex flex-col gap-8 rounded-md p-6 border-4 border-text/10">
      <div className="flex flex-row flex-wrap gap-6 justify-between items-center">
        <ProjectLanguages project={project} />
      </div>
      <div className="flex flex-col gap-8 justify-start">
        <div className="flex flex-col gap-2">
          <h3 className="font-heading text-xl">{project.title}</h3>
          <p>{project.description}</p>
        </div>
        <ProjectCardBody project={project} />
      </div>
    </article>
  );
}
