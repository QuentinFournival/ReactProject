import React, { useState } from "react";
import Header from "./composant/header.jsx";
import ListAnnonce from "./ListAnnonce.jsx";
import Welcome from "./Welcome.jsx";
import AddAnnonce from "./AddAnnonce.jsx";
import Contact from "./Contact.jsx";
import AnnonceDetail from "./AnnonceDetail";
import Profil from "./profil.jsx";

const Annonce = () => {
    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
        setToggleState(index);
    };

    return (
        <div>
            <div
                className={
                    toggleState === 2 ? "content content-active" : "content"
                }
            >
                <Header titre="BLUBLOD" sousTitre="Ajouter une annonce" />
                <AddAnnonce toggleState={toggleTab} />
            </div>
            <div
                className={
                    toggleState === 1 ? "content content-active" : "content"
                }
            >
                <Header titre="BLUBLOD" sousTitre="Mes Annonces" />
                <ListAnnonce toggleState={toggleTab} />
            </div>
            <div
                className={
                    toggleState === 3 ? "content content-active" : "content"
                }
            >
                <Header titre=" BLUBLOD" sousTitre="MON PROFIL" />
                <Profil />
            </div>
            <div
                className={
                    toggleState === 6 ? "content content-active" : "content"
                }
            >
                <Header titre="BLUBLOD" />
                <AnnonceDetail toggleState={toggleTab} />
            </div>
            <div className="conten">
                <div className="navigation">
                    <ul>
                        <li
                            className={
                                toggleState === 1 ? "list active" : "list"
                            }
                        >
                            <div className="a" onClick={() => toggleTab(1)}>
                                <span className="icon">
                                    <ion-icon name="folder-open-outline"></ion-icon>
                                </span>
                                <span className="text">Mes Annonces</span>
                            </div>
                        </li>

                        <li
                            className={
                                toggleState === 2 ? "list active" : "list"
                            }
                        >
                            <div className="a" onClick={() => toggleTab(2)}>
                                <span className="icon">
                                    <ion-icon name="duplicate-outline"></ion-icon>
                                </span>
                                <span className="text">Ajouter</span>
                            </div>
                        </li>
                        <li
                            className={
                                toggleState === 3 ? "list active" : "list"
                            }
                        >
                            <div className="a" onClick={() => toggleTab(3)}>
                                <span className="icon">
                                    <ion-icon name="accessibility-outline"></ion-icon>
                                </span>
                                <span className="text">Mon compte</span>
                            </div>
                        </li>
                        <div className="indicator"></div>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Annonce;
