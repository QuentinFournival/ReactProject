import React, { Component } from "react";
import Header from "./composant/header";
import { Link } from "react-router-dom";
import google from "../img/Google-Plus.png";
import twitter from "../img/Twitter-Circled.png";
import facebook from "../img/Facebook-Circled.png";
import axios from "axios";

const api = axios.create({
    baseURL: `http://localhost:8000/`,
});

class Login extends Component {
    handleSignUp = (e) => {
        e.preventDefault();
        const data = {
            name: this.name,
            firstname: this.firstname,
            email: this.email,
            password: this.password,
            confPassword: this.confPassword,
            phone: this.phone,
            codePostal: this.codePostal,
            city: this.city,
        };

        axios.post("http://localhost:8000/", data).then((res) => {
            if (res.data.errors) {
                console.log("c'est pas bon");
            } else {
                window.location = "/";

                console.log("c'est tout bon");
                console.log(res);
                // localStorage.setItem("Authorization", `Bearer ${res.data.accessToken} ` );
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
                    <Link to="/" className="signin" type="submit">
                        Sign up
                    </Link>
                    <div className="deco unIns ">
                        xxx <br />
                        xxxxxxx <br />
                        xxx
                    </div>

                    <form
                        className="formIns"
                        onSubmit={this.handleSignUp}
                        action=""
                    >
                        <div className="container-input">
                            <div className="input-dot"></div>
                            <input
                                type="mail"
                                onChange={(e) => (this.email = e.target.value)}
                                placeholder="Adresse mail"
                            />

                            <div className="separator"></div>
                            <div className="error mail"></div>
                        </div>
                        <div className="container-input">
                            <div className="input-dot"></div>
                            <input
                                type="password"
                                onChange={(e) =>
                                    (this.password = e.target.value)
                                }
                                placeholder="Mot de passe"
                            />

                            <div className="separator"></div>
                            <div className="error mail"></div>
                        </div>
                        <div className="container-input">
                            <div className="input-dot"></div>
                            <input
                                type="password"
                                onChange={(e) =>
                                    (this.confPassword = e.target.value)
                                }
                                placeholder="Confirmation mot de passe"
                            />
                            <div className="separator"></div>
                            <div className="error mail"></div>
                        </div>
                        <div className="container-input">
                            <div className="input-dot"></div>
                            <input
                                type="text"
                                onChange={(e) => (this.name = e.target.value)}
                                placeholder="Nom"
                            />

                            <div className="separator"></div>
                            <div className="error mail"></div>
                        </div>
                        <div className="container-input">
                            <div className="input-dot"></div>
                            <input
                                type="text"
                                onChange={(e) =>
                                    (this.firstname = e.target.value)
                                }
                                placeholder="Prenom"
                            />
                            <div className="separator"></div>
                            <div className="error mail"></div>
                        </div>
                        <div className="container-input">
                            <div className="input-dot"></div>
                            <input
                                type="text"
                                onChange={(e) =>
                                    (this.codePostal = e.target.value)
                                }
                                placeholder="Code Postal"
                            />
                            <div className="separator"></div>
                            <div className="error codePostal"></div>
                        </div>
                        <div className="container-input">
                            <div className="input-dot"></div>
                            <input
                                type="text"
                                onChange={(e) => (this.city = e.target.value)}
                                placeholder="Ville"
                            />
                            <div className="separator"></div>
                            <div className="error ville"></div>
                        </div>
                        <div className="container-input">
                            <div className="input-dot"></div>
                            <input
                                type="text"
                                onChange={(e) => (this.phone = e.target.value)}
                                placeholder="Telephone"
                            />
                            <div className="separator"></div>
                            <div className="error telephone"></div>
                        </div>
                        <div className="container-btn">
                            <button>Inscription</button>
                        </div>
                    </form>
                    <div className="separatorIns"></div>
                    <div className="container-google">
                        <p>Connectez-vous avec vos comptes : </p>
                        <a href="/">
                            <img src={facebook} alt="" />
                        </a>
                        <a href="/">
                            <img src={google} alt="" />
                        </a>
                        <a href="/">
                            <img src={twitter} alt="" />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
