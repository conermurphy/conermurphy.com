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
    <article className="flex flex-col gap-8 rounded-md p-6 border-4 border-text/10">
      <ProjectLanguages project={project} />

      <div className="relative w-full h-32 md:h-72 rounded-md overflow-hidden">
        <Img src={project.image} alt={project.title} fill />
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
