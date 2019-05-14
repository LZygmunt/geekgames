import React from "react";
import "./post.css"

const PostComponent = (props) => {
        return(
            <div>
                <h2>{props.postSubject}</h2>
                <p>{props.createDate}</p>
                <p style={{textAlign:"justify"}}>{props.postDesc}</p>
            </div>
        );
};

export default PostComponent;
