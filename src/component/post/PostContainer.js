import React, { Component } from "react";
import PostComponent from "./PostComponent"
import "./post.css"
import "./comments.css"
import Comment from "./Comment";
import logo1 from "../../images/logo-geek-games.png";

class PostContainer extends Component{
    constructor() {
        super();
        this.state = {
        };
    }

    render(){


        return(
            <div id="post">
                <PostComponent
                    postSubject={"Jak makao zakrólowało na studenckim imprezach... To już nie zwykłe pijaczki!"}
                    createDate={"2019-09-15"}
                    postDesc={" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet beatae debitis, illo itaque iure\n" +
                    "                molestiae neque nulla obcaecati porro provident reiciendis, reprehenderit similique soluta temporibus\n" +
                    "                totam veniam vero. Repellendus, suscipit.  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet beatae debitis, illo itaque iure\n" +
                    "                molestiae neque nulla obcaecati porro provident reiciendis, reprehenderit similique soluta temporibus\n" +
                    "                totam veniam vero. Repellendus, suscipit.  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet beatae debitis, illo itaque iure\n" +
                    "                molestiae neque nulla obcaecati porro provident reiciendis, reprehenderit similique soluta temporibus\n" +
                    "                totam veniam vero. Repellendus, suscipit.  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet beatae debitis, illo itaque iure\n" +
                    "                molestiae neque nulla obcaecati porro provident reiciendis, reprehenderit similique soluta temporibus\n" +
                    "                totam veniam vero. Repellendus, suscipit."}
                />
                <div id="comments">
                    <div className="comment-add">
                        <input type="text" name="content-new-comment" placeholder="Zacznij pisać..." />

                            <i className="fas fa-paper-plane">&nbsp;</i>


                    </div>
                    <div className="comment-list">
                        <Comment imgUrl={logo1}
                                 userName={"User 1"}
                                 commentContent={"Lorem ipsum i coś tam dalej i dalej... To jest tylko treść komentarza, która nie koniecznie jest ważna"}
                        />
                        <Comment imgUrl={logo1}
                                 userName={"User 2"}
                                 commentContent={"Lorem ipsum i coś tam dalej i dalej... To jest tylko treść komentarza, która nie koniecznie jest ważna. Lorem ipsum i coś tam dalej i dalej... To jest tylko treść komentarza, która nie koniecznie jest ważna. Lorem ipsum i coś tam dalej i dalej... To jest tylko treść komentarza, która nie koniecznie jest ważna. Lorem ipsum i coś tam dalej i dalej... To jest tylko treść komentarza, która nie koniecznie jest ważna. Lorem ipsum i coś tam dalej i dalej... To jest tylko treść komentarza, która nie koniecznie jest ważna. Lorem ipsum i coś tam dalej i dalej... To jest tylko treść komentarza, która nie koniecznie jest ważna. "}
                        />


                    </div>

                    <div className="comment-extend">
                        <input type="button" value="Więcej komentarzy..."/>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostContainer;
