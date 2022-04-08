import { render, screen } from '@testing-library/react';
import ContactForm from './ContactForm';

describe('ContactForm', () => {
  it('Should render header text correctly', () => {
    render(<ContactForm />);

    const header = screen.getByText(/get in touch/i);
    const text = screen.getByText(
      /Fill out the form below and let’s get talking./i
    );

    expect(header).toBeVisible();
    expect(text).toBeVisible();
  });

  it('Should render all inputs correctly', () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByPlaceholderText('Your first name');
    const lastNameInput = screen.getByPlaceholderText('Your last name');
    const emailInput = screen.getByPlaceholderText('Your email');
    const messageInput = screen.getByPlaceholderText('Your message');
    const submitInput = screen.getByRole('button', {
      name: 'Send Message',
    });

    expect(firstNameInput).toBeVisible();
    expect(lastNameInput).toBeVisible();
    expect(emailInput).toBeVisible();
    expect(messageInput).toBeVisible();
    expect(submitInput).toBeVisible();
  });
});
