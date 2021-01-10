import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { usePersistedState } from "../hooks/custom-hooks"

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import items from "../data/data";
import { GameContext } from "./GameContext";
import useInterval from "../hooks/use-interval.hook";

function App(props) {
  const { 
    numCookies,
    setNumCookies,
    purchasedItems,
    setPurchasedItems,
    cookiesPerSecond,
  } = React.useContext(
    GameContext
  );
  useInterval(() => {
    setNumCookies(numCookies + cookiesPerSecond);
  }, 1000);

  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game 
            numCookies={numCookies}
            setNumCookies={setNumCookies}
            purchasedItems={purchasedItems}
            setPurchasedItems={setPurchasedItems}
            cookiesPerSecond={cookiesPerSecond}
          />
        </Route>
      </Router>
    </>
  );
}

export default App;
