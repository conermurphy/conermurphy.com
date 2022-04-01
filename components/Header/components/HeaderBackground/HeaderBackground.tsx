import React from 'react';

interface IProps {
  bg: string;
}

export default function HeaderBackground({ bg }: IProps): JSX.Element {
  return <div className={`h-16 w-full sticky top-0 z-10 ${bg}`} />;
}
