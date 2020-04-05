import React, {Component} from "react";
import Nav from "../Nav/Nav";
import AddPublisher from "../AddPublisher/AddPublisher";
import axios from 'axios';

class PublisherList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null
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
                                                       href={"/publisher/" + item.id}>
                                                        {item.name}
                                                    </a>
                                                </div>
                                            </div>
                                            <div className={"row border"}>
                                                {
                                                    item.books.length ?
                                                        item.books.map((book, index) => {
                                                            return (

                                                                <div key={index}
                                                                     className="col-lg-2 col-md-2 col-sm-2 m-2">
                                                                    <div className="card m-2">
                                                                        <div className={"image"}>
                                                                            <img className="card-img-top"
                                                                                 src={"http://localhost:8080/books/image/" + book.id}
                                                                                 alt=""/>
                                                                        </div>
                                                                        <div className="card-body">
                                                                            <h5><a
                                                                                href={"/book/" + book.id}> {book.title}</a>
                                                                            </h5>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            )
                                                        })
                                                        :
                                                        <div>
                                                            No books from this publisher
                                                        </div>
                                                }
                                                {
                                                    item.books.length !== 0 ?
                                                        <div className={"col"}>
                                                            <div className={"row"}>
                                                                <div className={"col m-2 mt-3"}>
                                                                    <a href={"/genre/" + item.id}
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
                <AddPublisher></AddPublisher>
            </div>
        )
    }

}

export default PublisherList;