import React from 'react';
import { Project } from '../../../types';

interface IProps {
  project: Project;
}

export default function ProjectCardBody({ project }: IProps) {
  return (
    <>
      <p>{project.description}</p>
      <div className="grid grid-cols-2 gap-4 font-bold mt-8">
        <a
          href={project.url}
          className="flex flex-row items-center justify-center py-2 bg-primaryBgDark/90 rounded-sm border-2 border-transparent hover:border-accent duration-150 transition-all ease-in-out text-primaryTextDark"
        >
          View Project
        </a>
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            className="flex flex-row items-center justify-center py-2 bg-primaryBgDark/70 rounded-sm border-2 border-transparent hover:border-accent duration-150 transition-all ease-in-out text-primaryTextDark"
          >
            Source Code
          </a>
        ) : null}
      </div>
    </>
  );
}
