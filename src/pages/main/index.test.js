import React from 'react';
import {render, screen, waitForElement} from "@testing-library/react";
import {BrowserRouter as Router, Router as CustomRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import axios from "axios";
import api from "../../services/api";
import Main from "./index";
import {createMemoryHistory} from "history";

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

describe('main', () =>{
    test('test rendering components with no reminders', async () =>{
        const response = { data: {"docs": []} }
        api.get.mockImplementationOnce(() => Promise.resolve(response));

        const {getByTestId} = await waitForElement(() => render(<Router><Main /></Router>));

        expect(getByTestId("main-list")).toBeInTheDocument();
        expect(getByTestId("main-button-insert")).toBeInTheDocument();
        expect(getByTestId("main-previous")).toBeInTheDocument();
        expect(getByTestId("main-next")).toBeInTheDocument();
    });
    test('test rendering components with reminders', async () =>{
        const response = {
            data: {
                "docs": [
                    {
                        "_id": "6464db16f34ffc0ec48463c4",
                        "title": "sdasad",
                        "description": "asdasd",
                        "period": "Daily",
                        "userId": "6464d65cf34ffc0ec4829d2f",
                        "createdAt": "2023-05-17T13:48:06.774Z",
                        "__v": 0
                    }
                ],
                "total": 1,
                "limit": 10,
                "offset": 0,
                "page": 1,
                "pages": 1
            }
        }
        api.get.mockImplementationOnce(() => Promise.resolve(response));
        const {getByTestId} = await waitForElement(() => render(<Router><Main /></Router>));
        expect(getByTestId("main-list")).toBeInTheDocument();
        expect(getByTestId("main-button-insert")).toBeInTheDocument();
        expect(getByTestId("main-link-to-reminder")).toBeInTheDocument();
        expect(getByTestId("main-button-delete-reminder")).toBeInTheDocument();
        expect(getByTestId("main-previous")).toBeInTheDocument();
        expect(getByTestId("main-next")).toBeInTheDocument();
    });
    test('test routing to new reminder page', async () => {
        const history = createMemoryHistory();

        const response = { data: {"docs": []} }
        api.get.mockImplementationOnce(() => Promise.resolve(response));

        await waitForElement(() =>
            render(<CustomRouter history={history}><Main/></CustomRouter>)
        );

        await userEvent.click(screen.getByText(/Insert New Reminder/));

        expect(history.location.pathname).toEqual('/reminders/new-reminder');
    });
});
