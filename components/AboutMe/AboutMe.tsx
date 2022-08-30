import React from 'react';
import Img from 'next/image';
import ComponentWrapper from '../ComponentWrapper/ComponentWrapper';

export default function AboutMe() {
  return (
    <ComponentWrapper
      data={{
        title: 'About Me',
      }}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <p>Some text about me, repeated a few times.</p>
          <p>Some text about me, repeated a few times.</p>
          <p>Some text about me, repeated a few times.</p>
          <p>Some text about me, repeated a few times.</p>
          <p>Some text about me, repeated a few times.</p>
          <p>Some text about me, repeated a few times.</p>
          <p>Some text about me, repeated a few times.</p>
          <p>Some text about me, repeated a few times.</p>
        </div>
        <div className="relative h-96 w-96 -rotate-2 border-accent border-[12px] rounded-md">
          <Img
            src="/self-portrait.png"
            layout="fill"
            objectFit="contain"
            className="rotate-2 scale-105"
          />
        </div>
      </div>
    </ComponentWrapper>
  );
}
