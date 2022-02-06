import React from "react";
import img from "../../img/logo.png";

class Header extends React.Component {
    state = {
        titre: this.props.titre,
        sousTitre: this.props.sousTitre,
        texte: this.props.texte,
    };

    componentDidMount() {
        const sousTitre = document.getElementById("soustitre");
        const texte = document.getElementById("texte");
        if (sousTitre.textContent === "") {
            sousTitre.style.display = "none";
            texte.style.padding = "20px";
            texte.style.paddingTop = "40px";
        }
    }

    render() {
        return (
            <>
                <div className="header">
                    <div className="bg"></div>
                    <div className="logo">
                        <img src={img} alt="Logo Blublod" />
                    </div>
                    <h1>{this.state.titre}</h1>
                    <h2 id="soustitre">{this.state.sousTitre}</h2>
                    <p id="texte">{this.state.texte}</p>
                </div>
            </>
        );
    }
}

export default Header;
