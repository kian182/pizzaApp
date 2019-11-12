import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Pizza App</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Pizza List</Link>
                        </li>
                          <li className="navbar-item">
                            <Link to="/list/topping" className="nav-link">Topping List</Link>
                          </li>
                        <li className="navbar-item">
                            <Link to="/create/pizza" className="nav-link">Add Pizza</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create/topping" className="nav-link">Add Topping</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}