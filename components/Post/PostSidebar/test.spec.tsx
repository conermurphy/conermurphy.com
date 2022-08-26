import { render, screen } from '@testing-library/react';
import PostSidebar from './PostSidebar';

const mockHeadings = [
  {
    text: 'What Are HTTP Status Codes?',
    level: 2,
    link: '#what-are-http-status-codes',
  },
  {
    text: 'The Five Status Classes.',
    level: 2,
    link: '#the-five-status-classes',
  },
  {
    text: 'Information Responses',
    level: 3,
    link: '#information-responses',
  },
];

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '/blog',
    };
  },
}));

describe('PostSidebar', () => {
  it('should render contents section correctly', () => {
    render(<PostSidebar headings={mockHeadings} title="example post title" />);

    const contentsTitle = screen.getByRole('heading', { level: 2 });
    const headingItem1 = screen.getByText(/what are http status codes\?/i);
    const headingItem2 = screen.getByText(/The Five Status Classes./i);
    const headingItem3 = screen.getByText(/Information Responses/i);

    expect(contentsTitle).toBeVisible();
    expect(headingItem1).toBeVisible();
    expect(headingItem2).toBeVisible();
    expect(headingItem3).toBeVisible();
  });

  it('should render newsletter section correctly', () => {
    render(<PostSidebar headings={mockHeadings} title="example post title" />);

    const input = screen.queryByPlaceholderText(/Enter your email/i);
    const button = screen.queryByText(/subscribe/i);

    expect(input).toBeVisible();
    expect(button).toBeVisible();
  });

  it('should render share section correctly', () => {
    render(<PostSidebar headings={mockHeadings} title="example post title" />);

    const copyIcon = screen.getByLabelText('copy icon');
    const twitterIcon = screen.getByLabelText('Twitter logo');
    const linkedInIcon = screen.getByLabelText('LinkedIn logo');
    const facebookIcon = screen.getByLabelText('Facebook logo');
    const redditIcon = screen.getByLabelText('Reddit logo');

    expect(copyIcon).toBeVisible();
    expect(twitterIcon).toBeVisible();
    expect(linkedInIcon).toBeVisible();
    expect(facebookIcon).toBeVisible();
    expect(redditIcon).toBeVisible();
  });
});
