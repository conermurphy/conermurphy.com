import React from 'react';
import { Project } from '../../../types';
import ProjectLanguages from './ProjectLanguages';
import { getIcon } from '../../../utils';
import { ICONS } from '../../../constants';

interface IProps {
  project: Project;
}

export default function ProjectCard({ project }: IProps) {
  return (
    <article className="flex flex-col gap-8 w-full rounded-lg">
      <div className="flex flex-row gap-6 justify-between items-center">
        <ProjectLanguages project={project} />
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            className="flex flex-row items-center justify-center p-3 rounded-sm bg-text/10"
          >
            {getIcon({ icon: ICONS.GITHUB.name, size: '18px' })}
          </a>
        ) : null}
      </div>
      <div className="flex flex-col gap-6 justify-start">
        <div className="flex flex-col gap-2">
          <h3 className="font-heading text-xl">{project.title}</h3>
          <p>{project.description}</p>
        </div>
        <a
          href={project.url}
          className="flex flex-row gap-2 items-center font-bold hover:text-brand"
          rel="noreferrer noopener"
          target="_blank"
        >
          <span>{getIcon({ icon: ICONS.LINK.name, size: '14px' })}</span>
          {project.url}
        </a>
      </div>
    </article>
  );
}
