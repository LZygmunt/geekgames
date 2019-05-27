import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUserProfile } from "../../store/actions/authActions";
import { storage } from "../../config/fbConfig";
/*
* TODO \to na samym kocu\ zmiana kolorów
* */
class PersonalDataSection extends Component {
  state = {
    isEdit: false,
    colorTheme: "",
    nick: "",
    email: "",
    city: "",
    avatar: "",
    imageFile: null,
    progress: 0
  };

  changeColorSet = event => {
    this.setState({ colorTheme: event.target.dataset.theme });
    //TODO jeśli został kliknięty to nadaj klasę active
  };

  uploadFile = () => {
    let user = {
      nick: this.state.nick,
      city: this.state.city,
      colorTheme: this.state.colorTheme
    };
    if( this.state.imageFile === null) {
      this.props.updateUserProfile({...user, avatar: this.state.avatar});
      this.setState({
        nick: "",
        avatar: "",
        imageFile: null,
        city: "",
        colorTheme: "",
        isEdit: false
      });
    } else {
      const upload = storage.ref(`images/${this.state.imageFile.name}`).put(this.state.imageFile);
      upload.on("state_changed",
        snapshot => {
          this.setState({progress: Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100)});
        },
        error => {
          console.log(error)
        },
        () => {
          storage.ref("images").child(this.state.imageFile.name).getDownloadURL().then(url => {
            this.setState({avatar: url});
            this.props.updateUserProfile({...user, avatar: this.state.avatar});
            this.setState({
              nick: "",
              avatar: "",
              imageFile: null,
              city: "",
              colorTheme: "",
              isEdit: false
            });
          })
      });
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.files ? event.target.files[0] : event.target.value })
  };
//TODO ograniczyć nazwę użytkownika
  handleClick = event => {
    const target = event.target;
    if (this.state.isEdit && target.className === "button"){
      this.uploadFile();
    } else {
      this.setState(prevState => {
        return {
          [target.dataset.switch]: (target.dataset.switch === "isEdit") ?
            !prevState.isEdit:
            target.dataset.theme,
          nick: this.props.profile.nick,
          email: this.props.auth.email,
          city: this.props.profile.city
        }
      });
    }

  };

  render() {
    const { nick, email, city, isEdit } = this.state;
    const { auth, profile } = this.props;
    // console.log(this.state)
    const avatar = (profile.avatar === "") ? <i className="far fa-user-circle"/> : <img src={ profile.avatar } alt={ profile.nick } width="280px"/>;
    // console.log(avatar)

    //TODO edycja danych oraz potwierdź
    //TODO resetowanie state
    //TODO wybieranie kolorów zrobić i zmiana na żywo
    return (
      <div id="profile">
        <h1>Witaj, { profile.nick }!</h1>
        <div className="short-info">
          <div className="avatar">
            <input
              style={{ display: "none" }}
              type="file"
              name="imageFile"
              onChange={ this.handleChange }
              ref={ inputFile => this.inputFile = inputFile }
            />
            { isEdit ? <div onClick={ () => this.inputFile.click() } >{ avatar }</div>: avatar }

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
                disabled={ true }
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

const mapDisptachToProps = dispatch => {
  return {
    updateUserProfile: user => dispatch(updateUserProfile(user))
  }
};

export default connect(mapStateToProps, mapDisptachToProps)(PersonalDataSection);
