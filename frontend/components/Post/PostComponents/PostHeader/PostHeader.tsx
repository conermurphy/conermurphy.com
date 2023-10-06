import React from 'react';
import { PostFrontMatter } from '../../../../types';
import { TOPICS } from '../../../../constants';

interface IProps {
  frontmatter: PostFrontMatter;
}

export default function PostHeader({ frontmatter }: IProps): JSX.Element {
  const { date, timeToRead, title, description, topics } = frontmatter;

  const wrappedTitle = title.replace(
    /`(.*?)`/g,
    '<code class="p-1 font-extrabold">$&</code>'
  );

  const postsDateUI = new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <section className="relative pt-16 pb-0 md:py-16">
      <header className="relative flex flex-col items-center justify-center gap-8 px-6 xl:px-0 z-10">
        <div className="max-w-md sm:max-w-6xl w-full flex flex-col items-center justify-center text-center gap-2 md:gap-8">
          <p className="font-extrabold font-heading flex flex-row flex-wrap max-w-xs sm:max-w-full items-center justify-center gap-3 px-3 py-2 rounded-lg w-max">
            {topics.map((topic) => {
              const selectedTopic = TOPICS?.[topic];

              return selectedTopic ? (
                <span
                  key={selectedTopic.name}
                  className=" text-text py-1 px-2 rounded-md bg-brand"
                >
                  {selectedTopic.name}
                </span>
              ) : null;
            })}
            <span>
              <time dateTime={date}>{postsDateUI}</time>
              {` | ${timeToRead} Min Read`}
            </span>
          </p>
          <div className="flex flex-col items-center gap-3">
            <h1
              className="text-2xl md:text-4xl max-w-4xl"
              dangerouslySetInnerHTML={{ __html: wrappedTitle }}
            />
            <p className="text-base md:text-lg max-w-2xl">{description}</p>
          </div>
        </div>
      </header>
    </section>
  );
}
