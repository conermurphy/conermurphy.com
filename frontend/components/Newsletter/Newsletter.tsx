import React from 'react';
import { useEmail, useForm } from '../../utils';

interface IProps {
  isAltDesign?: boolean;
}

export default function Newsletter({
  isAltDesign = false,
}: IProps): JSX.Element {
  const { values, updateValue } = useForm({
    email: '',
    chilliIsCool: '',
  });

  const { loading, message, submitEmail } = useEmail({ values });

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <form
        onSubmit={submitEmail}
        className={`flex flex-col gap-y-2 gap-x-4 ${
          isAltDesign ? '' : 'md:flex-row'
        }`}
        data-testid="newsletter-form"
      >
        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email"
          onChange={updateValue}
          value={values.email}
          className={`rounded-md border-primaryBorder dark:border-primaryBorderDark text-xs bg-primaryBg ${
            isAltDesign ? 'dark:text-primaryText' : 'dark:bg-secondaryBgDark'
          } py-3 px-4 md:text-sm`}
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
          className="bg-primaryText dark:bg-primaryTextDark text-primaryBg dark:text-primaryBgDark text-xs rounded-md py-3 px-4 md:text-sm font-bold"
        >
          {loading ? 'Subscribing..' : 'Subscribe'}
        </button>
      </form>
      {message ? <p className="text-xs md:text-sm">{message}</p> : null}
    </div>
  );
}
