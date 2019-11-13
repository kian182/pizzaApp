import React, { Component } from 'react';
import axios from "axios/index";

export default class EditTopping extends Component {
  constructor(props) {
    super(props);

    this.onDeleteAction = this.onDeleteAction.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      description: ''
    };
  }

  componentDidMount() {
    this.populateToppingInfo();
  }

  populateToppingInfo(){
    axios.get('http://localhost:5000/toppings/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.name,
          description: response.data.description,
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

  onSubmit(e) {
    e.preventDefault();

    const topping = {
      name: this.state.name,
      description: this.state.description
    };

    axios.post('http://localhost:5000/toppings/update/' +
      this.props.match.params.id, topping)
      .then(res => console.log(res.data));

    window.location = '/list/topping';
  }

  onDeleteAction = (e) => {
    e.preventDefault();
    axios.delete('http://localhost:5000/toppings/'+this.props.match.params.id)
      .then(response => { console.log(response.data)});
    window.location = '/list/topping';
  };

  render() {
    return (
      <div>
        <h3>Edit Topping</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>*Topping name: </label>
            <input  type="text"
                    required
                    className="form-control"
                    value={this.state.name || ''}
                    onChange={this.onChangeName}
            />
          </div>

          <div className="form-group">
            <label>Description: </label>
            <input  type="text"
                    className="form-control"
                    value={this.state.description || ''}
                    onChange={this.onChangeDescription}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Update Topping" className="btn btn-primary" />
          </div>
          <button type="button"
                  className="btn btn-danger"
                  onClick={e => this.onDeleteAction(e)}>Delete Topping</button>
        </form>
      </div>
    )
  }

}