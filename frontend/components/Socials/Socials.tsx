import React from 'react';
import { ICONS } from '../../constants';
import { getIcon } from '../../utils';

export default function Socials(): JSX.Element {
  const size = '20px';
  const classes = 'flex flex-row gap-x-5 gap-y-2.5 flex-wrap text-text/75';

  return (
    <address className={classes}>
      <a
        href="https://twitter.com/MrConerMurphy"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-text/100"
      >
        {getIcon({ icon: ICONS.TWITTER.name, size })}
      </a>
      <a
        href="https://www.linkedin.com/in/conermurphy/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-text/100"
      >
        {getIcon({ icon: ICONS.LINKEDIN.name, size })}
      </a>
      <a
        href="mailto:hey@conermurphy.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-text/100"
      >
        {getIcon({ icon: ICONS.EMAIL.name, size })}
      </a>

      <a
        href="https://github.com/conermurphy"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-text/100"
      >
        {getIcon({ icon: ICONS.GITHUB.name, size })}
      </a>
      <a
        href="https://www.youtube.com/channel/UCKbxBnz1xuyGAPMCOZQRdVw"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-text/100"
      >
        {getIcon({ icon: ICONS.YOUTUBE.name, size })}
      </a>
      <a
        href="https://www.facebook.com/MrConerMurphy"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-text/100"
      >
        {getIcon({ icon: ICONS.FACEBOOK.name, size })}
      </a>
      <a
        href="https://www.instagram.com/mrconermurphy/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-text/100"
      >
        {getIcon({ icon: ICONS.INSTAGRAM.name, size })}
      </a>
    </address>
  );
}
