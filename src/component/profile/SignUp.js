import React, { Component}  from 'react';
import { signUp } from "../../store/actions/authActions";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";

import "./sign-up.css"

class SignUp extends Component {

  state = {
    nick: "",
    email: "",
    password: "",
    passwordConfirm: "",
    colorTheme: "first-set",
    city: "",
    errorMsg: {
      email: null,
      password: null,
      passwordConfirm: null,
      nick: null
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });

  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.signUp(this.state, this.props.firebase);
  };

  handleBlur = event => {
    const target = event.target;
    let msg;
    switch (target.id) {
      case "nick":
        if(target.value.length > 20) {
          msg = "Nazwa użytkownika powinna wynosić mniej niż 20 znaków";
          this.setState(prevState => { return {
            errorMsg: { ...prevState.errorMsg, nick: msg }
          }});
        } else {
          msg = null;
          this.setState(prevState => { return {
            errorMsg: { ...prevState.errorMsg, nick: null }
          }});
        }
        break;
      case "email":
        if(target.value.indexOf("@") < 0) {
          msg = "Błędny adres e-mail";
          this.setState(prevState => { return {
            errorMsg: { ...prevState.errorMsg, email: msg }
          }});
        } else {
          msg = null;
          this.setState(prevState => { return {
            errorMsg: { ...prevState.errorMsg, email: null }
          }});
        }
        break;
      case "password":
        if(target.value.length < 8) {
          msg = "Hasło powinno wynosić więcej niż 8 znaków";
          this.setState(prevState => { return {
            errorMsg: { ...prevState.errorMsg, password: msg }
          }});
        } else {
          msg = null;
          this.setState(prevState => { return {
            errorMsg: { ...prevState.errorMsg, password: null }
          }});
        }
        break;
      case "passwordConfirm":
        if(target.value !== this.state.password) {
          msg = "Hasła się nie pokrywają";
          this.setState(prevState => { return {
            errorMsg: { ...prevState.errorMsg, passwordConfirm: msg }
          }});
        } else {
          msg = null;
          this.setState(prevState => { return {
            errorMsg: { ...prevState.errorMsg, passwordConfirm: null }
          }});
        }
        break;
      default:
        msg = null;
        break;
    }
  };

  render() {
    const { authError } = this.props;
    return (
      <div id="sign-up">
          <h1>Witaj!</h1>
          <p>Użyj tego formularza, aby zacząć korzystać ze wszystkich możliwości naszego portalu:</p>
        <form
          onSubmit={ this.handleSubmit }
          name="signUp"
          noValidate
        >
          <div>
            <input
              type="text"
              name="nick"
              id="nick"
              className={ !!this.state.errorMsg.nick ? "error-msg" : "" }
              placeholder="Podaj nazwę użytkownika"
              value={ this.state.nick }
              onChange={ this.handleChange }
              onBlur={ this.handleBlur }
            />
            <span className="error-msg">{ this.state.errorMsg.nick }</span>
          </div>
          <div>
            <input
              type="text"
              name="city"
              id="city"
              placeholder="Podaj miejscowość"
              value={ this.state.city }
              onChange={ this.handleChange }
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              className={ !!this.state.errorMsg.email ? "error-msg" : "" }
              placeholder="Podaj e-mail"
              value={ this.state.email }
              onChange={this.handleChange }
              onBlur={ this.handleBlur }
            />
            <span className="error-msg">{ this.state.errorMsg.email }</span>
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              className={ !!this.state.errorMsg.password ? "error-msg" : "" }
              placeholder="Podaj hasło"
              value={ this.state.password }
              onChange={ this.handleChange }
              onBlur={ this.handleBlur }
            />
            <span className="error-msg">{ this.state.errorMsg.password }</span>
          </div>
          <div>
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              className={ !!this.state.errorMsg.passwordConfirm ? "error-msg" : "" }
              placeholder="Potwierdź hasło"
              value={ this.state.passwordConfirm }
              onChange={ this.handleChange }
              onBlur={ this.handleBlur }
            />
            <span className="error-msg">{ this.state.errorMsg.passwordConfirm }</span>
          </div>
          <div>
            <button
              name="signUp"
              disabled={ Object.values(this.state.errorMsg).filter(val => val).length > 0 && true }
            >Zarejsetruj</button>
            { authError && <p>{ authError }</p> }
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: (newUser, firebase) => dispatch(signUp(newUser, firebase))
  }
};

export default compose (
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps)
)(SignUp);
