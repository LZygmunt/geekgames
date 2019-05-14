import React from "react";

import "./modal.css"

const Modal = ({show, handleClose, children, title}) => {
  const toggleShow = show ? "modal show": "modal hide";

  return (
    <div className={toggleShow}>
      <div className="modal-main">
        <div className="modal-head">
          <div className="modal-title">{title}</div>
          <div className="modal-close" onClick={handleClose}> X</div>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
