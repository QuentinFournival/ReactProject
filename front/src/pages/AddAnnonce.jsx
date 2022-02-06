import React, { Component } from "react";
import imgLBC from "../img/lbc.png";
import imgFB from "../img/facebook.png";
import imgV from "../img/vinted.png";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/categorie/",
});

class AddAnnonce extends Component {
    // Recuperation des Catégories:
    state = {
        categorie: [],
    };

    constructor() {
        super();
        api.get("/").then((res) => {
            this.setState({
                categorie: res.data,
            });
        });
    }

    handleNewPost = (e) => {
        let formData = new FormData();
        formData.append("codePostal", this.codePostal);
        formData.append("image", this.file);
        formData.append("categorie", this.categorie);
        formData.append("titre", this.titre);
        formData.append("description", this.description);
        formData.append("prix", this.prix);

        axios
            .post("http://localhost:8000/post/", formData, {
                headers: {
                    Authorization: localStorage.getItem("Authorization"),
                },
            })

            .then((res) => {
                if (res.data.errors) {
                    console.log("c'est pas bon");
                    console.log(formData);
                } else {
                    console.log("c'est tout bon");
                    console.log(formData);
                    // localStorage.setItem("Authorization", `Bearer ${res.data.accessToken} ` );
                }
            });
        axios.get("http://localhost:8000/post/", {
            headers: {
                Authorization: localStorage.getItem("Authorization"),
            },
        });
    };

    render() {
        return (
            <div>
                <div className="containerBox">
                    <form
                        action=""
                        className="formAnnonce"
                        onSubmit={this.handleNewPost}
                    >
                        <div className="annonce">
                            <div className="puce"></div>
                            <input
                                type="text"
                                placeholder="Code Postal"
                                onChange={(e) =>
                                    (this.codePostal = e.target.value)
                                }
                            />
                        </div>
                        <br />
                        <div className="annonce">
                            <div className="puce"></div>
                            <select
                                name="Catégorie"
                                id=""
                                placeholder="Catégorie"
                                onChange={(e) =>
                                    (this.categorie = e.target.value)
                                }
                            >
                                <option disabled selected>
                                    Catégorie
                                </option>
                                {this.state.categorie.map((data) => (
                                    <option value={data._id}>
                                        {data.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="annonce">
                            <div className="puce"></div>
                            <input
                                type="text"
                                placeholder="Titre"
                                onChange={(e) => (this.titre = e.target.value)}
                            />
                        </div>
                        <div className="annonce">
                            <div className="puce"></div>
                            <input
                                type="text"
                                placeholder="Description"
                                onChange={(e) =>
                                    (this.description = e.target.value)
                                }
                            />
                        </div>
                        <div className="annonce">
                            <div className="puce"></div>
                            <input
                                type="text"
                                placeholder="Prix"
                                onChange={(e) => (this.prix = e.target.value)}
                            />
                        </div>
                        <div className="annonce">
                            <div className="puce"></div>
                            <input
                                type="file"
                                placeholder="Photo"
                                name="picture"
                                onChange={(e) =>
                                    (this.file = e.target.files[0])
                                }
                            />
                        </div>

                        <p className="plateforme">
                            Sur quelle plateforme publier mon annonce ?
                        </p>
                        <div className="boxes">
                            <div className="checkbox">
                                <label htmlFor="LBC">
                                    <img src={imgLBC} alt="LBC" />
                                    LeBonCoin
                                </label>

                                <input type="checkbox" name="LBC" value="LBC" />
                            </div>
                            <div className="checkbox">
                                <label htmlFor="Facebook">
                                    <img src={imgFB} alt="FB" />
                                    Facebook
                                </label>
                                <input
                                    type="checkbox"
                                    name="Facebook"
                                    value="Facebook"
                                />
                            </div>
                            <div className="checkbox">
                                <label htmlFor="Vinted">
                                    <img src={imgV} alt="Vinted" />
                                    Vinted
                                </label>
                                <input
                                    type="checkbox"
                                    name="Vinted"
                                    value="Vinted"
                                />
                            </div>
                        </div>
                        <div className="container-btn">
                            <button onClick={() => this.props.toggleState(4)}>
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddAnnonce;
