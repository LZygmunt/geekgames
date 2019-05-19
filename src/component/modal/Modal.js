import React, {Component} from "react";

import "./modal.css"

class Modal extends Component {

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);
    document.addEventListener("keydown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.addEventListener("mousedown", this.handleClick, false);
    document.addEventListener("keydown", this.handleClick, false);
  }

  handleClick = (event) => {
    if(this.modal && !this.modal.contains(event.target)) this.props.handleClose(event);
    if(event.key === "Escape") this.props.handleClose(event);
  };

  render() {
    const { show, handleClose, children, title } = this.props;
    const toggleShow = show ? "modal show" : "modal hide";

    return (
      <div className={ toggleShow } >
        <div className="modal-main" ref={ modal => this.modal = modal }>
          <div className="modal-head">
            <div className="modal-title">{ title }</div>
            <div className="modal-close" onClick={ handleClose }> X</div>
          </div>
          <div className="modal-body">
            { children }
          </div>
        </div>
      </div>
    );
  }
}


export default Modal;
