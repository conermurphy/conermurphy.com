import React from 'react';
import { ICONS } from '../../constants';
import { getIcon } from '../../utils';

interface IProps {
  compact?: boolean;
}

export default function Socials({ compact = true }: IProps): JSX.Element {
  return compact ? (
    <address className="flex flex-row gap-8 opacity-75">
      <a
        href="https://twitter.com/MrConerMurphy"
        target="_blank"
        rel="noopener noreferrer"
      >
        {getIcon({ icon: ICONS.TWITTER.name, size: '20px' })}
      </a>
      <a
        href="https://www.linkedin.com/in/conermurphy/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {getIcon({ icon: ICONS.LINKEDIN.name, size: '20px' })}
      </a>
      <a
        href="mailto:hey@conermurphy.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        {getIcon({ icon: ICONS.EMAIL.name, size: '20px' })}
      </a>
    </address>
  ) : (
    <address className="flex flex-row gap-5">
      <a
        href="https://twitter.com/MrConerMurphy"
        target="_blank"
        rel="noopener noreferrer"
      >
        {getIcon({ icon: ICONS.TWITTER.name, size: '22px' })}
      </a>
      <a
        href="https://www.linkedin.com/in/conermurphy/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {getIcon({ icon: ICONS.LINKEDIN.name, size: '22px' })}
      </a>
      <a
        href="https://www.facebook.com/MrConerMurphy"
        target="_blank"
        rel="noopener noreferrer"
      >
        {getIcon({ icon: ICONS.FACEBOOK.name, size: '22px' })}
      </a>
      <a
        href="https://github.com/conermurphy"
        target="_blank"
        rel="noopener noreferrer"
      >
        {getIcon({ icon: ICONS.GITHUB.name, size: '22px' })}
      </a>
      <a
        href="https://www.instagram.com/mrconermurphy/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {getIcon({ icon: ICONS.INSTAGRAM.name, size: '22px' })}
      </a>
      <a
        href="https://www.youtube.com/channel/UCKbxBnz1xuyGAPMCOZQRdVw"
        target="_blank"
        rel="noopener noreferrer"
      >
        {getIcon({ icon: ICONS.YOUTUBE.name, size: '22px' })}
      </a>
    </address>
  );
}
