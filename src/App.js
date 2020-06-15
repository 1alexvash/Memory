import React from "react";
import "./scss/main.css";

import Preloader from "./components/Preloader";
import Menu from "./components/Menu";
import GamePreview from "./components/Game/GamePreview";
import Game from "./components/Game/Game";
import Results from "./components/Results";

import { HashRouter as Router, Route } from "react-router-dom";

const App = () => (
  <Router basename="/">
    <Route exact path="/" render={() => <Preloader />} />
    <Route exact path="/menu" render={() => <Menu />} />
    <Route exact path="/game-preview" render={() => <GamePreview />} />
    <Route exact path="/game" render={() => <Game />} />
    <Route exact path="/results" render={() => <Results />} />
  </Router>
);

export default App;
