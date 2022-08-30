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
      <div className="flex flex-col-reverse md:flex-row justify-between gap-8">
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
        <div className="relative max-w-[400px] sm:max-w-[300px] lg:max-w-[400px] w-full -rotate-2 border-accent border-8 lg:border-[12px] rounded-md">
          <Img
            src="/self-portrait.png"
            layout="responsive"
            width="100%"
            height="100%"
            className="rotate-2 scale-105"
          />
        </div>
      </div>
    </ComponentWrapper>
  );
}
