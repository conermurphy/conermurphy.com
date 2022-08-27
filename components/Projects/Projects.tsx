import React from 'react';
import { Project } from '../../types';
import ComponentWrapper from '../ComponentWrapper/ComponentWrapper';
import FeaturedProjectCard from './components/FeaturedProjectCard';
import ProjectCard from './components/ProjectCard';

interface IProps {
  projects: Project[];
}

export default function Projects({ projects }: IProps): JSX.Element {
  const { featured, nonFeatured } = projects.reduce<{
    featured: Project[];
    nonFeatured: Project[];
  }>(
    (acc, cur) => {
      if (cur.isFeatured) {
        acc.featured.push(cur);
      } else {
        acc.nonFeatured.push(cur);
      }

      return acc;
    },
    {
      featured: [],
      nonFeatured: [],
    }
  );

  return (
    <ComponentWrapper
      data={{
        title: 'Featured Projects',
      }}
    >
      <ul className="grid grid-cols-2 gap-6 w-full items-start justify-between">
        {featured.map((project) => (
          <li key={project.title} className="h-full">
            <FeaturedProjectCard project={project} />
          </li>
        ))}
      </ul>
      {nonFeatured?.length ? (
        <div className="mt-12 flex flex-col gap-12">
          <h3 className="text-3xl font-bold">My Other Projects</h3>
          <ul className="grid grid-cols-4 gap-6 w-full items-start justify-between">
            {nonFeatured.map((project) => (
              <li key={project.title} className="h-full">
                <ProjectCard />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </ComponentWrapper>
  );
}
