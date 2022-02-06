import React, { Component } from "react";
import axios from "axios";
import AnnonceCardTitle from "./composant/AnnonceCardTitle";

const api = axios.create({
    baseURL: "http://localhost:8000/post/",
});
class ListAnnonce extends Component {
    state = {
        annonce: [],
    };

    constructor() {
        super();
        api.get("/", {
            headers: { Authorization: localStorage.getItem("Authorization") },
        }).then((res) => {
            this.setState({
                annonce: res.data,
            });
        });
    }
    render() {
        return (
            <div>
                <div className="container-annonce">
                    {this.state.annonce.map((data) => (
                        <AnnonceCardTitle
                            onClick={() => this.props.toggleState(6)}
                            titre={data.titre}
                            id={data._id}
                        />
                    ))}
                </div>
                <div className="container-btn">
                    <div
                        onClick={() => this.props.toggleState(3)}
                        className="btnAdd"
                        to="/add-annonce"
                    >
                        <div className="puce"></div>
                        Ajouter une annonce
                    </div>
                </div>
            </div>
        );
    }
}

export default ListAnnonce;
