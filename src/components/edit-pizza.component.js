import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';

const animatedComponents = makeAnimated();

export default class EditPizza extends Component {
  constructor(props) {
    super(props);

    this.onDeleteAction = this.onDeleteAction.bind(this);
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
    this.populatePizzaInfo();
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
      })
      .catch((error) => {
        console.log(error);
      })
  }

  populatePizzaInfo(){
    axios.get('http://localhost:5000/pizzas/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.name,
          description: response.data.description,
          newToppings: response.data.toppings
        })
      })
      .catch(function (error) {
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
      console.log(newToppins)
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

    axios.post('http://localhost:5000/pizzas/update/' +
      this.props.match.params.id, pizza)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  onDeleteAction = (e) => {
    e.preventDefault();
    axios.delete('http://localhost:5000/pizzas/'+this.props.match.params.id)
      .then(response => { console.log(response.data)});
    window.location = '/';
  };

  render() {
    return (
      <div>
        <h3>Edit Pizza</h3>
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
              style={{width: `${(8*this.state.newToppings.length) + 100}px`}}
              className="select-custom-class"
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              value={this.state.newToppings}
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
            <input type="submit" value="Update Pizza" className="btn btn-primary" />
          </div>
          <button type="button"
                  className="btn btn-danger"
                  onClick={e => this.onDeleteAction(e)}>Delete Pizza</button>
        </form>
      </div>
    )
  }

}