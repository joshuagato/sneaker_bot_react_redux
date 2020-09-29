import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import './Register.scss';

class Register extends Component {

  state = {
    registerData: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      repassword: ''
    }
  }

  inputHandler = event => {
    const updatedData = { ...this.state.registerData };
    updatedData[event.target.name] = event.target.value;
    this.setState({ registerData: updatedData });
  }

  registerHandler = event => {
    event.preventDefault();
    this.props.onRegister(this.state.registerData);
  }

  render() {
    const input = this.state.registerData;
    return (
      <div id="register-container">
        <div className="register-form">
          <form onSubmit={this.registerHandler}>
            <div className="heading">
              <h2>REGISTER HERE</h2>
            </div>
            <div className="form-group">
              <input type="text" name="firstname" autoComplete="off" onChange={this.inputHandler} 
                value={input.firstname} required />
              <label htmlFor="firstname">
                <span>First Name</span>
              </label>
            </div>
            <div className="form-group">
              <input type="text" name="lastname" autoComplete="off" onChange={this.inputHandler} 
                value={input.lastname} required />
              <label htmlFor="lastname">
                <span>Last Name</span>
              </label>
            </div>
            <div className="form-group">
              <input type="email" name="email" autoComplete="off" onChange={this.inputHandler} 
                value={input.email} required />
              <label htmlFor="email">
                <span>Email</span>
              </label>
            </div>
            <div className="form-group">
              <input type="password" name="password" autoComplete="off" onChange={this.inputHandler} 
                value={input.password} required />
              <label htmlFor="password">
                <span>Password</span>
              </label>
            </div>
            <div className="form-group">
              <input type="password" name="repassword" autoComplete="off" onChange={this.inputHandler} 
                value={input.repassword} required />
              <label htmlFor="repassword">
                <span>Confirm Password</span>
              </label>
            </div>
            <div className="button-group">
              <button type="submit" className="grow_spin">JOIN US</button>
            </div>
            <div className="button-group">
              <span className="question">Already with us?</span>
              <NavLink to="/" className="button button--nanuk button--text-thick button--text-upper button--size-s button--border-thick">
                <span>L</span><span>o</span><span>g</span><span>i</span><span>n</span>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRegister: inputData => dispatch(actions.register(inputData))
  }
}

export default connect(null, mapDispatchToProps)(Register);
