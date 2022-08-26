import React from 'react';
import { useContactForm, useForm } from '../../utils';

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
  const labelStyles = 'font-bold mb-1';
  const twoColInputStyles =
    'rounded-lg border-primaryBorder text-md bg-primaryBg w-full ';

  return (
    <div className="flex flex-col justify-start items-center bg-secondaryBg dark:bg-secondaryBgDark p-8 rounded-md h-full col-span-2">
      <form
        onSubmit={submitContactForm}
        className="flex flex-col gap-4 md:gap-6 w-full grow"
        data-testid="contact-form"
      >
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
            className="rounded-lg border-primaryBorder  text-md bg-primaryBg w-full"
          />
        </div>
        <div className={`grow ${inputContainerStyles}`}>
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
            className="rounded-lg border-primaryBorder text-md bg-primaryBg w-full resize-none h-full"
          />
        </div>
        <button
          type="submit"
          className="bg-primaryBgDark dark:bg-primaryBg text-primaryTextDark dark:text-primaryText text-base font-bold rounded-md py-3 px-5"
        >
          {loading ? 'Sending..' : 'Send Message'}
        </button>
      </form>
      <p
        className={`text-xs lg:text-base mt-6 ${
          !outputMessage ? 'animate-pulse' : ''
        }`}
      >
        {outputMessage || 'Awaiting Submission...'}
      </p>
    </div>
  );
}
