import React from "react";
import { PostComponent } from "./index";

const PostContainer = ({ posts, game }) => {
  return (<div>
    { posts && posts.map(post => { return <PostComponent post={ post } game={ game } key={ post.id }/> }) }
  </div>);
};

export default PostContainer;
