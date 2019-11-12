import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class PizzaList extends Component {
  constructor(props) {
    super(props);

    this.onDeleteAction = this.onDeleteAction.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      pizzasList: [],
      toppingsList: []
    };
  }

  componentDidMount() {
    this.getPizzasList();
    this.getToppingList();
  }

  getPizzasList(){
    axios.get('http://localhost:5000/pizzas/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            pizzasList: response.data.map(pizza => pizza)
          })
          console.log(this.state.pizzasList);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  getToppingList(){
    axios.get('http://localhost:5000/toppings/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            toppingsList: response.data.map(topping => topping.name)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onDeleteAction(e) {
    console.log(e);
  }

  handleClick = (e) => {
    e.preventDefault();
    console.log(e.target)
  };

  onSubmit(e) {
    e.preventDefault();

    const pizza = {
      name: this.state.name,
      description: this.state.description,
    };

    axios.post('http://localhost:5000/toppings/add', pizza)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Pizza List</h3>
        <div className="list-group">
          {
              this.state.pizzasList.map(function(pizza,i) {
                return <div key={i} className="list-group-item list-group-item-action flex-column align-items-start">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{pizza.name}</h5>
                    <div>
                      <Link to={"/edit/"+pizza._id}>edit</Link>
                    </div>
                  </div>
                  {
                    pizza.toppings.length > 0 ?
                      <strong><p className="mb-1">Toppings</p></strong>
                      : null
                  }
                    { pizza.toppings.length > 0 ?
                      <ul>
                        {pizza.toppings.map((topping,i) => <li key={i}>{topping.label}</li>)}
                      </ul>: null
                    }

                    <small>Description: {pizza.description}</small>
                </div>

              })
          }
        </div>
      </div>
    )
  }

}