import React from 'react';
import axios from "axios";
import api from "./api";

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

describe('api', () =>{
    test('test auth post api', async () =>{
        const responseObj = {
            data: {
                token: 'ABCDE',
                userId: 123
            }
        }
        api.post.mockImplementationOnce(() => Promise.resolve(responseObj));
        const response = await api.post("/auth", { data: {username: "test@mail.com", password: "123456" } });

        expect(response).toEqual(responseObj);

    });
});
