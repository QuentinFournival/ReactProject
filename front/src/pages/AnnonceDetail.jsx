import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./composant/header.jsx";
import img2 from "../img/monnaie.png";
import img3 from "../img/modify.png";
import img4 from "../img/delete.png";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/post/",
});

class AnnonceDetail extends Component {
    postID = window.location.pathname.split("/")[2];

    state = {
        annonce: [],
        categorie: [],
    };

    constructor() {
        super();
        api.get(`/${this.postID}`, {
            headers: { Authorization: localStorage.getItem("Authorization") },
        }).then((res) => {
            this.setState({
                annonce: res.data,
                categorie: res.data.categorie,
                sousTitre: res.data.titre,
                text: res.data.categorie.name,
            });
        });
    }

    // componentDidMount(){
    // 	const input = document.querySelectorAll(".inputModif");
    // 	const btn = document.querySelector('#btn');
    // 	btn.addEventListener('click',() =>{
    // input.disabled = false;
    // 	})

    // }

    modify = async () => {
        document.querySelectorAll(".inputModif").disabled = false;
    };

    render() {
        return (
            <div>
                <Header
                    titre="Blublod"
                    sousTitre={this.state.annonce.titre}
                    texte={this.state.categorie.name}
                />
                <div className="annonce-container">
                    <img
                        className="annonce-picture"
                        src={this.state.annonce.picture}
                        alt=""
                    />
                    <h1>
                        <input
                            className="inputModif"
                            type="text"
                            placeholder={this.state.annonce.titre}
                        />
                    </h1>
                    <div className="annonce-separator"></div>
                    <div className="info">
                        <p className="code-postal">
                            <input
                                className="inputModif"
                                type="text"
                                placeholder={this.state.annonce.codePostal}
                            />
                        </p>
                        <p className="prix">
                            <input
                                className="inputModif"
                                type="text"
                                placeholder={this.state.annonce.prix}
                            />
                        </p>
                        <img src={img2} alt="" />
                    </div>
                    <div className="description">
                        <input
                            className="inputModif"
                            type="text"
                            placeholder={this.state.annonce.description}
                        />
                    </div>
                    <div className="bottom-card">
                        <div id="btn" className="modify">
                            <img src={img3} alt="" />
                        </div>
                        <div className="container-btn">
                            <button>Enregistrer modifications</button>
                        </div>
                        <div className="delete">
                            <img src={img4} alt="" />
                        </div>
                    </div>
                </div>
                <div className="sold">
                    <input type="checkbox" />
                    <label htmlFor="">Vendu?</label>
                </div>
                <Link to="/home">Retour</Link>
            </div>
        );
    }
}

export default AnnonceDetail;
