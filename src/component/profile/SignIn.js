import React, { Component } from 'react';
import { connect } from "react-redux";
// import { signIn } from "../../store/actions/authActions";

import "./sign-in.css"

class SignIn extends Component {

  state = {
    email: "",
    password: ""
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.signIn(this.state);
  };

  render() {
    const { authError } = this.props;
    return (
      <div id="sign-in">
          <h1>Witaj ponownie!</h1>
          <p>Użyj tego formularza, aby przejść na swój profil:</p>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Podaj e-mail"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Podaj hasło"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button>Zaloguj</button>
            { authError && <p>{ authError }</p> }
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // signIn: (creds) => dispatch(signIn(creds))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
