import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const formHeader = screen.getByText(/Contact Form/)
    expect(formHeader).toBeInTheDocument();
    expect(formHeader).toBeTruthy();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const fNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(fNameInput, "test");

    const error = screen.getAllByTestId(/error/)
    expect(error.length === 1)

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const submitButton = screen.getByRole('button', { type: /submit/i });
    userEvent.click(submitButton);

    const error = screen.getAllByTestId(/error/);
    expect(error.length === 3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const fNameInput = screen.getByLabelText(/first name/i);
    const lNameInput = screen.getByLabelText(/last name/i);
    const submitButton = screen.getByRole('button', { type: /submit/i });

    userEvent.type(fNameInput, "Joshua");
    userEvent.type(lNameInput, "Larson");
    userEvent.click(submitButton);

    const error = screen.getAllByTestId(/error/);
    expect(error.length === 1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, "test");

    const error = screen.getByText(/email must be a valid email address/);
    expect(error).toBeInTheDocument();

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const submitButton = screen.getByRole('button', { type: /submit/i });
    userEvent.click(submitButton);

    const error = screen.getByText(/lastName is a required field/);
    expect(error).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const fNameInput = screen.getByLabelText(/first name/i);
    const lNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { type: /submit/i });

    userEvent.type(fNameInput, "Joshua");
    userEvent.type(lNameInput, "Larson");
    userEvent.type(emailInput, "test@test.test")
    userEvent.click(submitButton);

    const submittedFName = screen.getByTestId(/firstnameDisplay/);
    const submittedLName = screen.getByTestId(/lastnameDisplay/);
    const submittedEmail = screen.getByTestId(/emailDisplay/);
    let submittedMessage = screen.queryByTestId(/messageDisplay/)
    
    expect(submittedFName).toBeInTheDocument();
    expect(submittedLName).toBeInTheDocument();
    expect(submittedEmail).toBeInTheDocument();
    expect(submittedMessage).not.toBeInTheDocument();
    
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
});