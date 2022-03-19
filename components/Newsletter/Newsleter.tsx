import React from 'react';
import { useEmail, useForm } from '../../utils';

export default function Newsletter(): JSX.Element {
  const { values, updateValue } = useForm({
    email: '',
    chilliIsCool: '',
  });

  const { loading, message, submitEmail } = useEmail({ values });

  return (
    <div className="flex flex-col gap-3 md:gap-4 max-w-[272px] md:max-w-[400px]">
      <div>
        <p className="font-bold opacity-100">Stay up to date</p>
        <p className="text-xs md:text-base">
          Get exclusive content before anyone else. Subscribe to my newsletter
          below.
        </p>
      </div>
      <form
        onSubmit={submitEmail}
        className="flex flex-col gap-y-2 gap-x-4 md:flex-row"
        data-testid="newsletter-form"
      >
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="Enter your email"
          onChange={updateValue}
          value={values.email}
          className="rounded-lg border-primaryBorder max-w-[272px] text-xs bg-offWhite md:text-md"
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
          className="bg-primary text-offWhite text-xs rounded-lg py-3 px-5 md:text-md"
        >
          {loading ? 'Subscribing..' : 'Subscribe'}
        </button>
      </form>
      <p className="text-xs md:text-sm">{message}</p>
    </div>
  );
}
