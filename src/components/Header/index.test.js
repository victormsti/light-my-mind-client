import React from 'react';
import {render, screen, waitForElement} from "@testing-library/react";
import {BrowserRouter as Router} from 'react-router-dom';
import expect from "expect";
import Header from "./index";
import userEvent from "@testing-library/user-event";

const mockHistoryPush = jest.fn();

jest.mock('history', () => ({
    ...jest.requireActual('history'),
    createHashHistory: () => ({
        push: mockHistoryPush,
    }),
}));

window.location.reload = jest.fn();

jest.mock('../../services/auth', () => ({
    ...jest.requireActual('../../services/auth'),
    isAuthenticated: () => true,
}));

describe('header', () =>{
    test('test rendering component if authenticated', async () =>{
        const {getByTestId} = await waitForElement(() => render(<Router><Header /></Router>));
        expect(getByTestId("header-main-authenticated")).toBeInTheDocument();
        expect(getByTestId("header-logout")).toBeInTheDocument();
    });

    test('test redirect to login page if logged out', async () =>{
        const {getByTestId} = await waitForElement(() => render(<Router><Header /></Router>));
        expect(getByTestId("header-main-authenticated")).toBeInTheDocument();
        expect(getByTestId("header-logout")).toBeInTheDocument();
        const button = screen.getByText(/Logout/);
        await userEvent.click(button);
        await Promise.resolve();
        expect(mockHistoryPush).toBeCalledWith('/');
    });
});
