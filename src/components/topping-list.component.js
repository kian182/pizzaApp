import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class ToppingList extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      toppingsList: []
    };
  }

  componentDidMount() {
    this.getToppingList();
  }

  getToppingList(){
    axios.get('http://localhost:5000/toppings/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            toppingsList: response.data.map(topping => topping)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

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
        <h3>Topping List</h3>
        <div className="list-group">
          {
            this.state.toppingsList.map(function(topping,i) {
              return <div key={i} className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{topping.name}</h5>
                  <div>
                    <Link to={"/edit/topping/"+topping._id}>edit</Link>
                  </div>
                </div>
                <small>Description: {topping.description}</small>
              </div>

            })
          }
        </div>
      </div>
    )
  }

}