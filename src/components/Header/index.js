import React, {useEffect, useState} from "react";
import { createHashHistory } from 'history'
import {isAuthenticated, logout} from "../../services/auth";
import "./styles.css";

export default function Main () {
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
        window.location.reload(false);
    }

    return (
        <>
            {isAuthenticated() && (
                <header >
                    <div className="main-header">Light My Mind</div>
                    <div className="sair">
                        <button className="sair" onClick={doLogout}>Logout</button>
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