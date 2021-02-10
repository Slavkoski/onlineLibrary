import React, {Component} from "react";
import Nav from "../Nav/Nav";
import axios from 'axios';
import BookList from "../BookList/BookList";
import fetchClient from "../../fetchClient";
import {checkUserHasRole} from "../../Util";

class AuthorDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            id: props.match.params.id,
            currentUser: JSON.parse(localStorage.getItem("userDetails"))
        }
    }

    async componentWillMount() {
        await fetchClient.get("http://localhost:8080/authors/details/" + this.state.id).then(res => {
            this.setState({
                data: res.data
            });
            return res.data;
        }).catch((err) => {
            console.log("Error: ", err);
        })
    }

    delete() {
        if (window.confirm("Are you sure that you want to delete?")) {
            var form = new FormData();
            form.set("authorId", this.state.id);
            fetchClient.post("http://localhost:8080/authors/delete", form)
                .then(res => {
                        if (res.data) {
                            this.props.history.push("/authors")
                        }
                    }
                ).catch(er => {
                console.log("cannot delete");
            })
        }
    }

    render() {
        var name = "";
        if (this.state.data) {
            name = ": " + this.state.data.firstName + " " + this.state.data.lastName;
        }
        document.title = "Online Library" + name;
        return (
            <div>
                <Nav></Nav>
                <div className={"container mt-2"}>
                    {
                        this.state.data != null ? (
                                <div className={"row"}>
                                    <div className={"col-12"}>
                                        <div className={"row bg-light rounded pt-2 pb-2"}>
                                            <div className={"col-md-5 col-ld-6 col-sm-12"}>
                                                <img className={"img-thumbnail img-fluid"}
                                                     src={"http://localhost:8080/authors/image/" + this.state.id}/>
                                            </div>
                                            <div className={"col ml-5"}>
                                                <h3>{this.state.data.firstName} {this.state.data.lastName}</h3>
                                                {this.state.data.birthDate.substr(0, this.state.data.birthDate.indexOf("T"))}<br/>
                                                {this.state.data.city}, {this.state.data.country}<br/>
                                                {this.state.currentUser && checkUserHasRole(this.state.currentUser, "ADMIN")
                                                    ?
                                                    <div>
                                                        <a href={"/addBook"} className={"btn btn-primary"}>Add
                                                            Book For This
                                                            Author</a>
                                                        <br/>
                                                        <a href={"/editAuthor/" + this.state.id}
                                                           className={"btn btn-primary mt-2 "}>Edit</a>
                                                        <br/>
                                                        <button className="btn btn-danger mt-2"
                                                                onClick={this.delete.bind(this)}>Delete
                                                        </button>
                                                    </div>
                                                    : ""
                                                }
                                            </div>
                                        </div>
                                        <div className={"row card mt-2 p-2"}>
                                            <div className={"col"}>
                                                {this.state.data.biography}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col transparent-bg rounded mt-2">
                                        <BookList path={"http://localhost:8080/authors/books/" + this.state.id}></BookList>
                                    </div>
                                </div>
                            )
                            : (
                                <p>No Data For This Author</p>
                            )
                    }
                </div>
            </div>
        )
    }

}

export default AuthorDetails;