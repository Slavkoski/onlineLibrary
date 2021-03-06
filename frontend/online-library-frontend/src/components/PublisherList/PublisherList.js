import React, {Component} from "react";
import Nav from "../Nav/Nav";
import AddPublisher from "../AddPublisher/AddPublisher";
import axios from 'axios';
import fetchClient from "../../fetchClient";
import {checkUserHasRole} from "../../Util";

class PublisherList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            currentUser: JSON.parse(localStorage.getItem("userDetails"))
        }
    }

    async componentWillMount() {
        await axios.get("http://localhost:8080/publisher").then(res => {
            res.data.map((publisher, index) => {
                if (publisher.books.length > 4) {
                    publisher.books = publisher.books.slice(0, 4);
                }
            });
            this.setState({
                data: res.data
            })
        }).catch((err) => {
            console.log("Error: ", err);
        })
    }

    delete(publisherId) {
        if (window.confirm("Are you sure that you want to delete?")) {
            var form = new FormData();
            form.set("publisherId", publisherId);
            fetchClient.post("http://localhost:8080/publisher/delete", form)
                .then(() => {
                        window.location.reload(false);
                    }
                ).catch(er => {
                console.log("cannot delete");
            })
        }
    }

    render() {
        document.title = "Online Library: Publishers";
        return (
            <div>
                <Nav></Nav>
                <div className={"container"}>
                    {
                        this.state.data != null ?
                            <div>
                                {
                                    this.state.data.map((item, index) => {
                                        return (
                                            <div className={"row bg-light mt-2 rounded"}>
                                                <div className={"col"}>
                                                    <div className={"row card-header"}>
                                                        <div className={"col text-center"}>
                                                            <h4 className={"mt-1 m-0"}>
                                                                <a className={"link-no-decoration"}
                                                                   href={"/publisher/" + item.id}>
                                                                    {item.name}
                                                                </a>
                                                            </h4>
                                                        </div>
                                                    </div>
                                                    <div className={"row border m-2"}>
                                                        {
                                                            item.books.length ?
                                                                item.books.map((book, index) => {
                                                                    return (

                                                                        <div key={index}
                                                                             className="col-lg-2 col-md-2 col-sm-2 m-2">
                                                                            <div className="card m-2">
                                                                                <div className={"image"}>
                                                                                    <img
                                                                                        className="card-img-top"
                                                                                        src={"http://localhost:8080/books/image/" + book.id}
                                                                                        alt=""/>
                                                                                </div>
                                                                                <div className="card-body">
                                                                                    <h6><a
                                                                                        href={"/book/" + book.id}> {book.title}</a>
                                                                                    </h6>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    )
                                                                })
                                                                :
                                                                <div>
                                                                    No books from this publisher
                                                                    {this.state.currentUser && checkUserHasRole(this.state.currentUser, "ADMIN")
                                                                        ?
                                                                        <div className={"row"}>

                                                                            <div className={"col m-2"}>
                                                                                <a href={"/addBook"}
                                                                                   className={"btn btn-primary"}>Add
                                                                                    Book</a>
                                                                            </div>
                                                                        </div>
                                                                        : ""
                                                                    }
                                                                    {this.state.currentUser && checkUserHasRole(this.state.currentUser, "ADMIN")
                                                                        ?
                                                                        <div className={"row"}>

                                                                            <div className={"col m-2"}>
                                                                                <button
                                                                                    onClick={this.delete.bind(this, item.id)}
                                                                                    className={"btn btn-danger"}>Delete
                                                                                    Genre
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        : ""
                                                                    }
                                                                </div>
                                                        }
                                                        {
                                                            item.books.length !== 0 ?
                                                                <div className={"col"}>
                                                                    <div className={"row"}>
                                                                        <div className={"col m-2 mt-3"}>
                                                                            <a href={"/publisher/" + item.id}
                                                                               className="btn btn-primary">more
                                                                                ...</a>
                                                                        </div>
                                                                    </div>
                                                                    {this.state.currentUser && checkUserHasRole(this.state.currentUser, "ADMIN")
                                                                        ?
                                                                        <div className={"row"}>

                                                                            <div className={"col m-2"}>
                                                                                <a href={"/addBook"}
                                                                                   className={"btn btn-primary"}>Add
                                                                                    Book</a>
                                                                            </div>
                                                                        </div>
                                                                        : ""
                                                                    }
                                                                    {this.state.currentUser && checkUserHasRole(this.state.currentUser, "ADMIN")
                                                                        ?
                                                                        <div className={"row"}>

                                                                            <div className={"col m-2"}>
                                                                                <button
                                                                                    onClick={this.delete.bind(this, item.id)}
                                                                                    className={"btn btn-danger"}>Delete
                                                                                    Genre
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        : ""
                                                                    }
                                                                </div>
                                                                :
                                                                <div>
                                                                </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                                {this.state.currentUser && checkUserHasRole(this.state.currentUser, "ADMIN")
                                    ?
                                    <AddPublisher></AddPublisher>
                                    : ""
                                }
                            </div>
                            : <div>
                                {this.state.currentUser && checkUserHasRole(this.state.currentUser, "ADMIN")
                                    ?
                                    <AddPublisher></AddPublisher>
                                    : ""
                                }
                            </div>
                    }
                </div>
            </div>
        )
    }

}

export default PublisherList;