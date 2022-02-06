import React, { Component } from "react";
import Header from "./composant/header";
import { Link } from "react-router-dom";
import axios from "axios";

class Login extends Component {
    handleLogin = (e) => {
        e.preventDefault();
        // const emailError = document.querySelector('.error.mail.');
        // const passwordError = document.querySelector('.password.error');
        const data = {
            email: this.email,
            password: this.password,
        };
        axios.post("http://localhost:8000/login", data).then((res) => {
            if (res.data.errors) {
                console.log("c'est pas bon");
                // emailError.innerHTML = res.data.errors.email;
                // passwordError.innerHTML = res.data.errors.password;
            } else {
                window.location = "/home";

                console.log("c'est tout bon");
                console.log(res);
                localStorage.setItem(
                    "Authorization",
                    `Bearer ${res.data.accessToken} `
                );
            }
        });
    };

    render() {
        return (
            <div>
                <Header
                    titre="BLUBLOD"
                    sousTitre=""
                    texte="La première application vous permettant de poster vos annonces partout en un clic ! "
                />
                <div className="cont">
                    <Link to="/inscription" className="signin" type="submit">
                        Sign in
                    </Link>
                    <div className="deco un ">
                        xxx <br />
                        xxxxxxx <br />
                        xxx
                    </div>
                    <div className="deco deux ">
                        xxx <br />
                        xxxxxxx <br />
                        xxx
                    </div>
                    <form onSubmit={this.handleLogin}>
                        <div className="container-input">
                            <div className="input-dot"></div>
                            <input
                                id="email"
                                type="mail"
                                placeholder="Adresse mail"
                                onChange={(e) => (this.email = e.target.value)}
                            />
                            <div className="separator"></div>
                            <div className="error mail"></div>
                        </div>

                        <div className="container-input">
                            <span className="input-dot"></span>
                            <input
                                id="password"
                                type="password"
                                placeholder="Mot de passe"
                                onChange={(e) =>
                                    (this.password = e.target.value)
                                }
                            />
                            <div className="separator"></div>
                            <div className="error password"></div>
                        </div>
                        <div className="container-btn">
                            <input type="submit" value=" connection" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
