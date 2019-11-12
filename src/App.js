import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from "./components/navbar.component"
import PizzaList from "./components/pizza-list.component";
import EditPizza from "./components/edit-pizza.component";
import CreatePizza from "./components/create-pizza.component";
import CreateTopping from "./components/create-topping.component";

function App() {
  return (
    <div className="container">
      <Router>
        <div className="container">
          <Navbar />
          <br/>
          <Route path="/" exact component={PizzaList} />
          <Route path="/edit/:id" component={EditPizza} />
          <Route path="/create" component={CreatePizza} />
          <Route path="/topping" component={CreateTopping} />
        </div>
      </Router>
    </div>
  );
}

export default App;
