import React from 'react';
import { ICONS } from '../../constants';
import { getIcon } from '../../utils';
import ComponentWrapper from '../ComponentWrapper/ComponentWrapper';
import Socials from '../Socials/Socials';

export default function ContactHeader(): JSX.Element {
  const itemContainerStyles = 'max-w-[272px] xl:max-w-[320px]';
  const itemHeaderStyles = 'flex flex-row items-center gap-x-3 mb-1';
  return (
    <ComponentWrapper
      data={{
        title: 'Contact Me.',
        subTitle:
          "I'm always interested in hearing from people so get in touch via one of the methods below and let's chat.",
        pageHeader: true,
      }}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-12">
        <div className={itemContainerStyles}>
          <div className={itemHeaderStyles}>
            {getIcon({ icon: ICONS.EMAIL.name })}
            <h2 className="text-lg">Email me</h2>
          </div>
          <p className="mb-6">Let’s get talking.</p>
          <a href="mailto:hey@conermurphy.com" className="font-semibold">
            hey@conermurphy.com
          </a>
        </div>
        <div className={itemContainerStyles}>
          <div className={itemHeaderStyles}>
            {getIcon({ icon: ICONS.SOCIALS.name })}
            <h2 className="text-lg">Socials</h2>
          </div>
          <p className="mb-6">I’m also on active on social media.</p>
          <Socials compact={false} />
        </div>
        <div className={itemContainerStyles}>
          <div className={itemHeaderStyles}>
            {getIcon({ icon: ICONS.EMAIL.name })}
            <h2 className="text-lg">Contact form</h2>
          </div>
          <p className="mb-6">Email /socials not for you? That’s okay...</p>
          <a href="#contact-form" className="font-semibold">
            Fill in the contact form below.
          </a>
        </div>
      </div>
    </ComponentWrapper>
  );
}
