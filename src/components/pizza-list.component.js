import React, { Component } from 'react';
import axios from 'axios';

export default class PizzaList extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
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
          console.log(response.data)
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

  onChangeName(e) {
    this.setState({
      error: this.state.toppingsList.find(x => x === e.target.value),
      name: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const pizza = {
      name: this.state.name,
      description: this.state.description,
    };

    console.log(pizza);

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
                      <small>Edit</small>
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