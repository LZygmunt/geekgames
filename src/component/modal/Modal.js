import React, {Component} from "react";

import "./modal.css"

/**
 * Komponent odowiadający za widok okna modalnego
 * @function componentDidMount - Przy tworzeniu komponentu ustawiany jest słuchacz
 * @function componentWillUnmount - Przy usuwaniu komponentu słuchacz jest usuwany
 * @function handleClick - Funkcja przechwytująca zdarzenie kliknięcia
 * @param event - Element, na którym wykryto zdarzenie
 * @return {*} - Zwraca widok okna modalnego
 */
class Modal extends Component {

  componentDidMount = () => {
    document.addEventListener("mousedown", this.handleClick, false);
    document.addEventListener("keydown", this.handleClick, false);
  };

  componentWillUnmount = () => {
    document.addEventListener("mousedown", this.handleClick, false);
    document.addEventListener("keydown", this.handleClick, false);
  };

  handleClick = (event) => {
    if((event.key === "Escape" && this.modal && !this.modal.contains(event.target)) ||
      (event.type === "mousedown" && (this.modal && !this.modal.contains(event.target)))) this.props.handleClose(event);
  };

  /**
   * @param show - Przechowuje informacje typu boolean, używany do sprawdzenia czy jest okno otwarte
   * @param handleClose - Funkcja przechwytywania zamknięcia okna modalnego
   * @param children - Zawartość dostarczona do okna, która ma być wyświetlona
   * @param title - Test wyświetlany jako tytuł okna
   * @return {*} - Zwraca widok okna modalnego
   */
  render = () => {
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
