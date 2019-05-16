import React, {Component} from "react";
import MenuItemsData from "./MenuItemsData";
import MenuItem from "./MenuItem";
import GameAdd from "../game/GameAdd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";


import "./nav-bar.css";
import "font-awesome/css/font-awesome.min.css";


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

  handleClick = () => {
    this.setState(prevState => {
      return {
        toggleMenu: prevState.toggleMenu === "hide-dropdown" ? "show-dropdown" : "hide-dropdown"
      };
    });
  };

  toggleModal = (event) => {
    this.setState({
      show: event.target.dataset.name === "addGame"
    })
  };
  //TODO ustawić navbar na fixed
  render() {
    const props = this.props;
    const state = this.state;
    // console.log("NavBar -> ", props, state)
    const MenuItems = state.menuItems.map(
      item => {
        if (item.button && !props.auth.isEmpty)
          return <div
            className="position-in-menu"
            key={item.id}
            data-name={item.buttonName}
            onClick={(item.buttonName === "addGame") ? this.toggleModal : this.props.signOut}>{item.text}</div>;
        else if (item.loggedIn === !props.auth.isEmpty)
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
            <div id="dropdown-menu" className={"unselectable " + state.toggleMenu} onClick={this.handleClick}>
              {MenuItems}
            </div>
          </div>
        </div>
        <GameAdd show={this.state.show} handleClose={this.toggleModal}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("Navbar log -> ",state);
  return {
    auth: state.firebase.auth
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
