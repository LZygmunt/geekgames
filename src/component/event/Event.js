import React, { Component } from "react";
import "./style.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Event extends Component{

    render(){
        const props = {
          placeOfEvent: "city",
          gameOfEvent: "a Bo ja wiem",
          dateOfEvent: "1000-10-01",
          contentOfEvent: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, ad beatae delectus " +
            "distinctio earum error eveniet illum ipsam libero maiores molestiae placeat quae quidem quod, rem " +
            "reprehenderit sequi tempora veritatis!Accusamus assumenda dolore inventore. Alias blanditiis ea, " +
            "eligendi est expedita ipsam iste iure nemo nesciunt odio perferendis placeat quas quidem recusandae " +
            "sint unde voluptatibus? Distinctio nobis ratione reprehenderit sint vitae?Commodi, deserunt dolorum " +
            "maxime nesciunt placeat quia quo repudiandae sed voluptate. A delectus esse hic in maiores nemo quaerat " +
            "sapiente voluptatum. Accusantium dicta expedita ipsam libero molestias nisi quo, quod.Aperiam assumenda " +
            "commodi consequatur cupiditate, expedita inventore ipsum magni, quidem quos repellendus tempora, tempore." +
            " Atque dicta distinctio esse, eum expedita, hic impedit in incidunt perferendis quas quidem recusandae " +
            "temporibus velit? Aspernatur expedita iure possimus quam. Aspernatur aut deserunt earum perferendis qui," +
            " quisquam sed. Accusamus corporis, doloremque dolores illo magnam maxime minima, nihil nostrum odit " +
            "quidem quod rerum saepe, voluptates voluptatibus!"
        };

        const { auth, post } = this.props;

        return (auth.uid) ?
          (<div id="event-content">
                <div id="background-header">
                    <div className="image">
                        <img src="../../images/photo1.jpg" alt="bg"/>
                    </div>
                    <div className="background-image"> </div>
                    <h2 id="title-header">Wspólna gra w parku</h2>
                </div>

                <div className="event-info">
                    <h2 id="place">{props.placeOfEvent}</h2>
                    <h2 id="game">{props.gameOfEvent}</h2>
                    <h2 id="date">{props.dateOfEvent}</h2>
                </div>
                <div id="event-description">{props.contentOfEvent}</div>

                <input type="button" value="Weź udział" className="join-button"/>

                <div className="joined">
                    <h2>Kilka uczestników, którzy chcą wziąć udział:</h2>
                    <ul>
                        <li>User 1</li>
                        <li>User 2</li>
                        <li>User 3</li>
                        <li>User 4</li>
                        <li>User 5</li>
                        <li>User 6</li>
                        <li>User 7</li>
                        <li>User 8</li>
                        <li>User 9</li>
                    </ul>
                </div>

            </div>) :
          (<Redirect to="/"/>);
    }
}

const mapStateToProps = (state) => {
  // console.log("Event log -> ",state);
  return {
    auth: state.firebase.auth,
    // auth: {uid: 1},
    posts: state.firestore.ordered.post
  }
};

export default connect(mapStateToProps)(Event);
