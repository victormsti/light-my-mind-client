import React from 'react';
import {render, waitForElement} from "@testing-library/react";
import {BrowserRouter as Router} from 'react-router-dom';
import axios from "axios";
import api from "../../services/api";
import Reminder from "./index";
import expect from "expect";

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

describe('reminder', () =>{
    test('test rendering components with reminder', async () =>{
        const response = {
            data: {
                "_id": "6464db16f34ffc0ec48463c4",
                "title": "sdasad",
                "description": "asdasd",
                "period": "Daily",
                "userId": "6464d65cf34ffc0ec4829d2f",
                "createdAt": "2023-05-17T13:48:06.774Z",
                "__v": 0
            }
        }
        api.get.mockImplementation(() => Promise.resolve(response));
        const {getByTestId} = await waitForElement(() => render(<Router><Reminder /></Router>));
        expect(getByTestId("reminder-info")).toBeInTheDocument();
        expect(getByTestId("reminder-title")).toHaveTextContent("sdasad");
        expect(getByTestId("reminder-description")).toHaveTextContent("asdasd");
        expect(getByTestId("reminder-createdAt")).toHaveTextContent("2023-05-17T13:48:06.774Z");
        expect(getByTestId("reminder-period")).toHaveTextContent("Daily");
    });
});
