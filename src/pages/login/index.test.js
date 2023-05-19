import React from 'react';
import {fireEvent, render} from "@testing-library/react";
import {BrowserRouter as Router} from 'react-router-dom';
import SignIn from "./index";
import userEvent from '@testing-library/user-event';
import axios from "axios";
import api from "../../services/api";

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

jest.mock('axios', () => {
    return {
        ...jest.requireActual('axios'),
        post: jest.fn(),
        create: jest.fn(() => ({
            get: jest.fn(),
            post: jest.fn(),
            interceptors: {
                request: { use: jest.fn(), eject: jest.fn() },
                response: { use: jest.fn(), eject: jest.fn() }
            }
        }))
    }
});

describe('login', () =>{
    test('test rendering components', () =>{
        const {getByTestId} = render(<Router><SignIn /></Router>);
        expect(getByTestId("login-container")).toBeInTheDocument();
        expect(getByTestId("login-form")).toBeInTheDocument();
        expect(getByTestId("login-link")).toBeInTheDocument();
    });
    test('test button with empty inputs', () =>{
        const {getByTestId} = render(<Router><SignIn /></Router>);
        const button = getByTestId("login-button");
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(getByTestId("login-error-msg")).toHaveTextContent('Fill all inputs to continue');
    });
    test('test button with filled inputs', () =>{
        const {getByTestId, queryByTestId} = render(<Router><SignIn /></Router>);
        const button = getByTestId("login-button");
        const email = getByTestId("login-input-email");
        const password = getByTestId("login-input-password");
        expect(button).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        userEvent.type(email, "test@mail.com");
        userEvent.type(password, "123456");
        fireEvent.click(button);
        expect(queryByTestId("login-error-msg")).toBeNull();
    });
    test('test routing to main page', async () => {
        const response = {
            data: {
                token: 'ABCDE',
                userId: 123
            }
        }
        api.post.mockImplementationOnce(() => Promise.resolve(response));

        const {getByTestId} = render(<Router><SignIn/></Router>);
        const button = getByTestId("login-button");
        const email = getByTestId("login-input-email");
        const password = getByTestId("login-input-password");
        expect(button).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        userEvent.type(email, "test@mail.com");
        userEvent.type(password, "123456");
        fireEvent.click(button);
        await Promise.resolve();
        expect(mockHistoryPush).toBeCalledWith('/main');

    });
});
