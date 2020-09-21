import React,{Component} from "react";
import { createHashHistory } from 'history'
import { isAuthenticated, logout } from "../../services/auth";
import "./styles.css";

export default class Main extends Component{

    state = {
        loggedIn: false
    };

    doLogout = () => {
        logout();
        this.setState({ loggedIn: false })
        createHashHistory().push("/");
        window.location.reload(false);
    }

    render(){

        if(isAuthenticated()){
            return(
                <header >
                    <div className="main-header">Light My Mind</div>
                <div className="sair">
                    <button className="sair" onClick={this.doLogout}>Logout</button>
                    </div>
                </header>
            );
        }
        else{
            return(
                <header >
                    <div className="main-header">Light My Mind</div>
                </header>
            );
        }
    }
}