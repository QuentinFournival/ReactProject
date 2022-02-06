import React from "react";
import { Link } from "react-router-dom";

class AnnonceCardTitle extends React.Component {
    state = {
        titre: this.props.titre,
    };

    render() {
        return (
            <>
                <Link
                    to={`/AnnonceDetail/${this.props.id}`}
                    className="annonce"
                >
                    <div className="puce"></div>
                    <p>{this.props.titre}</p>
                </Link>
            </>
        );
    }
}

export default AnnonceCardTitle;
