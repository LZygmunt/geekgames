import React, { Component } from "react";
import Modal from "../modal/Modal";
import { connect } from "react-redux";
import { createGame } from "../../store/actions/gameActions";
import { storage } from "../../config/fbConfig";

class GameAdd extends Component {

  state = {
    title: "",
    imageFile: null,
    desc: "",
    progress: 0
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.files ? event.target.files[0] : event.target.value });
  };


  handleSubmit = event => {
    event.preventDefault();
    const date = new Date();
    let game = {
      title: this.state.title,
      desc: this.state.desc,
      alt: this.state.title
    };
    const upload = storage.ref(`images/${ this.props.auth.uid }-${ date.get }`).put(this.state.imageFile);
    upload.on("state_changed",
      snapshot => {
        this.setState({ progress: Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100) });
      },
      error => {
        alert("Błąd podczas przesyłania obrazu. Spróbuj jeszcze raz.");
        // console.log(error);
      },
      () => {
        storage.ref("images").child(this.state.imageFile.name).getDownloadURL().then(url => {
          this.props.createGame({...game, image: url, titleToLowerCase: this.state.title.toLowerCase()});
          this.setState({
            title: "",
            image: "",
            imageFile: null,
            desc: "",
            alt: "tekst alternatywny"
          });
        })
      });
  };

  render() {
    const { show, handleClose } = this.props;
    const { title, desc, progress, imageFile } = this.state;

    return (
      <Modal show={ show } title="Dodaj grę" handleClose={ handleClose }>
        <form>
          <input
            type="text"
            placeholder="Nazwa gry"
            name="title"
            value={ title }
            onChange={ this.handleChange }
          />
          <input
            type="file"
            name="imageFile"
            className="custom-file-input"
            onChange={ this.handleChange }
          />
          <progress value={ progress } max="100" style={{ width: "80%" }}/> { progress === 100 && " Dodano grę." }
          <textarea
            name="desc"
            value={ desc }
            placeholder="Podaj opis gry..."
            onChange={ this.handleChange }
            rows="10"
          />
          <button onClick={ this.handleSubmit } disabled={ imageFile === null }>Dodaj</button>
        </form>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createGame: game => dispatch(createGame(game))
  }
};

export default connect(null, mapDispatchToProps)(GameAdd);
