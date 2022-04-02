import { render, screen } from '@testing-library/react';
import React from 'react';
import Socials from './Socials';

describe('Socials', () => {
  it('Should show 3 icons in compact', () => {
    render(<Socials />);

    const icons = screen.queryAllByRole('img').length;

    const twitterIcon = screen.getByLabelText('Twitter logo');
    const linkedInIcon = screen.getByLabelText('LinkedIn logo');
    const emailIcon = screen.getByLabelText('Email icon');

    expect(twitterIcon).toBeVisible();
    expect(linkedInIcon).toBeVisible();
    expect(emailIcon).toBeVisible();
    expect(icons).toEqual(3);
  });

  it('Should show 6 icons in compact', () => {
    render(<Socials compact={false} />);

    const icons = screen.queryAllByRole('img').length;
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

    expect(icons).toEqual(6);
  });
});
