import React from "react";
import { PostComponent } from "./index";

const PostContainer = ({ posts }) => {
  return (<div>
    { posts && posts.map(post => { return <PostComponent post={ post } key={ post.id }/> }) }
  </div>);
};

export default PostContainer;
