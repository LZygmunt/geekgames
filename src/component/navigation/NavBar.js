import React, {Component} from "react";

import "./nav-bar.css";
import "font-awesome/css/font-awesome.min.css";

import MenuItemsData from "./MenuItemsData";
import MenuItem from "./MenuItem";
import GameAdd from "../game/GameAdd";

class NavBar extends Component {
  state = {
    menuItems: MenuItemsData,
    isLogged: true,
    toggleMenu: "hide-dropdown",
    show: false
  };

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
        if (item.button)
          return <div
            className="position-in-menu"
            key={item.id}
            data-name={item.buttonName}
            onClick={this.toggleModal}>{item.text}</div>;
        else if (item.loggedIn === state.isLogged)
          return <MenuItem key={item.id} item={item}/>;
        return null
      });

    return (
      <div id="nav-bar">
        <div className="top-nav">
          <div className="logo-space">
            <img src={props.imgSrc} alt={props.altText}/>
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

export default NavBar;
