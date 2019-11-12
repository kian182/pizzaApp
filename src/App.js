import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from "./components/navbar.component"
import PizzaList from "./components/pizza-list.component";
import EditPizza from "./components/edit-pizza.component";
import CreatePizza from "./components/create-pizza.component";
import CreateTopping from "./components/create-topping.component";
import ListTopping from "./components/topping-list.component";
import EditTopping from "./components/edit-topping.component";

function App() {
  return (
    <div className="container">
      <Router>
        <div className="container">
          <Navbar />
          <br/>
          <Route path="/" exact component={PizzaList} />
          <Route path="/edit/pizza/:id" component={EditPizza} />
          <Route path="/edit/topping/:id" component={EditTopping} />
          <Route path="/create/pizza" component={CreatePizza} />
          <Route path="/create/topping" component={CreateTopping} />
          <Route path="/list/topping" component={ListTopping} />
        </div>
      </Router>
    </div>
  );
}

export default App;
