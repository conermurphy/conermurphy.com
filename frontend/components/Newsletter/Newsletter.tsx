import React from 'react';
import { useEmail, useForm } from '../../utils';
import ComponentWrapper from '../ComponentWrapper/ComponentWrapper';

export default function Newsletter() {
  const { values, updateValue } = useForm({
    email: '',
    chilliIsCool: '',
  });

  const { loading, message, submitEmail } = useEmail({ values });

  return (
    <ComponentWrapper
      direction="row"
      data={{
        title: 'Join My Newsletter',
        tag: 'Contact',
        description:
          'Subscribe to my weekly newsletter by filling in the form.',
      }}
    >
      <div className="flex flex-col gap-3 max-w-md w-full">
        <form
          onSubmit={submitEmail}
          className="flex flex-col gap-y-2 w-full"
          data-testid="newsletter-form"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            onChange={updateValue}
            value={values.email}
            className="border-2 border-text/10 rounded-lg p-3 text-sm font-bold placeholder:text-text/75 w-full"
          />
          <input
            type="text"
            name="chilliIsCool"
            onChange={updateValue}
            value={values.chilliIsCool}
            className="hidden"
          />
          <button
            type="submit"
            className="text-heading rounded-lg p-3 text-sm font-extrabold bg-brand w-full text-background"
          >
            {loading ? 'Subscribing..' : 'Subscribe'}
          </button>
        </form>
        <p className="italic text-xs text-text/75">
          Get my latest content every week and 0 spam!
        </p>
        {message ? <p className="text-xs">{message}</p> : null}
      </div>
    </ComponentWrapper>
  );
}
