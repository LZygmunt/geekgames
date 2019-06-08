import React, {Component} from 'react';

import "./error.css"
import {Link} from "react-router-dom";


class Error404 extends Component {
  state={
    x:0,
    y:0
  };

  _onMouseMove = (e) =>{
    this.setState({x: e.screenX, y: e.screenY});
    console.log((this.state.x/18)+","+(this.state.y/18));
    document.querySelectorAll(".mushrooms").forEach(item => item.style.transform=`translate3d( ${this.state.x/15 - 100}px,0,0)`);
    document.querySelectorAll(".mushrooms-up").forEach(item => item.style.transform=`translate3d( ${this.state.x/60 - 50 }px,0,0)`);
    document.querySelectorAll(".mario").forEach(item => {
      item.style.transform=`translate3d( ${this.state.x/18 - 50 }px,${this.state.y/3 - 105 }px,0)`;
      item.className="mario-up";
    });
    document.querySelectorAll(".mario-up").forEach(item => {
      item.style.transform=`translate3d( ${this.state.x/18 - 50 }px,${this.state.y/6 - 105 }px,0)`;
      console.log(this.state.y/6 - 105);
      if(this.state.y/6 - 105 > -6)
        item.className="mario";
    });
  };

  render() {
    return (<div className="error404" onMouseMove={this._onMouseMove.bind(this)} >

      <div className="scene">
        <div className="error-ground"/>
        <div className="ground"/>
        <div className="mushrooms" style={{right: '160px'}}/>
        <div className="mushrooms" style={{right: '130px'}}/>
        <div className="mario"/>
        <div className="chance"/>
        <div className="brick"/>
        <div className="mushrooms-up"/>
        <Link to={"/"}><div className="text-404">
          W tej chwili nie ma takiej strony.<br/>
          Przejdź do strony głównej.
        </div>
        </Link>
      </div>
    </div>)
  }
}

export default Error404;