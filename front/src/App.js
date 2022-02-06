import React from "react";
import { Route, Switch } from "react-router";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import AddAnnonce from "./pages/AddAnnonce.jsx";
import UpdateAnnonce from "./pages/UpdateAnnonce.jsx";
import Inscription from "./pages/Inscription.jsx";
import ListAnnonce from "./pages/ListAnnonce.jsx";
import Error from "./pages/404.jsx";
import AnnonceDetail from "./pages/AnnonceDetail";

const App = () => {
    return (
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/add-annonce" component={AddAnnonce} />
            <Route exact path="/update-annonce" component={UpdateAnnonce} />
            <Route exact path="/inscription" component={Inscription} />
            <Route exact path="/list" component={ListAnnonce} />
            <Route exact path="/404" component={Error} />
            <Route exact path="/AnnonceDetail/:id" component={AnnonceDetail} />
        </Switch>
    );
};

export default App;
