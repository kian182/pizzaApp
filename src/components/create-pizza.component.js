import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';

const animatedComponents = makeAnimated();

export default class CreatePizza extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeToppings = this.onChangeToppings.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      description: '',
      toppingsList: [],
      newToppings: [],
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
            toppingsList: response.data.map(topping => topping.name),
            toppingsModel: response.data[0].name
          })
        }
        else{
          this.setState({
            toppingsModel: 'No toppings available'
          });
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeToppings(newToppins) {
    this.setState({
      newToppings: newToppins
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const pizza = {
      name: this.state.name,
      description: this.state.description,
      toppings: this.state.newToppings,
    };

    console.log(pizza);

    axios.post('http://localhost:5000/pizzas/add', pizza)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Add New Pizza</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>*Pizza name: </label>
            <input  type="text"
                    required
                    className="form-control"
                    value={this.state.name}
                    onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input  type="text"
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
            />
          </div>

          <div className="form-group">
            <label>Toppings: </label>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              onChange={this.onChangeToppings}
              options={
              this.state.toppingsList.map(function(topping) {
                return {
                  value: topping,
                  label: topping
                }
              })
            } />
          </div>

          <div className="form-group">
            <input type="submit" value="Create Pizza" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}