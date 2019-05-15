import React, {Component} from "react";
import MenuItemsData from "./MenuItemsData";
import MenuItem from "./MenuItem";
import GameAdd from "../game/GameAdd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./nav-bar.css";
import "font-awesome/css/font-awesome.min.css";
import {signOut} from "../../store/actions/authActions";


class NavBar extends Component {
  state = {
    menuItems: MenuItemsData,
    isLogged: !!(this.props.auth.uid),
    toggleMenu: "hide-dropdown",
    show: false
  };

  componentDidMount() {
    // console.log("state: ", this.state, " props ", this.props)
  }

  handleClick = (event) => {
    this.setState(prevState => {
      return {
        toggleMenu: prevState.toggleMenu === "hide-dropdown" ? "show-dropdown" : "hide-dropdown",
        // isLogged: event.target. !prevState.isLogged
      };
    });
  };

  toggleModal = (event) => {
    this.setState({
      show: event.target.dataset.name === "addGame"
    })
  };



  render() {
    const props = this.props;
    const state = this.state;
    const MenuItems = state.menuItems.map(
      item => {
        if (item.button && state.isLogged)
          return <div
            className="position-in-menu"
            key={item.id}
            data-name={item.buttonName}
            onClick={(item.buttonName === "signOut") ? props.signOut: this.toggleModal}>{item.text}</div>;
        else if (item.loggedIn === state.isLogged)
          return <MenuItem key={item.id} item={item}/>;
        return null
      });

    return (
      <div id="nav-bar">
        <div className="top-nav">
          <div className="logo-space">
            <Link to="/"><img src={props.imgSrc} alt={props.altText}/></Link>
          </div>
          <div className="menu-space">
            <i onClick={this.handleClick} className="far fa-user-circle"/>
            <div id="dropdown-menu" className={"unselectable " + state.toggleMenu}>
              {MenuItems}
            </div>
          </div>
        </div>
        <GameAdd show={this.state.show} handleClose={this.toggleModal}/>
      </div>
    );
  }
}

const mapStoreToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(NavBar);
