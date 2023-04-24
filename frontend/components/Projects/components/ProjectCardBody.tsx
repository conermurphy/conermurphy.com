import React from 'react';
import { Project } from '../../../types';
import { getIcon } from '../../../utils';
import { ICONS } from '../../../constants';

interface IProps {
  project: Project;
}

export default function ProjectCardBody({ project }: IProps) {
  return (
    <div className="grid grid-cols-8 gap-4 w-full">
      <a
        href={project.url}
        className={`flex flex-row items-center justify-center ${
          project.githubUrl ? 'col-span-7' : 'col-span-8'
        } bg-brand w-full p-3 rounded-sm`}
      >
        View Project
      </a>
      {project.githubUrl ? (
        <a
          href={project.githubUrl}
          className="flex flex-row items-center justify-center col-span-1 w-full p-3 rounded-sm bg-text/10"
        >
          {getIcon({ icon: ICONS.GITHUB.name, size: '24px' })}
        </a>
      ) : null}
    </div>
  );
}
