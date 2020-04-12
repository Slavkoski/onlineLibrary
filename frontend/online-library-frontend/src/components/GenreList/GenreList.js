import React, {Component} from "react";
import Nav from "../Nav/Nav";
import AddGenre from "../AddGenre/AddGenre"
import axios from 'axios';

class GenreList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    async componentWillMount() {
        await axios.get("http://localhost:8080/genre").then(res => {
            res.data.map((category, index) => {
                if (category.books.length > 4) {
                    category.books = category.books.slice(0, 4);
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
        document.title="Online Library: Genres";
        return (
            <div>
                <Nav></Nav>
                <div className={"container"}>
                    {
                        this.state.data != null ? (
                            <div>
                                {
                                    this.state.data.map((item, index) => {
                                        return (
                                            <div className={"row bg-light mt-2 rounded"} key={"genre_list_" + index}>
                                                <div className={"col"}>
                                                    <div className={"row"}>
                                                        <div className={"col"}>
                                                            <h4 className={"mt-1 m-0"}>
                                                                <a className={"link-no-decoration"}
                                                                   href={"/genre/" + item.id}>
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

                                                                        <div key={"book" + index}
                                                                             className="col-lg-2 col-md-2 col-sm-2 m-2">
                                                                            <div className="card m-2">
                                                                                <div className={"image"}>
                                                                                    <img className="card-img-top"
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
                                                                    No books for this category
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
                                                                               className={"btn btn-primary"}>Add
                                                                                Book</a>
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
                                }
                                <AddGenre></AddGenre>
                            </div>
                        ) : (
                            <AddGenre></AddGenre>
                        )
                    }
                </div>
            </div>
        )
    }

}

export default GenreList;