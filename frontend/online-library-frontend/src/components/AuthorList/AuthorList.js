import React, {Component} from "react";
// import './GenreList.css'
import Nav from "../Nav/Nav";
// import AddGenre from "../AddGenre/AddGenre"
import axios from 'axios';

class AuthorList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    async componentWillMount() {
        await axios.get("http://localhost:8080/authors").then(res => {
            this.setState({
                data: res.data
            });
            return res.data;
        }).then(data => {
            data.map(author => {
                axios.get("http://localhost:8080/authors/books/" + author.id).then(res => {
                    if (res.data && res.data.length > 4) {
                        author.books = res.data.slice(0, 4);
                    } else {
                        author.books = res.data;
                    }
                    this.setState({
                        data: data
                    });
                });
            });
        })
            .catch((err) => {
                console.log("Error: ", err);
            })
    }

    render() {

        return (
            <div>
                <Nav></Nav>
                <div className={"container"}>
                    {
                        this.state.data != null ? (
                            this.state.data.map((item, index) => {
                                return (
                                    <div className={"row"}>
                                        <div className={"col"}>
                                            <div className={"row"}>
                                                <div className={"col"}>
                                                    <a className={"link-no-decoration"}
                                                       href={"/author/" + item.id}>
                                                        {item.firstName} {item.lastName}
                                                    </a>
                                                </div>
                                            </div>
                                            <div className={"row border"}>
                                                {
                                                    item.books && item.books.length > 0 ?
                                                        item.books.map((book, index) => {
                                                            return (

                                                                <div key={index}
                                                                     className="col-lg-2 col-md-3 col-sm-6 m-2">
                                                                    <div className="card m-2">
                                                                        <img className="card-img-top"
                                                                             src={"http://localhost:8080/books/image/"+book.id}
                                                                             alt=""/>
                                                                        <div className="card-body">
                                                                            <h5><a
                                                                                href={"/books/details/" + book.id}> {book.title}</a>
                                                                            </h5>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            )
                                                        })
                                                        :
                                                        <div>
                                                            No books for this author
                                                            <a href={"/books/add"} className={"btn btn-primary ml-2"}>Add
                                                                Book</a>
                                                        </div>
                                                }
                                                {
                                                    item.books && item.books.length !== 0 ?
                                                        <div className={"col"}>
                                                            <div className={"row"}>
                                                                <div className={"col m-2 mt-3"}>
                                                                    <a href={"/author/" + item.id}
                                                                       className="btn btn-primary">more ...</a>
                                                                </div>
                                                            </div>
                                                            <div className={"row"}>
                                                                <div className={"col m-2"}>
                                                                    <a href={"/addBook"}
                                                                       className={"btn btn-primary"}>Add Book</a>
                                                                </div>
                                                            </div>
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
                        ) : (
                            <p>No categories available</p>
                        )
                    }
                </div>
            </div>
        )
    }

}

export default AuthorList;