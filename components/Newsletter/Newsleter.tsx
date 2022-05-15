import React from 'react';
import { useEmail, useForm } from '../../utils';

interface IProps {
  breakpoint?: 'md' | 'lg';
  forceMobile?: boolean;
}

export default function Newsletter({
  breakpoint = 'md',
  forceMobile = false,
}: IProps): JSX.Element {
  const { values, updateValue } = useForm({
    email: '',
    chilliIsCool: '',
  });

  const { loading, message, submitEmail } = useEmail({ values });

  let formDirectionStyles = '';
  let textSize = '';
  let widthGap = '';

  if (!forceMobile) {
    formDirectionStyles = breakpoint === 'md' ? 'md:flex-row' : 'lg:flex-row';
    textSize = breakpoint === 'md' ? 'md:text-sm' : 'lg:text-sm';
    widthGap =
      breakpoint === 'md'
        ? 'md:max-w-[372px] md:gap-4'
        : 'lg:max-w-[372px] lg:gap-4';
  }

  return (
    <div className={`flex flex-col gap-3 sm:max-w-[272px] ${widthGap}`}>
      <div>
        <p className="font-bold opacity-100">Stay up to date</p>
        <p className={`text-xs ${textSize}`}>
          Get exclusive content and be notified of my content before anyone else
          by subscribing to my newsletter below.
        </p>
      </div>
      <form
        onSubmit={submitEmail}
        className={`flex flex-col gap-y-2 gap-x-4 ${formDirectionStyles}`}
        data-testid="newsletter-form"
      >
        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email"
          onChange={updateValue}
          value={values.email}
          className={`rounded-lg border-primaryBorder dark:primaryBorderDark sm:max-w-[272px] text-xs bg-secondaryBg dark:bg-secondaryBgDark ${textSize}`}
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
          className={`bg-primaryText dark:bg-primaryTextDark text-primaryBg dark:text-primaryBgDark text-xs rounded-lg py-3 px-5 ${textSize}`}
        >
          {loading ? 'Subscribing..' : 'Subscribe'}
        </button>
      </form>
      <p
        className={`text-xs ${
          breakpoint === 'md' ? 'md:text-sm' : 'lg:text-sm'
        }`}
      >
        {message}
      </p>
    </div>
  );
}
