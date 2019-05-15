import React, {Component} from "react";
import {connect} from "react-redux";

class PersonalDataSection extends Component {
  state = {
    isEdit: false,
    colorTheme: "first",
    nick: "Tester",
    email: "test@test.pl",
    city: "Testowo"
  };

  componentDidMount() {
    // this.setState({
    //   isEdit: false,
    //   colorTheme: this.props.profile.colorTheme,
    //   nick: this.props.profile.nick,
    //   email: this.props.auth.email,
    //   city: this.props.profile.city
    // })
  }

  handleChange = (event) => {
    this.setState({
        [event.target.name]: [event.target.value]
    })
  };

  handleClick = (event) => {
    const e = event.target;
    this.setState(prevState => {
      return {
        [e.dataset.switch]: (e.dataset.switch === "isEdit") ? !prevState.isEdit : e.parentElement.className
      }
    });
  };

  render() {
    const { nick, email, city, isEdit } = this.state;
    const { auth, profile } = this.props;
    console.log("PDS -> ", this.state, this.props)
    return (
      <div id="profile">
        <h1>Witaj, {nick}!</h1>
        <div className="short-info">
          <div className="avatar">
            <i className="far fa-user-circle"> </i>
          </div>
          <div className="personal-data">
            <div className="nick">
              <p>Nick:</p>
              {isEdit ? <input
                type="text"
                name="nick"
                placeholder="Podaj nick"
                value={nick}
                onChange={this.handleChange}
              /> : <p>{nick}</p>}
            </div>
            <div className="email">
              <p>E-mail:</p>
              {isEdit ? <input
                type="email"
                name="email"
                placeholder="Podaj e-mail"
                value={email}
                onChange={this.handleChange}
              /> : <p>{email}</p>}

            </div>
            <div className="city">
              <p>Miasto:</p>
              {isEdit ? <input
                type="text"
                name="city"
                placeholder="Podaj miasto"
                value={city}
                onChange={this.handleChange}
              /> : <p>{city}</p>}

            </div>
          </div>
        </div>

        <div className="edit-place">
          <div className="colors">
            <p>Kolory: </p>
            <div className="first" onClick={this.handleClick} data-switch="colorTheme">
              <div className="background" data-switch="colorTheme"/>
              <div className="second-background" data-switch="colorTheme"/>
              <div className="third-background" data-switch="colorTheme"/>
              <div className="color-text" data-switch="colorTheme"/>
              <div className="color-link" data-switch="colorTheme"/>
            </div>
            <div className="second" onClick={this.handleClick} data-switch="colorTheme">
              <div className="background" data-switch="colorTheme"/>
              <div className="second-background" data-switch="colorTheme"/>
              <div className="third-background" data-switch="colorTheme"/>
              <div className="color-text" data-switch="colorTheme"/>
              <div className="color-link" data-switch="colorTheme"/>
            </div>
            <div className="third" onClick={this.handleClick} data-switch="colorTheme">
              <div className="background" data-switch="colorTheme"/>
              <div className="second-background" data-switch="colorTheme"/>
              <div className="third-background" data-switch="colorTheme"/>
              <div className="color-text" data-switch="colorTheme"/>
              <div className="color-link" data-switch="colorTheme"/>
            </div>
          </div>
          <div className="button" onClick={this.handleClick} data-switch="isEdit">
            {isEdit ? "Potwierdź" : "Edytuj dane"}
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile
  }
};

export default connect(mapStateToProps)(PersonalDataSection);
