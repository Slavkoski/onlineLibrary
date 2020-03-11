import React, {Component} from "react";
// import './GenreList.css'
import Nav from "../Nav/Nav";
// import AddGenre from "../AddGenre/AddGenre"
import axios from 'axios';

class AuthorDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            id: props.match.params.id
        }
    }

    async componentWillMount() {
        await axios.get("http://localhost:8080/authors/details/" + this.state.id).then(res => {
            this.setState({
                data: res.data
            });
            return res.data;
        }).then(data => {
            axios.get("http://localhost:8080/authors/books/" + this.state.id).then(res => {
                data.books = res.data;
                this.setState({
                    data: data
                })
            })
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
                                <div className={"row"}>
                                    <div className={"col-12"}>
                                        <div className={"row"}>
                                            <div className={"col-md-5 col-ld-6 col-sm-12"}>
                                                <img className={"thumbnail"}
                                                     src="https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
                                            </div>
                                            <div className={"col ml-5"}>
                                                <h3>{this.state.data.firstName} {this.state.data.lastName}</h3>
                                                {this.state.data.birthDate.substr(0, this.state.data.birthDate.indexOf("T"))}<br/>
                                                {this.state.data.city}, {this.state.data.country}<br/>
                                                <a href={"/"} className={"btn btn-primary"}>Add Book For This Author</a>
                                            </div>
                                        </div>
                                        <div className={"row"}>
                                            <div className={"col"}>
                                                {this.state.data.biography}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"row"}>
                                        {
                                            this.state.data.books && this.state.data.books.length > 0 ?
                                                this.state.data.books.map((book, index) => {
                                                    return (
                                                        <div key={index} className="col-lg-3 col-md-3 col-sm-6 p-3">
                                                            <div className="card" style={{width: "15rem"}}>
                                                                <img className="card-img-top"
                                                                     src="https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                                                     alt="" width={40} height={220}/>
                                                                <div className="card-body">
                                                                    <h5 className="card-title"><a
                                                                        href={"/books/details/" + book.id}> {book.title}</a>
                                                                    </h5>
                                                                    <p className={"card-text"}>
                                                                        {book.publishedYear}
                                                                    </p>
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