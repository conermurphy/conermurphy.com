import React from 'react';
import { useEmail, useForm } from '../../utils';

interface IProps {
  breakpoint?: string;
}

export default function Newsletter({ breakpoint = 'md' }: IProps): JSX.Element {
  const { values, updateValue } = useForm({
    email: '',
    chilliIsCool: '',
  });

  const { loading, message, submitEmail } = useEmail({ values });

  return (
    <div
      className={`flex flex-col gap-3 max-w-[272px] ${breakpoint}:max-w-[372px] ${breakpoint}:gap-4`}
    >
      <div>
        <p className="font-bold opacity-100">Stay up to date</p>
        <p className={`text-xs ${breakpoint}:text-base`}>
          Get exclusive content before anyone else. Subscribe to my newsletter
          below.
        </p>
      </div>
      <form
        onSubmit={submitEmail}
        className={`flex flex-col gap-y-2 gap-x-4 ${breakpoint}:flex-row`}
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
          className={`rounded-lg border-primaryBorder max-w-[272px] text-xs bg-primaryBg ${breakpoint}:text-md`}
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
          className={`bg-primaryText text-primaryBg text-xs rounded-lg py-3 px-5 ${breakpoint}:text-md`}
        >
          {loading ? 'Subscribing..' : 'Subscribe'}
        </button>
      </form>
      <p className={`text-xs ${breakpoint}:text-sm`}>{message}</p>
    </div>
  );
}
