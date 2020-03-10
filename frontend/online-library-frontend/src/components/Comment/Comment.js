import React, {Component} from "react";
import Nav from "../Nav/Nav";
import axios from 'axios';

class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            id: props.bookId,
        }
    }

    async componentDidMount() {
        await axios.get("http://localhost:8080/comment/book/" + this.state.id).then(res => {
            // debugger;
            this.setState({
                data: res.data
            })
        }).catch((err) => {
            console.log("Error: ", err);
        })
    }

    submitComment(event) {
        const form = new FormData(event.target);
        if (form.get("bookId") && form.get("commentOwnerName") && form.get("description")) {
            axios.post("http://localhost:8080/comment/add/", form)
        }
    }

    render() {
        if (!this.state.data) {
            return (<Nav></Nav>)
        }

        return (
            <div className={"row"}>
                <div className={"col"}>
                    <div className={"row border rounded m-2 bg-light"}>
                        <div className={"col"}>
                            <div className="container">
                                <form onSubmit={this.submitComment}>
                                    <div className={"row mt-2"}>
                                        <div className={"col-md-3 col-ld-4 col-sm-12"}>
                                            <div className={"row"}>
                                                <div className={"col"}>
                                                    <label htmlFor="commentOwnerName">Name</label>
                                                </div>
                                            </div>
                                            <div className={"row"}>
                                                <div className={"col"}>
                                                    <input type="text" id="commentOwnerName" placeholder="Enter Name"
                                                           name="commentOwnerName" className={"form-control"} required/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={"col"}>
                                            <label htmlFor="description">Comment Here:</label>
                                            <textarea id="description" placeholder={"Comment Here:"} name="description"
                                                      className={"form-control"}
                                                      required>
                                            </textarea>
                                        </div>
                                    </div>
                                    <button type="submit" className={"btn btn-primary"}>Add Comment</button>
                                    <input type="hidden" id="bookId" name="bookId" value={this.state.id}/>
                                </form>
                                <br/>
                            </div>
                        </div>
                    </div>
                    {this.state.data.map((comment, index) => {
                        return (
                            <div className={"row border rounded m-2 bg-light"}>
                                <div className={"col"}>
                                    <p>{comment.commentOwnerName}</p>
                                    <p className={"ml-3"}>{comment.comment}</p>
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