import React, { Component } from "react";
import { connect } from "react-redux";


/*
* TODO \to na samym kocu\ zmiana kolorów
* */
class PersonalDataSection extends Component {
  state = {
    isEdit: false,
    colorTheme: "",
    nick: "",
    email: "",
    city: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: [event.target.value] })
  };

  changeColorSet = event => {
    document.body.className=event.target.dataset.theme;
// console.log(event.target.dataset.theme);
  };

  handleClick = event => {
    const target = event.target;
    this.setState(prevState => {
      return {
        [target.dataset.switch]: (target.dataset.switch === "isEdit") ?
          !prevState.isEdit:
          target.parentElement.className
      }
    });
  };

  render() {
    const { nick, email, city, isEdit } = this.state;
    const { auth, profile } = this.props;
    //TODO edycja danych oraz potwierdź
    //TODO resetowanie state
    //TODO wybieranie kolorów zrobić i zmiana na żywo
    return (
      <div id="profile">
        <h1>Witaj, { profile.nick }!</h1>
        <div className="short-info">
          <div className="avatar">
            <i className="far fa-user-circle"> </i>
          </div>
          <div className="personal-data">
            <div className="nick">
              <p>Nick:</p>
              { isEdit ? <input
                type="text"
                name="nick"
                placeholder="Podaj nick"
                value={ nick }
                onChange={this.handleChange }
              /> : <p>{ profile.nick }</p> }
            </div>
            <div className="email">
              <p>E-mail:</p>
              { isEdit ? <input
                type="email"
                name="email"
                placeholder="Podaj e-mail"
                value={ email }
                onChange={ this.handleChange }
              /> : <p>{ auth.email }</p> }

            </div>
            <div className="city">
              <p>Miasto:</p>
              { isEdit ? <input
                type="text"
                name="city"
                placeholder="Podaj miasto"
                value={ city }
                onChange={ this.handleChange }
              /> : <p>{ profile.city }</p> }

            </div>
          </div>
        </div>

        <div className="edit-place">
          <div className="colors">
            <p>Kolory: </p>
            <div className="first" onClick={ this.changeColorSet } data-switch="colorTheme" data-theme="first-set">
              <div className="background" data-switch="colorTheme" data-theme="first-set"/>
              <div className="second-background" data-switch="colorTheme" data-theme="first-set"/>
              <div className="third-background" data-switch="colorTheme" data-theme="first-set"/>
              <div className="color-text" data-switch="colorTheme" data-theme="first-set"/>
              <div className="color-link" data-switch="colorTheme" data-theme="first-set"/>
            </div>
            <div className="second" onClick={ this.changeColorSet } data-switch="colorTheme" data-theme="second-set">
              <div className="background" data-switch="colorTheme" data-theme="second-set"/>
              <div className="second-background" data-switch="colorTheme" data-theme="second-set"/>
              <div className="third-background" data-switch="colorTheme" data-theme="second-set"/>
              <div className="color-text" data-switch="colorTheme" data-theme="second-set"/>
              <div className="color-link" data-switch="colorTheme" data-theme="second-set"/>
            </div>
            <div className="third" onClick={ this.changeColorSet } data-switch="colorTheme" data-theme="third-set">
              <div className="background" data-switch="colorTheme" data-theme="third-set"/>
              <div className="second-background" data-switch="colorTheme" data-theme="third-set"/>
              <div className="third-background" data-switch="colorTheme" data-theme="third-set"/>
              <div className="color-text" data-switch="colorTheme" data-theme="third-set"/>
              <div className="color-link" data-switch="colorTheme" data-theme="third-set"/>
            </div>
          </div>

          <div className="button" onClick={ this.handleClick } data-switch="isEdit" style={{ clear: "both",lineHeight: "2",marginTop: "60px" }}>
            { isEdit ? "Potwierdź" : "Edytuj dane" }
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.firebase.profile
  }
};

export default connect(mapStateToProps)(PersonalDataSection);
