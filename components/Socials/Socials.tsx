import React from 'react';
import { ICONS } from '../../constants';
import { getIcon } from '../../utils';

interface IProps {
  compact?: boolean;
}

export default function Socials({ compact = true }: IProps): JSX.Element {
  const size = compact ? '20px' : '22px';
  const classes = compact
    ? 'flex flex-row gap-8 opacity-75'
    : 'flex flex-row gap-x-5';

  return (
    <address className={classes}>
      <a
        href="https://twitter.com/MrConerMurphy"
        target="_blank"
        rel="noopener noreferrer"
      >
        {getIcon({ icon: ICONS.TWITTER.name, size })}
      </a>
      <a
        href="https://www.linkedin.com/in/conermurphy/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {getIcon({ icon: ICONS.LINKEDIN.name, size })}
      </a>
      <a
        href="mailto:hey@conermurphy.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        {getIcon({ icon: ICONS.EMAIL.name, size })}
      </a>
      {!compact ? (
        <>
          <a
            href="https://github.com/conermurphy"
            target="_blank"
            rel="noopener noreferrer"
          >
            {getIcon({ icon: ICONS.GITHUB.name, size })}
          </a>
          <a
            href="https://www.youtube.com/channel/UCKbxBnz1xuyGAPMCOZQRdVw"
            target="_blank"
            rel="noopener noreferrer"
          >
            {getIcon({ icon: ICONS.YOUTUBE.name, size })}
          </a>
          <a
            href="https://www.facebook.com/MrConerMurphy"
            target="_blank"
            rel="noopener noreferrer"
          >
            {getIcon({ icon: ICONS.FACEBOOK.name, size })}
          </a>
          <a
            href="https://www.instagram.com/mrconermurphy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {getIcon({ icon: ICONS.INSTAGRAM.name, size })}
          </a>
        </>
      ) : null}
    </address>
  );
}
