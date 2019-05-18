import React, {Component} from "react";
import "./post.css"
import "./comments.css"
import { CommentList, PostDescribe } from "./";

class PostComponent extends Component {
  state = {
    showComment: false
  };

  showComment = () => {
    this.setState({
      showComment: true
    })
  };

  render() {
    const { item } = this.props;
    const { showComment } = this.state;

    //TODO zmienić listę komentarzy na zmienną
    //TODO dorzucić możliwość dodawania postów
    return (<div className="post">
        <PostDescribe post={item}/>
        { showComment ? <CommentList />: <div onClick={ this.showComment }>Rozwiń</div> }
    </div>);
  }
}

export default PostComponent;
