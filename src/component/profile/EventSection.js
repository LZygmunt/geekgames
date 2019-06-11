import React, { Component } from "react";
import Search from "../search/Search";


class EventSection extends Component {
  render() {
    return (
      <div className="event-section">
        <div className="event-search">
          <h1>Obserwowane wydarzenia:</h1>

          <Search
            message="events"
            collection="followers"
            className="event-search"
            placeholder="Zacznij pisać, aby wyszukać grę"
            followerId={ this.props.followerId }
          />
        </div>
      </div>
    );
  }
}

export default EventSection;
