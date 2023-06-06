import React, {useState} from "react";
import { createHashHistory } from 'history'
import {isAuthenticated, logout} from "../../services/auth";
import "./styles.css";

export default function LoggedIn () {
    const [headerPage, setHeaderPage] = useState({
        loggedIn: isAuthenticated(),
    });

    const doLogout = () => {
        logout();
        setHeaderPage({ ...headerPage, loggedIn: false })
        createHashHistory().push("/");
        window.location.reload();
    }

    return (
        <>
            {isAuthenticated() && (
                <header >
                    <div className="logout" data-testid="header-logout">
                        <button className="logout" onClick={doLogout}>Logout</button>
                    </div>
                </header>
            )
            }
        </>
    );
}