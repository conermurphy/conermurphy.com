import React from 'react';
import { useContactForm, useForm } from '../../utils';
import ComponentWrapper from '../ComponentWrapper/ComponentWrapper';

export default function ContactForm(): JSX.Element {
  const { values, updateValue, resetValues } = useForm({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    chilliIsCool: '',
  });

  const { firstName, lastName, email, message } = values;

  const { loading, outputMessage, submitContactForm } = useContactForm({
    values,
    resetValues,
  });

  const inputContainerStyles = 'flex flex-col items-start';
  const labelStyles = 'font-semibold opacity-75 mb-1';
  const twoColInputStyles =
    'rounded-lg border-primaryBorder md:max-w-[217px] text-xs bg-primaryBg w-full md:w-[217px]';

  return (
    <ComponentWrapper
      data={{
        title: 'Get in touch',
        subTitle: 'Fill out the form below and let’s get talking.',
      }}
      textClasses="xl:text-center"
      id="contact-form"
    >
      <div className="flex flex-col justify-center items-center">
        <form
          onSubmit={submitContactForm}
          className="md:max-w-[450px] w-full"
          data-testid="contact-form"
        >
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
                className="rounded-lg border-primaryBorder md:max-w-[450px] text-xs bg-primaryBg w-full"
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
                className="rounded-lg border-primaryBorder md:max-w-[450px] min-h-[132px] text-xs bg-primaryBg w-full resize-none"
              />
            </div>
            <button
              type="submit"
              className="bg-primaryText text-primaryBg text-xs rounded-lg py-3 px-5"
            >
              {loading ? 'Sending..' : 'Send Message'}
            </button>
          </fieldset>
        </form>
        <p className="text-xs lg:text-base mt-6">{outputMessage}</p>
      </div>
    </ComponentWrapper>
  );
}
