import React, {useEffect, useState} from "react";
import { createHashHistory } from 'history'
import {isAuthenticated, logout} from "../../services/auth";
import "./styles.css";

export default function Header () {
    const [headerPage, setHeaderPage] = useState({
        loggedIn: false
    });

    useEffect(() =>{
        if(isAuthenticated()){
            setHeaderPage({loggedIn: true});
        }
    }, [setHeaderPage]);

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
                    <div className="main-header" data-testid="header-main-authenticated">Light My Mind</div>
                    <div className="logout" data-testid="header-logout">
                        <button className="logout" onClick={doLogout}>Logout</button>
                    </div>
                </header>
            )
            }
            {!isAuthenticated() &&
                <header >
                    <div className="main-header">Light My Mind</div>
                </header>
            }
        </>
    );
}