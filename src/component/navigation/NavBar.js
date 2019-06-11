import React, {Component} from "react";
import MenuItemsData from "./MenuItemsData";
import MenuItem from "./MenuItem";
import { GameAdd } from "../game";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { signOut } from "../../store/actions/authActions";

import "./nav-bar.css";
import "./nav-bar-responsive.css";
import "font-awesome/css/font-awesome.min.css";

class NavBar extends Component {
  state = {
    menuItems: MenuItemsData,
    isLogged: !!(this.props.auth.uid),
    toggleMenu: "hide-dropdown",
    show: false
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleEvent, false);
    document.addEventListener("keydown", this.handleEvent, false);
  }

  componentWillUnmount() {
    document.addEventListener("mousedown", this.handleEvent, false);
    document.addEventListener("keydown", this.handleEvent, false);
  }

  handleEvent = event => {
    if(!this.menu.contains(event.target) && this.state.toggleMenu === "show-dropdown") this.toggleMenu();
    if(event.key === "Escape" && this.state.toggleMenu === "show-dropdown") this.toggleMenu();
  };

  toggleMenu = () => {
    this.setState(prevState => {
      return {
        toggleMenu: prevState.toggleMenu === "hide-dropdown" ? "show-dropdown" : "hide-dropdown"
      };
    });
  };

  signOutLink = () => {
    const { firebase } = this.props;
    this.props.signOut(firebase);
    document.body.className = "";
  };

  toggleModal = event => {
    this.setState({
      show: event.target.dataset.name === "addGame"
    })
  };

  render() {
    const props = this.props;
    const state = this.state;
    const MenuItems = state.menuItems.map(
      item => {
        if (item.button && !props.auth.isEmpty)
          return <div
            className="position-in-menu"
            key={ item.id }
            data-name={ item.buttonName }
            onClick={ (item.buttonName === "addGame") ? this.toggleModal : this.signOutLink }>{ item.text }</div>;
        else if (item.loggedIn === !props.auth.isEmpty)
          return <MenuItem key={ item.id } item={ item }/>;
        return null
      });

    return (
      <div id="nav-bar">
        <div className="top-nav">
          <div className="logo-space">
            <Link to="/">
              <img src={ props.imgSrc } alt={ props.altText }/>
            </Link>
          </div>
          <div className="menu-space" ref={menu => this.menu = menu}>
            <i onClick={this.toggleMenu} className="far fa-user-circle"/>
            <div id="dropdown-menu" className={ "unselectable " + state.toggleMenu } onClick={this.toggleMenu}>
              { MenuItems }
            </div>
          </div>
        </div>
        <GameAdd show={ this.state.show } handleClose={ this.toggleModal }/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  }
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: firebase => dispatch(signOut(firebase))
  };
};

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps)
)(NavBar);
