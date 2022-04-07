import { render, screen } from '@testing-library/react';
import ContactHeader from './ContactHeader';

describe('ContactHeader', () => {
  it('Should render all header items correctly', () => {
    render(<ContactHeader />);

    const title = screen.getByRole('heading', { level: 1 });
    const subtitle = screen.getByText(
      /I'm always interested in hearing from people so get in touch via one of the methods below and let's chat./i
    );

    expect(title).toBeVisible();
    expect(subtitle).toBeVisible();
  });

  it('Should render all email section items correctly', () => {
    render(<ContactHeader />);

    const title = screen.getByRole('heading', { level: 2, name: 'Email me' });
    const subtitle = screen.getByText(/Let’s get talking./i);
    const link = screen.getByRole('link', { name: 'hey@conermurphy.com' });

    expect(title).toBeVisible();
    expect(subtitle).toBeVisible();
    expect(link).toBeVisible();
    expect(link.getAttribute('href')).toEqual('mailto:hey@conermurphy.com');
  });

  it('Should render all socials section items correctly', () => {
    render(<ContactHeader />);

    // Check header of section is visible
    const title = screen.getByRole('heading', { level: 2, name: 'Socials' });
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

  it('Should render all contact form section items correctly', () => {
    render(<ContactHeader />);

    const title = screen.getByRole('heading', {
      level: 2,
      name: 'Contact form',
    });
    const subtitle = screen.getByText(
      /Email \/socials not for you\? That’s okay.../i
    );
    const link = screen.getByRole('link', {
      name: 'Fill in the contact form below.',
    });

    expect(title).toBeVisible();
    expect(subtitle).toBeVisible();
    expect(link).toBeVisible();
    expect(link.getAttribute('href')).toContain('#contact-form');
  });
});
