import React, {Component} from "react";
import axios from 'axios';
import Nav from "../Nav/Nav";

class BookList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: null,
            path: props.path
        }
    }

    async componentDidMount() {
        await axios.get(this.state.path).then(res => {
            this.setState({
                books: res.data
            })
        })
    }



    render() {

        return (
            <div className={"row border rounded mb-2"}>
                {
                    this.state.books && this.state.books.length > 0 ?
                        this.state.books.map((book, index) => {
                            return (
                                <div key={index} className="col-lg-3 col-md-3 col-sm-6 p-3">
                                    <div className="card m-2">
                                        <div className="image">
                                            <img className="card-img-top img"
                                                 src={"http://localhost:8080/books/image/" + book.id}
                                                 alt=""/>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title"><a
                                                href={"/book/" + book.id}> {book.title}</a>
                                            </h5>
                                            <p className={"card-text"}>
                                                {book.publishedYear}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : <div>
                            No books from this publisher
                            <a href={"/addBook"} className={"btn btn-primary ml-2"}>Add
                                Book</a>
                        </div>
                }
            </div>
        )
    }

}

export default BookList;