import React from 'react';
import { ICONS } from '../../constants';
import { getIcon } from '../../utils';
import ComponentWrapper from '../ComponentWrapper/ComponentWrapper';
import ContactForm from '../ContactForm/ContactForm';
import Socials from '../Socials/Socials';

export default function ContactSection(): JSX.Element {
  const itemContainerStyles =
    'flex flex-col justify-between gap-6 bg-secondaryBg dark:bg-secondaryBgDark rounded-lg py-8 px-6';

  return (
    <ComponentWrapper
      data={{
        title: 'Contact Me',
      }}
      id="contact"
    >
      <div className="flex flex-col md:flex-row gap-12 justify-between">
        <ContactForm />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className={itemContainerStyles}>
            <div className="p-3 bg-accent text-primaryTextDark rounded-md w-max">
              {getIcon({ icon: ICONS.EMAIL.name, size: '18px' })}
            </div>
            <div>
              <h3 className="text-lg">Email me</h3>
              <p>Let’s get talking.</p>
            </div>
            <a
              href="mailto:hey@conermurphy.com"
              className="font-semibold hover:border-accent border-transparent border-b-2 w-max"
            >
              hey@conermurphy.com
            </a>
          </div>
          <div className={itemContainerStyles}>
            <div className="p-3 bg-accent text-primaryTextDark rounded-md w-max">
              {getIcon({ icon: ICONS.SOCIALS.name, size: '18px' })}
            </div>
            <div>
              <h3 className="text-lg">Socials</h3>
              <p className="mb-6">I’m also on active on social media.</p>
            </div>
            <Socials compact={false} />
          </div>
          <div className={itemContainerStyles}>
            <div className="p-3 bg-accent text-primaryTextDark rounded-md w-max">
              {getIcon({ icon: ICONS.EMAIL.name, size: '18px' })}
            </div>
            <div>
              <h3 className="text-lg">Contact form</h3>
              <p className="mb-6">
                Email and socials not for you? That’s okay...
              </p>
            </div>
            <a href="#contact-form" className="font-semibold">
              Fill in the contact form.
            </a>
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
}
