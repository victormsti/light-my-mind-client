import React from 'react';
import {render} from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import SignIn from "./index";

describe('login', () =>{
    test('test rendering components', () =>{
        const {getByTestId} = render(<Router><SignIn /></Router>);
        expect(getByTestId("login-container")).toBeInTheDocument();
        expect(getByTestId("login-form")).toBeInTheDocument();
        expect(getByTestId("login-link")).toBeInTheDocument();
    })
})