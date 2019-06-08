import React, {Component} from "react";
import {firebase} from "../../config/fbConfig"
import {Link} from "react-router-dom";

class Search extends Component {
  state = {
    search: "",
    limit: 30,
    last: "",
    list:[]
  };

  handleChange = event => {
    const evt = event ? event.target.value : "";
    this.setState({search: evt});
    this.searchFor(evt);
  };

  componentDidMount() {
    this.searchFor("");
  }

  searchFor = async (search) => {
    const snapshot = await firebase.firestore().collection(this.props.collection)
      .where('message', '==', this.props.message)
      .orderBy('followTitleToLowerCase')
      .startAt(search)
      .endAt(search + "\uf8ff")
      .limit(5)
      .get();

    const array =[];

    snapshot.docs.forEach(item =>
    array.push(item.data())
    );

    this.setState({list:array});
  };

  render() {
    let listOfSearch = this.state.list.map(item =>
      <li key={item.followThingId}>
        <Link to={`/game/${item.followThingId}`}>{item.followObject.title}</Link>
      </li>
    );
    if (this.props.message && this.props.message === "events") {

    }
    return (
      <div>
        <div className={this.props.className}>
          <input
            type="text"
            name="search"
            value={this.state.search}
            onChange={this.handleChange}
            placeholder={this.props.placeholder}
          />
        </div>
        <ul>
          {listOfSearch}
        </ul>
        {listOfSearch && listOfSearch.length > 15 && <div style={{textAlign: "center"}}> Załaduj więcej...</div>}
      </div>)
  }
}

export default Search;
