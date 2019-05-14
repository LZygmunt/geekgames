import React, { Component}  from 'react';
// import { signUp } from "../../store/actions/authActions";
import { connect } from "react-redux";

import "./sign-up.css"

class SignUp extends Component {

  state = {
    nick: "",
    email: "",
    password: "",
    passwordConfirm: "",
    colorTheme: "default",
    city: "",
    avatar: ""
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.signUp(this.state);
  };

  render() {
    const { authError } = this.props;
    //todo zrobić dodawanie obrazka
    return (
      <div id="sign-up">
          <h1>Witaj!</h1>
          <p>Użyj tego formularza, aby zacząć korzystać ze wszystkich możliwości naszego portalu:</p>
        <form onSubmit={this.handleSubmit} name="signUp">
          <div>
            <input
              type="text"
              name="nick"
              placeholder="Podaj nick"
              value={this.state.nick}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="city"
              placeholder="Podaj miejscowość"
              value={this.state.city}
              onChange={this.handleChange}
            />
          </div>
          {/*<div>*/}
          {/*  <input*/}
          {/*    type="text"*/}
          {/*    name="avatar"*/}
          {/*    value={this.state.avatar}*/}
          {/*    onChange={this.handleChange}*/}
          {/*  />*/}
          {/*</div>*/}
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
            <input
              type="password"
              name="passwordConfirm"
              placeholder="Potwierdź hasło"
              value={this.state.passwordConfirm}
              onChange={this.handleChange}
              onMouseOver={(event) => {event.target.background = "yellow"}}
            />
          </div>
          <div>
            <button name="signUp">Zarejsetruj</button>
            {authError && <p>{authError}</p>}
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
    // signUp: (creds) => dispatch(signUp(creds))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
