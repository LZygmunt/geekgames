import React, { Component } from "react";
import { firebase } from "../../config/fbConfig"

class Search extends Component {
  state = {
    search: "",
    limit: 30,
    last: ""
  };

  handleChange = event => {
    this.setState({ search: event.target.value });
  };

  componentDidMount() {
    this.searchFor()
  }

  searchFor = async () => {
    const snapshot = await firebase.firestore().collection(this.props.collection)
      .orderBy(this.props.sort)
      .startAt(this.state.search)
      .endAt(this.state.search + "\uf8ff")
      .get();
    snapshot.docs.reduce((acc, doc) => {
      console.log(doc.data().title)
    })
  };

  render() {
    return (<div className={this.props.className}>
      <input
        type="text"
        name="search"
        value={this.state.search}
        onChange={this.handleChange}
        placeholder="Zacznij pisać, aby wyszukać grę"
      />

    </div>)
  }
}

export default Search;
