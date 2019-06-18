import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUserProfile } from "../../store/actions/authActions";
import { storage } from "../../config/fbConfig";

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


  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if(this.props.profile.colorTheme && this.props.profile.colorTheme !== prevProps.profile.colorTheme ) {
      document.body.className = this.props.profile.colorTheme;
      let selector = this.props.profile.colorTheme === "first-set" ? ".first" :
        this.props.profile.colorTheme === "second-set" ? ".second" :
          this.props.profile.colorTheme === "third-set"? ".third" : ".first";
      document.querySelector(selector).className += " active";
    }
    if(this.state.colorTheme !== prevState.colorTheme){
      document.body.className = this.state.colorTheme;
    }
  };

  changeColorSet = event => {
    if (this.state.isEdit) {
      const tgt = event.target;
      this.setState({ colorTheme: tgt.dataset.theme });
      const active = document.querySelector(".colors > .active");
      active.className = active.classList[0];
      if(tgt.classList[0] !== "first" || tgt.classList[0] !== "second" || tgt.classList[0] !== "third") {
        tgt.parentElement.className += " active";
      }
    }
  };

  uploadFile = () => {
    let user = {
      nick: this.state.nick,
      city: this.state.city,
      colorTheme: this.state.colorTheme,
      avatar: this.state.avatar
    };
    const name = `${ this.props.auth.uid }-${ new Date().toLocaleDateString() }`;
    if(this.state.imageFile === null) {
      this.props.updateUserProfile(user);
      this.setState({
        nick: "",
        avatar: "",
        imageFile: null,
        city: "",
        isEdit: false
      });
    } else {
      const upload = storage.ref(`images/${ name }`).put(this.state.imageFile);
      upload.on("state_changed",
        snapshot => {
          this.setState({progress: Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100)});
        },
        error => {
          console.log(error)
        },
        () => {
          storage.ref("images").child(name).getDownloadURL().then(url => {
            this.setState({ avatar: url });
            this.props.updateUserProfile({...user, avatar: this.state.avatar});
            this.setState({
              nick: "",
              avatar: "",
              imageFile: null,
              city: "",
              isEdit: false
            });
          })
      });
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.files ? event.target.files[0] : event.target.value })
  };

  handleClick = event => {
    const target = event.target;

    if (this.state.isEdit && target.className === "button"){
      this.uploadFile();
      // console.log(this.state.imageFile && this.state.imageFile.name)
    } else {
      this.setState(prevState => {
        return {
          [target.dataset.switch]: (target.dataset.switch === "isEdit") ?
            !prevState.isEdit:
            target.dataset.theme,
          nick: this.props.profile.nick,
          email: this.props.auth.email,
          city: this.props.profile.city,
          avatar: this.props.profile.avatar,
          colorTheme: this.props.profile.colorTheme !== "" ?
            this.props.profile.colorTheme : "first-set"
        }
      });
    }
  };

  render() {

    const { auth, profile } = this.props;
    const { nick, email, city, isEdit } = this.state;
    const avatar = (profile.avatar === "") ? <i className="far fa-user-circle"/> : <img src={ profile.avatar } alt={ profile.nick } width="280px"/>;

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
