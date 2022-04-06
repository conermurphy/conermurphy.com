import getHeadings from './getHeadings';

const mockContent = `HTTP status codes are a vital part of the web, they allow for clear communication between clients and servers. A code can indicate if everything is okay if there's been an error and where, or if their request is still in progress.

For us developers, they can give a great insight into where problems may be occurring. But, did you know that status codes can also have an impact on your SEO?

In this post, I'm going to cover what HTTP status codes are, the different classes and how certain ones can influence your SEO. Let's get started.

## What Are HTTP Status Codes?

The definition from [MDN is:](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

> HTTP response status codes indicate whether a specific HTTP request has been successfully completed.

What this means is for every request made they will have a status code that indicates whether it was a success or not.

So for example, you click on a webpage and send a request to view it. If there are no issues and the server returns you the webpage then you would get a 200 status code (ok) for that request.

But, as is common, if you try to access a page that doesn't exist the request is returned with a 404 code (Not Found).

If you want to see the requests you're sending and their status codes, you can use the network tab of your developer tools.

![Example of status codes from conermurphy.com](/images/blog/40-complete-2021-guide-http-status-codes-seo-influence/browserStatusCodes.png)

_For example, this is a screenshot of the requests I received from [my website.](https://conermurphy.com/)_

HTTP status codes are split into five classes, let's take a look at them.

## The Five Status Classes.`;

describe('getHeadings', () => {
  it('should return all headings from content and extra info', () => {
    const headings = getHeadings(mockContent);

    expect(headings).toEqual([
      {
        level: 2,
        link: '#what-are-http-status-codes',
        text: 'What Are HTTP Status Codes?',
      },
      {
        level: 2,
        link: '#the-five-status-classes',
        text: 'The Five Status Classes.',
      },
    ]);
  });
});
