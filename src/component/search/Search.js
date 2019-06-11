import React, {Component} from "react";
import {firebase} from "../../config/fbConfig"
import {Link} from "react-router-dom";

class Search extends Component {
  state = {
    search: "",
    limit: 30,
    last: "",
    list: []
  };

  handleChange = async event => {
    const evt = event ? event.target.value : "";
    this.setState({search: evt});
    await this.searchFor(evt);
  };

  async componentDidMount() {
    await this.searchFor("");
  }


  searchFor = async (search) => {
    let snapshot;
    switch (this.props.message) {
      case "games":
      case "events":
      {
        snapshot = await firebase.firestore().collection(this.props.collection)
          .where('authorId','==', this.props.followerId)
          .where('message', '==', this.props.message)
          .orderBy('followTitleToLowerCase')
          .startAt(search)
          .endAt(search + "\uf8ff")
          .limit(5)
          .get();
        break;
      }
      default:{
        snapshot = await firebase.firestore().collection(this.props.collection)
          .orderBy('titleToLowerCase')
          .startAt(search)
          .endAt(search + "\uf8ff")
          .get();
        break;
      }
    }

    const array = [];

    snapshot.docs.forEach(item =>
      array.push({...item.data(), id:item.id})
    );

    this.setState({list: await array});
  };

  render() {
    let listOfSearch;
    switch (this.props.message) {
      case "events": {
        listOfSearch = this.state.list.map(item =>
          <Link to={`/event/${item.followObject.id}`} key={item.followObject.id}>
            <li>
              <span>{item.followObject.title}</span>
              <span>{item.followObject.place}</span>
              <span>{item.followObject.startDate} - {item.followObject.endDate}</span>
            </li>
          </Link>
        );
        break;
      }
      case "games": {
        listOfSearch = this.state.list.map(item =>
          <li key={item.followThingId}>
            <Link to={`/game/${item.followThingId}`}>{item.followObject.title}</Link>
          </li>
        );
        break;
      }
      case "game-list": {
        listOfSearch = this.state.list.map(item =>
          <tr className="game-element" key={item.id}>
            <td className="title">
              <Link to={"/game/" + item.id}>
                {item.title}
              </Link>
            </td>
            <td className="second-col"> {item.created.toDate().toLocaleDateString()}</td>
            <td className="author"> {item.authorNick}</td>
          </tr>);
        break;
      }
      default: {
        listOfSearch = this.state.list.map(item =>
          <tr className="game-element" key={item.id}>

            <td className="title"><Link to={"/event/" + item.id}> {item.title}</Link></td>
            <td className="second-col"> {item.place} </td>
            <td className="author"> {item.startDate}</td>
          </tr>
        );
        break;
      }
    }

    if (this.props.message === "events" || this.props.message === "games") {
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
    if (this.props.message === "game-list") {
      return (
        <table className="game-list" cellSpacing="0">
          <thead id="game-header-table" style={{width:"100%"}}>
          <tr>
            <td className={this.props.className} colSpan="3">
              <input
                type="text"
                name="search"
                value={this.state.search}
                onChange={this.handleChange}
                placeholder={this.props.placeholder}
              />
            </td>
          </tr>
          <tr className="game-item">
            <td className="title">Nazwa gry</td>
            <td className="second-col">Data stworzenia</td>
            <td className="author">Nick autora</td>
          </tr>
          </thead>
          <tbody>
          {listOfSearch}
          </tbody>
        </table>)
    }
    if(this.props.message === "event-list"){
      return (<table className="game-list" cellSpacing="0">
        <thead id="game-header-table" style={{width:"100%"}}>
        <tr>
          <td className={this.props.className} colSpan="3">
            <input
              type="text"
              name="search"
              value={this.state.search}
              onChange={this.handleChange}
              placeholder={this.props.placeholder}
            />
          </td>
        </tr>
        <tr className="game-item">
          <td>Nazwa wydarzenia</td>
          <td>Miejsce</td>
          <td>Data rozpoczęcia</td>
        </tr>
        </thead><tbody>
      {listOfSearch}
      </tbody>
      </table>);
    }
  }
}

export default Search;
