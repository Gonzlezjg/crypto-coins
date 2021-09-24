import React, { useEffect, useReducer } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Context
import CoinState from "./context/coins/CoinState";
import { AuthContext } from "./context/auth/AuthContext";
import { authReducer } from "./context/auth/AuthReducer";

// Components
import Heading from "./Components/Heading";
import Inicio from "./Components/Inicio";
import Signup from "./Components/Signup";
import Footer from "./Components/Footer";
import Coin from "./Components/Coin";
import Login from "./Components/Login";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const initialize = () => {
  return JSON.parse(localStorage.getItem("user")) || { logged: false };
};



function App() {
  
  const [user, dispatch] = useReducer( authReducer, {}, initialize );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <div
      className="App"
      style={{ backgroundColor: "#222831", minHeight: "100vh", width: "100%" }}
    >
      <AuthContext.Provider value={{ user, dispatch }}>
        <Router>
          <Heading />
          <Switch>
            <CoinState>
              <Route path="/" component={Inicio} exact />
              <Route path="/signup" component={Signup} exact />
              <Route path="/login" component={Login} />
              <Route path="/coins/:coinName" component={Coin} />
            </CoinState>
          </Switch>
        </Router>
        <Footer />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
