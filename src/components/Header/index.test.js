import React from 'react';
import {render, waitForElement} from "@testing-library/react";
import {BrowserRouter as Router} from 'react-router-dom';
import expect from "expect";
import Header from "./index";

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
    test('test rendering components', async () =>{
        jest.mock('../../services/auth', () => ({
            ...jest.requireActual('../../services/auth'),
            isAuthenticated: () => false,
        }));

        const {getByTestId, queryByText} = await waitForElement(() => render(<Router><Header /></Router>));
        expect(getByTestId("header-app-name")).toBeInTheDocument();
    });
});
