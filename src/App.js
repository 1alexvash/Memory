import React from "react";
import "./scss/main.css";

import Preloader from "./components/Preloader";
import Menu from "./components/Menu";
import GamePreview from "./components/GamePreview";
import Game from "./components/Game";
import Results from "./components/Results";

import { StoreProvider } from "easy-peasy";

import { HashRouter as Router, Route, Switch } from "react-router-dom";

import store from "./store";

const App = () => {
  return (
    <StoreProvider store={store}>
      <Router basename="/">
        <Switch>
          <Route exact path="/" render={() => <Preloader />} />
          <Route exact path="/menu" render={() => <Menu />} />
          <Route exact path="/game-preview" render={() => <GamePreview />} />
          <Route exact path="/game" render={() => <Game />} />
          <Route exact path="/results" render={() => <Results />} />
        </Switch>
      </Router>
    </StoreProvider>
  );
};

export default App;
