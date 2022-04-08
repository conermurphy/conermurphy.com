import React from 'react';
import { useForm } from '../../utils';
import ComponentWrapper from '../ComponentWrapper/ComponentWrapper';

export default function ContactForm(): JSX.Element {
  const { values, updateValue } = useForm({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    chilliIsCool: '',
  });

  const { firstName, lastName, email, message } = values;

  const inputContainerStyles = 'flex flex-col items-start';
  const labelStyles = 'font-semibold opacity-75 mb-1';
  const twoColInputStyles =
    'rounded-lg border-primaryBorder max-w-[272px] md:max-w-[217px] text-xs bg-secondaryBg w-full';

  return (
    <ComponentWrapper
      data={{
        title: 'Get in touch',
        subTitle: 'Fill out the form below and let’s get talking.',
      }}
      className="md:text-center"
      id="contact-form"
    >
      <div className="flex flex-row md:justify-center">
        {/* TODO: Replace action with onSubmit handler once logic is created. */}
        <form action="" className="max-w-[272px] md:max-w-[450px] w-full">
          <fieldset className="flex flex-col gap-4 md:gap-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className={inputContainerStyles}>
                <label htmlFor="firstName" className={labelStyles}>
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  required
                  placeholder="Your first name"
                  onChange={updateValue}
                  value={firstName}
                  className={twoColInputStyles}
                />
              </div>
              <div className={inputContainerStyles}>
                <label htmlFor="lastName" className={labelStyles}>
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  required
                  placeholder="Your last name"
                  onChange={updateValue}
                  value={lastName}
                  className={twoColInputStyles}
                />
              </div>
            </div>
            <div className={inputContainerStyles}>
              <label htmlFor="email" className={labelStyles}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Your email"
                onChange={updateValue}
                value={email}
                className="rounded-lg border-primaryBorder max-w-[272px] md:max-w-[450px] text-xs bg-secondaryBg w-full"
              />
            </div>
            <div className={inputContainerStyles}>
              <label htmlFor="message" className={labelStyles}>
                Message
              </label>
              <textarea
                name="message"
                id="message"
                required
                placeholder="Your message"
                onChange={updateValue}
                value={message}
                className="rounded-lg border-primaryBorder max-w-[272px] md:max-w-[450px] min-h-[132px] text-xs bg-secondaryBg w-full resize-none"
              />
            </div>
            <button
              type="submit"
              className="bg-primaryText text-primaryBg text-xs rounded-lg py-3 px-5"
            >
              Send Message
            </button>
          </fieldset>
        </form>
      </div>
    </ComponentWrapper>
  );
}
