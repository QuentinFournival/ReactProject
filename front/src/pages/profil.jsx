import React, { Component } from "react";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/",
});

class Profil extends Component {
    state = {
        user: "",
    };

    constructor() {
        super();
        api.get("/", {
            headers: { Authorization: localStorage.getItem("Authorization") },
        }).then((res) => {
            this.setState({
                user: res.data[0],
            });
        });
    }

    handleUserUpdate = (e) => {
        e.preventDefault();
        const data = {
            name: this.name,
            firstname: this.firstname,
            codePostal: this.codePostal,
            city: this.city,
            phone: this.phone,
        };
        api.put("/", data, {
            headers: { Authorization: localStorage.getItem("Authorization") },
        }).then((res) => {
            if (res.data.errors) {
                console.log("c'est pas bon");
            } else {
                window.location = "/home";
            }
        });
    };

    render() {
        return (
            <div>
                <div className="cont profil">
                    <form action="" onSubmit={this.handleUserUpdate}>
                        <div className="container-input">
                            <div className="input-dot"></div>
                            <input
                                type="text"
                                onChange={(e) =>
                                    (this.firstname = e.target.value)
                                }
                                placeholder={this.state.user.firstname}
                            />
                            <div className="separator"></div>
                            <div className="error nom"></div>
                        </div>
                        <div className="container-input">
                            <div className="input-dot"></div>
                            <input
                                type="text"
                                onChange={(e) => (this.name = e.target.value)}
                                placeholder={this.state.user.name}
                            />
                            <div className="separator"></div>
                            <div className="error nom"></div>
                        </div>

                        <div className="container-input">
                            <div className="input-dot"></div>
                            <input
                                type="mail"
                                value={this.state.user.email}
                                disabled
                            />
                            <div className="separator"></div>
                            <div className="error mail"></div>
                        </div>

                        <div className="container-input">
                            <div className="input-dot"></div>
                            <input
                                type="password"
                                placeholder="********"
                                disabled
                            />
                            <div className="separator"></div>
                            <div className="error password">
                                Email non réglementaire
                            </div>
                        </div>

                        <div className="container-input">
                            <div className="input-dot"></div>
                            <input
                                type="text"
                                onChange={(e) =>
                                    (this.codePostal = e.target.value)
                                }
                                placeholder={this.state.user.codePostal}
                            />
                            <div className="separator"></div>
                            <div className="error adresse"></div>
                        </div>

                        <div className="container-input">
                            <div className="input-dot"></div>
                            <input
                                type="text"
                                onChange={(e) => (this.city = e.target.value)}
                                placeholder={this.state.user.city}
                            />
                            <div className="separator"></div>
                            <div className="error ville"></div>
                        </div>

                        <div className="container-input">
                            <div className="input-dot"></div>
                            <input
                                type="text"
                                onChange={(e) => (this.phone = e.target.value)}
                                placeholder={this.state.user.phone}
                            />
                            <div className="separator"></div>
                            <div className="error tel"></div>
                        </div>

                        <div className="container-btn">
                            <button>Enregistrer</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Profil;
