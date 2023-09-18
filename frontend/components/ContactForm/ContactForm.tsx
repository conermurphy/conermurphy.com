'use client';

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
  const labelStyles = 'font-extrabold mb-1 text-brand font-heading';

  return (
    <div className="flex flex-col justify-start items-center p-6 md:p-12 rounded-md h-full col-span-5 xl:col-span-2 w-full border-8 border-text/10 max-w-7xl">
      <form
        onSubmit={submitContactForm}
        className="flex flex-col gap-4 md:gap-6 w-full grow"
        data-testid="contact-form"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4">
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
              className="rounded-md border-text/10 text-md bg-background focus:border-brand border-2 font-heading font-extrabold w-full"
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
              className="rounded-md border-text/10 text-md bg-background focus:border-brand border-2 font-heading font-extrabold w-full"
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
            className="rounded-md border-text/10 text-md bg-background focus:border-brand border-2 font-heading font-extrabold w-full"
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
            className="rounded-md border-text/10 text-md bg-background focus:border-brand border-2 font-heading font-extrabold w-full resize-none h-full min-h-[150px]"
          />
        </div>
        <button
          type="submit"
          className="bg-brand text-background text-base font-bold rounded-md py-3 px-4"
        >
          {loading ? 'Sending..' : 'Send Message'}
        </button>
      </form>
      <p
        className={`text-md lg:text-base mt-6 ${
          !outputMessage ? 'animate-pulse' : ''
        }`}
      >
        {outputMessage || 'Awaiting Submission...'}
      </p>
    </div>
  );
}
