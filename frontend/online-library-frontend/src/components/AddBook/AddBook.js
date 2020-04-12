import React, {Component} from "react";
import Nav from "../Nav/Nav";
import axios from 'axios';

class AddBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authors: null,
            publishers: null,
            genres: null
        }
    }

    async componentDidMount() {
        await axios.get("http://localhost:8080/authors").then(res => {
            this.setState({
                authors: res.data
            })
        }).catch(err => {
            console.log(err);
        });

        await axios.get("http://localhost:8080/genre").then(res => {
            this.setState({
                genres: res.data
            })
        }).catch(err => {
            console.log(err);
        });

        await axios.get("http://localhost:8080/publisher").then(res => {
            this.setState({
                publishers: res.data
            })
        }).catch(err => {
            console.log(err);
        })
    }

    addBook(event) {
        event.preventDefault();
        axios.post("http://localhost:8080/books/add/", new FormData(event.target), {})
            .then(res => {
                this.props.history.push("book/" + res.data.id);
            })
    }

    onSelectClickAuthor(event) {
        var authorsDiv = document.getElementById("author");
        var authorList = this.state.authors.filter(author => author.id == event.value);
        if (!document.getElementById("span_author_" + event.value)) {
            for (let author in authorList) {
                authorsDiv.innerHTML += "<span type='text' class='border rounded p-2 m-1 small-text' id='span_author_" + event.value + "' >" +
                    "<input type='hidden' name='authors' value='" + event.value + "' >"
                    + authorList[author].firstName + " " + authorList[author].lastName + "<i class='fa fa-close text-danger remove-selected ml-2' onclick='removeItem(\"span_author_" + event.value + "\")'></i></span>"
            }
        }
    }

    onSelectClickGenre(event) {
        var genreDiv = document.getElementById("genre");
        var genreList = this.state.genres.filter(genre => genre.id == event.value);
        if (!document.getElementById("span_genre_" + event.value)) {
            for (let genre in genreList) {
                genreDiv.innerHTML += "<span type='text' class='border rounded p-2 m-1 small-text' id='span_genre_" + event.value + "' >" +
                    "<input type='hidden' name='genres' value='" + event.value + "' >"
                    + genreList[genre].name + "<i class='fa fa-close text-danger remove-selected ml-2' onclick='removeItem(\"span_genre_" + event.value + "\")'></i></span>"
            }
        }
    }

    render() {

        return (
            <div>
                <Nav></Nav>
                <div className={"container mt-2 mb-2 border rounded bg-light"}>
                    <div className={"row mb-3"}>
                        <div className={"col"}>
                            <div className={"row mb-2"}>
                                <div className={"col card-header"}>
                                    <h5>
                                        Add new book
                                    </h5>
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"col"}>
                                    <form id="add-book-form-id" onSubmit={this.addBook.bind(this)}>
                                        <div className={"row mb-2"}>
                                            <div className={"col-md-6 col-ld-6 col-sm-12"}>
                                                <label htmlFor={"title"}>Title</label>
                                                <input type={"text"} name={"title"} placeholder={"Title"} required
                                                       className={"form-control mb-2"} id={"title"}/>

                                                <label htmlFor={"publisherYear"}>Published Year</label>
                                                <input type={"number"} name={"publishedYear"}
                                                       placeholder={"Published year"} required min={0} max={2100}
                                                       className={"form-control mb-2"} id={"publisherYear"}/>

                                                <label htmlFor={"description"}>Description</label>
                                                <textarea name={"description"} placeholder={"Description"} required
                                                          className={"form-control mb-2"} id={"description"}>
                                                   </textarea>

                                                <label htmlFor={"image"}>Cover Image</label>
                                                <input type={"file"} name={"image"} className={"form-control mb-2"}
                                                       accept={"image/*"} id={"image"} required/>

                                                <label htmlFor={"pdf"}>Upload Pdf of the book</label>
                                                <input type={"file"} name={"pdf"} className={"form-control mb-2"}
                                                       accept={".pdf"} id={"pdf"} required/>

                                                <label htmlFor={"authors"}>Authors</label>
                                                <select className={"form-control mb-2"}
                                                        id={"authors"}
                                                        required
                                                        onChange={(value) => this.onSelectClickAuthor(value.currentTarget)}>
                                                    <option selected></option>
                                                    {
                                                        this.state.authors ?
                                                            this.state.authors.map((author, index) => {
                                                                return <option
                                                                    value={author.id}>{author.firstName} {author.lastName}</option>
                                                            }) : <option>No Authors available</option>
                                                    }
                                                </select>
                                                <p id={"author"}></p>

                                                <label htmlFor={"genres"}>Genres</label>
                                                <select className={"form-control mb-2"}
                                                        id={"genres"}
                                                        required
                                                        onChange={(value) => this.onSelectClickGenre(value.currentTarget)}>
                                                    <option selected></option>
                                                    {
                                                        this.state.genres ?
                                                            this.state.genres.map((genre, index) => {
                                                                return <option value={genre.id}>{genre.name}</option>
                                                            }) : <option>No Genres available</option>
                                                    }
                                                </select>
                                                <p id={"genre"}></p>

                                                <label htmlFor={"publisher"}>Publisher</label>
                                                <select className={"form-control mb-2"} name={"publisherId"}
                                                        id={"publisher"}
                                                        required>
                                                    <option selected></option>
                                                    {
                                                        this.state.publishers ?
                                                            this.state.publishers.map((publisher, index) => {
                                                                return <option
                                                                    value={publisher.id}>{publisher.name}</option>
                                                            }) : <option>No Publishers available</option>
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className={"row"}>
                                            <div className={"col"}>
                                                <input type={"submit"} className={"btn btn-primary"}
                                                       value={"Add Book"}/>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default AddBook;