import React, {Component} from "react";
// import './GenreList.css'
import Nav from "../Nav/Nav";
// import AddGenre from "../AddGenre/AddGenre"
import axios from 'axios';

class CategoryList extends Component {

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
        }).then(data=>{
            data.map(author=>{
                    axios.get("http://localhost:8080/authors/books/" + author.id).then(res => {
                        author.books = res.data;
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
                                                        {item.firstName}
                                                    </a>
                                                </div>
                                            </div>
                                            <div className={"row border"}>
                                                {
                                                    console.log(item.books)
                                                }
                                                {
                                                    item.books ?
                                                        item.books.map((book, index) => {
                                                            return (

                                                                <div key={index}
                                                                     className="col-lg-2 col-md-2 col-sm-2 m-2">
                                                                    <div className="card m-2">
                                                                        <img className="card-img-top"
                                                                             src="https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
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
                                                        </div>
                                                }
                                                {
                                                    item.books && item.books.length !==0 ?
                                                        <div className={"col"}>
                                                            <a href={"/genre/"+item.id} className="bottom-column">more ...</a>
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

export default CategoryList;