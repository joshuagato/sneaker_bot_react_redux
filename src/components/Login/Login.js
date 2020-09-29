import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import './Login.scss';
import * as actions from '../../store/actions/index';

class Login extends Component {

  state = {
    loginData: {
      email: '',
      password: ''
    }
  }

  inputHandler = event => {
    const updatedData = { ...this.state.loginData };
    updatedData[event.target.name] = event.target.value;
    this.setState({ loginData: updatedData });
  }

  loginHandler = event => {
    event.preventDefault();
    this.props.onLogin(this.state.loginData).then(result => {
      if (result) this.props.history.replace('/interface');
    });
  }

  render() {
    const input = this.state.loginData;
    return (
      <div id="login-container">
        <div className="login-form">
          <form onSubmit={this.loginHandler}>
            <div className="heading">
              <h2>LOG IN HERE</h2>
            </div>
            <div className="user-icon">
              <FontAwesomeIcon size="3x" icon={faUsers} />
            </div>
            <div className="form-group">
              <input type="text" name="email" autoComplete="off" onChange={this.inputHandler} 
                value={input.email} required />
              <label htmlFor="email">
                <span className="content-name">Email</span>
              </label>
            </div>
            <div className="form-group">
              <input type="password" name="password" autoComplete="off" onChange={this.inputHandler} 
                value={input.password} required />
              <label htmlFor="password">
                <span className="content-name">Password</span>
              </label>
            </div>
            <div className="button-group">
              <button type="submit" className="grow_ellipse">Log In</button>
            </div>
            <div className="button-group">
              <span className="question">Not a member yet?</span>
              <NavLink to="/register" className="button button--nanuk button--text-thick button--text-upper button--size-s button--border-thick">
                <span>R</span><span>e</span><span>g</span><span>i</span><span>s</span><span>t</span><span>e</span><span>r</span>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.loginReducer.token !== '' || state.loginReducer.token !== null || 
      state.loginReducer.user.email !== '' || state.loginReducer.email !== ''
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: inputData => dispatch(actions.login(inputData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
