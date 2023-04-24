import React from 'react';
import { Project } from '../../../types';
import { TOPICS } from '../../../constants';
import { getIcon } from '../../../utils';

interface IProps {
  project: Project;
}

export default function ProjectLanguages({ project }: IProps) {
  return (
    <div className="flex flex-row gap-4">
      {project.technologies.map((tech) => {
        const { name, icon } = TOPICS[tech];

        return (
          <div
            key={name}
            className="group flex flex-row items-center w-max p-2.5 bg-text/10 rounded-sm"
          >
            <div className="grayscale">
              {icon
                ? getIcon({ icon: icon.name, size: '18px', color: icon.color })
                : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
