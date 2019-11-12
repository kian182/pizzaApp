import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTopping extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      description: '',
      error: false,
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

    axios.post('http://localhost:5000/toppings/add', pizza)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Add New Topping</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>*Topping name: </label>
            <input  type="text"
                    required
                    className="form-control"
                    value={this.state.name}
                    onChange={this.onChangeName}
            />
            {
              this.state.error ?
              <label className="text-danger">This topping already exists</label>
              : null
            }
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
            <input type="submit"
                   disabled={this.state.error}
                   value="Add Topping" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }

}