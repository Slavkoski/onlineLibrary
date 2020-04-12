import React, {Component} from "react";
// import './AuthorList.css'
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
                <div className={"container mb-2"}>
                    {
                        this.state.data != null ? (
                            this.state.data.map((item, index) => {
                                return (
                                    <div className={"row bg-light mt-2 rounded"}>
                                        <div className={"col"}>
                                            <div className={"row"}>
                                                <div className={"col"}>
                                                    <h4 className={"mt-1 mb-0"}>
                                                    <a className={"link-no-decoration"}
                                                       href={"/author/" + item.id}>
                                                        {item.firstName} {item.lastName}
                                                    </a>
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className={"row border m-2"}>
                                                {
                                                    item.books && item.books.length > 0 ?
                                                        item.books.map((book, index) => {
                                                            return (

                                                                <div key={index}
                                                                     className="col-lg-2 col-md-3 col-sm-6 m-2">
                                                                    <div className="card m-2">
                                                                        <div className="image">
                                                                            <img className="card-img-top img"
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
                                                            No books for this author
                                                            <a href={"/addBook"} className={"btn btn-primary ml-2"}>Add
                                                                Book</a>
                                                        </div>
                                                }
                                                {
                                                    item.books && item.books.length !== 0 ?
                                                        <div className={"col"}>
                                                            <div className={"row"}>
                                                                <div className={"col m-2 mt-3"}>
                                                                    <a href={"/author/" + item.id}
                                                                       className="btn btn-primary">More ...</a>
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
                        ) : (<div>
                                <p>No authors available</p>
                                <a href={"/addAuthor"}
                                   className={"btn btn-primary"}>Add Book</a>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }

}

export default AuthorList;