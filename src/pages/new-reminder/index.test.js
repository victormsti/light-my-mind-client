import React from 'react';
import {fireEvent, render, screen, waitForElement} from "@testing-library/react";
import {BrowserRouter as Router, Router as CustomRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import axios from "axios";
import api from "../../services/api";
import {createMemoryHistory} from "history";
import NewReminder from "./index";
import expect from "expect";

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

window.location.reload = jest.fn();

describe('new reminder', () =>{
    test('test rendering default components', () =>{
        const {getByTestId} = render(<Router><NewReminder /></Router>);
        expect(getByTestId("new-reminder-form")).toBeInTheDocument();
        expect(getByTestId("new-reminder-info")).toBeInTheDocument();
    });
    test('test button with empty inputs', () =>{
        const {getByTestId} = render(<Router><NewReminder /></Router>);
        const button = screen.getByText("Create");
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(getByTestId("new-reminder-error-msg")).toHaveTextContent('Fill all inputs to create a new reminder');
    });
    test('test button with filled inputs', () =>{
        const {getByTestId, queryByTestId} = render(<Router><NewReminder /></Router>);
        const button = screen.getByText("Create");
        const title = getByTestId("new-reminder-title");
        const description = getByTestId("new-reminder-text-area");
        const period = getByTestId("new-reminder-period");
        const hourOfDay = getByTestId("new-reminder-hour");
        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(period).toBeInTheDocument();
        expect(hourOfDay).toBeInTheDocument();
        userEvent.type(title, "test");
        userEvent.type(description, "testDescription");
        userEvent.type(period, "Daily");
        userEvent.type(hourOfDay, "07:00");
        fireEvent.click(button);
        expect(queryByTestId("new-reminder-error-msg")).toBeNull();
    });
    test('test routing to main page', async () => {

        api.post.mockImplementationOnce(() => Promise.resolve());

        const {getByTestId} = render(<Router><NewReminder/></Router>);
        const button = screen.getByText("Create");
        const title = getByTestId("new-reminder-title");
        const description = getByTestId("new-reminder-text-area");
        const period = getByTestId("new-reminder-period");
        const hourOfDay = getByTestId("new-reminder-hour");
        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(period).toBeInTheDocument();
        expect(hourOfDay).toBeInTheDocument();
        userEvent.type(title, "test");
        userEvent.type(description, "testDescription");
        userEvent.type(period, "Daily");
        userEvent.type(hourOfDay, "07:00");
        fireEvent.click(button);
        await Promise.resolve();
        expect(mockHistoryPush).toBeCalledWith('/main');
    });
});
