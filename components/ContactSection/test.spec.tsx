import { render, screen } from '@testing-library/react';
import ContactSection from './ContactSection';

describe('ContactSection', () => {
  it('Should render all header items correctly', () => {
    render(<ContactSection />);

    const title = screen.getByRole('heading', { level: 2 });

    expect(title).toBeVisible();
  });

  it('Should render all email section items correctly', () => {
    render(<ContactSection />);

    const title = screen.getByRole('heading', { level: 3, name: 'Email me' });
    const subtitle = screen.getByText(/Let’s get talking./i);
    const link = screen.getByRole('link', { name: 'hey@conermurphy.com' });

    expect(title).toBeVisible();
    expect(subtitle).toBeVisible();
    expect(link).toBeVisible();
    expect(link.getAttribute('href')).toEqual('mailto:hey@conermurphy.com');
  });

  it('Should render all socials section items correctly', () => {
    render(<ContactSection />);

    // Check header of section is visible
    const title = screen.getByRole('heading', { level: 3, name: 'Socials' });
    const subtitle = screen.getByText(/I’m also on active on social media./i);

    expect(title).toBeVisible();
    expect(subtitle).toBeVisible();

    // Check SVGs of social icons are visible
    const twitterIcon = screen.getByLabelText('Twitter logo');
    const linkedInIcon = screen.getByLabelText('LinkedIn logo');
    const facebookIcon = screen.getByLabelText('Facebook logo');
    const githubIcon = screen.getByLabelText('GitHub logo');
    const instagramIcon = screen.getByLabelText('Instagram logo');
    const youtubeIcon = screen.getByLabelText('YouTube logo');

    expect(twitterIcon).toBeVisible();
    expect(linkedInIcon).toBeVisible();
    expect(facebookIcon).toBeVisible();
    expect(githubIcon).toBeVisible();
    expect(instagramIcon).toBeVisible();
    expect(youtubeIcon).toBeVisible();

    const twitterLink = screen.getByRole('link', { name: 'Twitter logo' });
    const linkedInLink = screen.getByRole('link', { name: 'LinkedIn logo' });
    const facebookLink = screen.getByRole('link', { name: 'Facebook logo' });
    const githubLink = screen.getByRole('link', { name: 'GitHub logo' });
    const instagramLink = screen.getByRole('link', { name: 'Instagram logo' });
    const youtubeLink = screen.getByRole('link', { name: 'YouTube logo' });

    expect(twitterLink.getAttribute('href')).toEqual(
      'https://twitter.com/MrConerMurphy'
    );
    expect(linkedInLink.getAttribute('href')).toEqual(
      'https://www.linkedin.com/in/conermurphy/'
    );
    expect(facebookLink.getAttribute('href')).toEqual(
      'https://www.facebook.com/MrConerMurphy'
    );
    expect(githubLink.getAttribute('href')).toEqual(
      'https://github.com/conermurphy'
    );
    expect(instagramLink.getAttribute('href')).toEqual(
      'https://www.instagram.com/mrconermurphy/'
    );
    expect(youtubeLink.getAttribute('href')).toEqual(
      'https://www.youtube.com/channel/UCKbxBnz1xuyGAPMCOZQRdVw'
    );
  });
});
