import React, {Component} from "react";
import Nav from "../Nav/Nav";
import axios from 'axios';
import fetchClient from "../../fetchClient";

class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            id: props.bookId,
            currentUser: JSON.parse(localStorage.getItem("userDetails"))
        }
    }

    async componentDidMount() {
        await fetchClient.get("http://localhost:8080/comment/book/" + this.state.id).then(res => {
            this.setState({
                data: res.data
            })
        }).catch((err) => {
            console.log("Error: ", err);
        })
    }

    submitComment(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        if (form.get("bookId") && form.get("description")) {
            fetchClient.post("http://localhost:8080/comment/add/", form)
                .then(() => {
                    window.location.reload(false);
                })
                .catch(() => {
                    console.log("error while trying to add comment")
                })
        }
    }

    deleteComment(commentId) {
        if (window.confirm("Are you sure that you want to delete?")) {
            var form = new FormData();
            form.set("commentId", commentId);
            fetchClient.post("http://localhost:8080/comment/delete", form)
                .then(res => {
                        window.location.reload(false);
                    }
                ).catch(er => {
                console.log("cannot delete");
            })
        }
    }

    render() {
        if (!this.state.data) {
            return (<Nav></Nav>)
        }

        return (
            <div className={"row"}>
                <div className={"col"}>
                    {this.state.currentUser ?
                        <div className={"row border rounded m-2 bg-light"}>
                            <div className={"col"}>
                                <div className="container">
                                    <form onSubmit={this.submitComment}>
                                        <div className={"row mt-2"}>
                                            <div className={"col"}>
                                            <textarea id="description" placeholder={"Comment Here:"}
                                                      name="description"
                                                      className={"form-control"}
                                                      required>
                                            </textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className={"btn btn-primary m-1"}>Add Comment
                                        </button>
                                        <input type="hidden" id="bookId" name="bookId" value={this.state.id}/>
                                    </form>
                                </div>
                            </div>
                        </div>
                        : <div className={"row rounded m-2"}>
                            <div className={"col"}>
                                <a href={"/href"}>Please Log In to add comment</a>

                            </div>
                        </div>
                    }
                    {this.state.data.map((comment, index) => {
                        return (
                            <div className={"row border rounded m-2 bg-light"}>
                                <div className={"col"}>
                                    <p>{comment.user.firstName}</p>
                                    <p className={"ml-3"}>{comment.comment}</p>
                                    {this.state.currentUser && this.state.currentUser.id === comment.user.id
                                        ?
                                        <button className="btn btn-danger mb-1 btn-sm" onClick={this.deleteComment.bind(this, comment.id)}>Delete
                                            Comment</button>
                                        : ""
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        )
    }

}

export default Comment;