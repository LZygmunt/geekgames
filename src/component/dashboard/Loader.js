import React, {Component} from "react";

import "./loader.css";

class Loader extends Component {

    componentDidMount() {
        this.changePosition();
    }

    changePosition = () => {

        const loader = document.getElementById("loader-cube");
        setTimeout(function () {
            loader.style.transform = "rotateY(405deg) rotateX(360deg)";
        }, 500);
        setTimeout(function () {
            loader.style.transform = "rotateY(45deg) rotateX(0)";
        }, 5500);
    };


    render() {
        return (<div className="loader">
            <div id="loader-cube" >
                <div className="cubeFace"/>
                <div className="cubeFace face2"/>
            </div>
        </div>);
    }
}


export default Loader;
