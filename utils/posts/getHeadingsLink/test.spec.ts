import getHeadingLink from './getHeadingLink';

describe('getHeadingLink', () => {
  it('should return id with correct formatting', () => {
    const id = getHeadingLink('What Are HTTP Status Codes?');

    expect(id).toEqual('what-are-http-status-codes');
  });
});
