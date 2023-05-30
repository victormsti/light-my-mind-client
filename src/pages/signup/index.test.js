import React from 'react';
import {fireEvent, render, screen, waitForElement} from "@testing-library/react";
import {BrowserRouter as Router, Router as CustomRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import axios from "axios";
import api from "../../services/api";
import {createMemoryHistory} from "history";
import expect from "expect";
import SignUp from "./index";

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

const response = {
    data: {
        token: 'ABCDE',
        userId: 123
    }
}

describe('signup', () =>{
    test('test rendering default components', () =>{
        const {getByTestId} = render(<Router><SignUp /></Router>);
        expect(getByTestId("signup-container")).toBeInTheDocument();
        expect(getByTestId("signup-form")).toBeInTheDocument();
        expect(getByTestId("signup-link")).toBeInTheDocument();
    });
    test('test button with empty inputs', () =>{
        const {getByTestId} = render(<Router><SignUp /></Router>);
        const button = screen.getByText(/SignUp for Free/)
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(getByTestId("signup-error-msg")).toHaveTextContent('Fill all inputs to sign up');
    });
    test('test routing to main page', async () =>{
        api.post.mockImplementation(() => Promise.resolve(response));

        const {getByTestId, queryByTestId} = render(<Router><SignUp /></Router>);
        const button = screen.getByText(/SignUp for Free/)
        const username = getByTestId("signup-input-username");
        const email = getByTestId("signup-input-email");
        const password = getByTestId("signup-input-password");
        expect(button).toBeInTheDocument();
        expect(username).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();

        await userEvent.type(username, "test");
        await userEvent.type(email, "test@mail.com");
        await userEvent.type(password, "123456");
        await userEvent.click(button);

        await Promise.resolve();
        expect(queryByTestId("signup-error-msg")).toBeNull();
        expect(mockHistoryPush).toBeCalledWith('/main');
    });
    test('test routing to login page', async () => {
        const history = createMemoryHistory();

        await waitForElement(() =>
            render(<CustomRouter history={history}><SignUp/></CustomRouter>)
        );

        await userEvent.click(screen.getByText(/Login/));

        expect(history.location.pathname).toEqual('/');
    });
});
