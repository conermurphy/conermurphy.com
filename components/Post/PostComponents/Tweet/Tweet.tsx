import React from 'react';

interface IProps {
  tweet: number;
}

export default function Tweet({ tweet }: IProps): JSX.Element {
  // TODO: Return in scope of #84 to replace this with the actual component, adding this here now so the site builds correctly
  return (
    <div>
      <p>{tweet}</p>
    </div>
  );
}
