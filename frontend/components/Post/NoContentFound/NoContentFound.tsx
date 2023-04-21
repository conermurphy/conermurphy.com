import React from 'react';

export default function NoContentFound() {
  return (
    <div className="flex flex-col gap-3 max-w-lg md:max-w-xl">
      <h2 className="text-3xl font-normal md:text-4xl">
        Sorry, no posts were found...
      </h2>
      <p>
        Please try searching again or using one of the category or tag filters
        to find more awesome content. 😀
      </p>
    </div>
  );
}
