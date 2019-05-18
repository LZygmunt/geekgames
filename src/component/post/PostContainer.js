import React from "react";
import { PostComponent } from "./index";

const PostContainer = ({posts, p}) => {
  return (<div>
    {posts && posts.map(item => {return <PostComponent item={item} key={item.id}/>})}
  </div>);
};

export default PostContainer;
