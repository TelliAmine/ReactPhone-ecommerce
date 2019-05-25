import React, { Component } from "react";
//import logo from './logo.svg';
import { Switch, Route } from "react-router-dom";
import "./App.css";
import "./bootstrap.min.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Card from "./components/cart/Card";
import Default from "./components/Default";
import Modal from "./components/Modal";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route path="/card" component={Card} />
          <Route path="/details" component={Details} />
          <Route component={Default} />
        </Switch>
        <Modal />
      </React.Fragment>
    );
  }
}

export default App;
