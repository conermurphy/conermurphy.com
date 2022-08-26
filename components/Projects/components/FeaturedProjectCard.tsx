import React from 'react';
import Img from 'next/image';
import { Project } from '../../../types';
import { TOPICS } from '../../../constants';

interface IProps {
  project: Project;
}

export default function FeaturedProjectCard({ project }: IProps) {
  return (
    <article className="flex flex-col gap-4 rounded-md overflow-hidden bg-secondaryBg dark:bg-secondaryBgDark p-4">
      <div className="relative w-full h-64 rounded-md overflow-hidden">
        <Img
          src={project.image}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          objectPosition="top left"
          priority
        />
      </div>
      <div className="">
        <h3 className="text-xl">{project.title}</h3>
        {project.technologies.map((tech) => {
          const { name } = TOPICS[tech];

          return <p key={name}>{name}</p>;
        })}
      </div>
    </article>
  );
}
