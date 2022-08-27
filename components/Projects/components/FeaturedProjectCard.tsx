import React from 'react';
import Img from 'next/image';
import { Project } from '../../../types';
import { TOPICS } from '../../../constants';
import { getIcon } from '../../../utils';

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
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-2xl font-bold border-b-4 pb-2 border-accent w-max">
            {project.title}
          </h3>
          <div className="flex flex-row gap-4">
            {project.technologies.map((tech) => {
              const { name, icon } = TOPICS[tech];

              return (
                <div
                  key={name}
                  className="group flex flex-row items-center w-max p-2.5 bg-primaryBgDark/80 rounded-sm"
                >
                  <div
                    className={`grayscale ${tech === 'NEXTJS' ? 'invert' : ''}`}
                  >
                    {icon ? getIcon({ icon: icon.name, size: '18px' }) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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
      </div>
    </article>
  );
}
