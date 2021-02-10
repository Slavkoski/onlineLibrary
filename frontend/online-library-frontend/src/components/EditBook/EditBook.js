import React, {Component} from "react";
import Nav from "../Nav/Nav";
import axios from 'axios';
import fetchClient from "../../fetchClient";

class EditBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            book: null,
            id: props.match.params.id,
            publishers: null,
            authors: null,
            genres: null
        }
    }

    async componentDidMount() {
        fetchClient.get("http://localhost:8080/books/details/" + this.state.id)
            .then(res => {
                this.setState({
                    book: res.data
                })
            });
        await fetchClient.get("http://localhost:8080/publisher/book/" + this.state.id).then(res => {
            var newBook = this.state.book;
            newBook.publisher = res.data;
            this.setState({
                book: newBook
            })
        }).catch((err) => {
            console.log("Error: ", err);
        });
        await fetchClient.get("http://localhost:8080/genre/book/" + this.state.id).then(res => {
            var newBook = this.state.book;
            newBook.genres = res.data;
            this.setState({
                book: newBook
            })
        }).catch((err) => {
            console.log("Error: ", err);
        });
        await fetchClient.get("http://localhost:8080/authors").then(res => {
            this.setState({
                authors: res.data
            })
        }).catch(err => {
            console.log(err);
        });

        await fetchClient.get("http://localhost:8080/genre").then(res => {
            this.setState({
                genres: res.data
            })
        }).catch(err => {
            console.log(err);
        });

        await fetchClient.get("http://localhost:8080/publisher").then(res => {
            this.setState({
                publishers: res.data
            })
        }).catch(err => {
            console.log(err);
        })
    }

    async saveBook(event) {
        event.preventDefault();
        fetchClient.post("http://localhost:8080/books/save", new FormData(event.target), {})
            .then(res => {
                this.props.history.push("/book/" + res.data.id);
            });
    }

    onSelectClickAuthor(event) {
        var authorsDiv = document.getElementById("author");
        var authorList = this.state.authors.filter(author => author.id == event.value);
        if (!document.getElementById("span_author_" + event.value)) {
            for (let author in authorList) {
                var spanElement = document.createElement("span");
                spanElement.id = "span_author_" + event.value;
                spanElement.className = "border rounded  p-2 m-1 small-text";
                spanElement.innerText = authorList[author].firstName + authorList[author].lastName;
                var inputElement = document.createElement("input");
                inputElement.setAttribute("type", "hidden");
                inputElement.setAttribute("name", "authors");
                inputElement.setAttribute("value", event.value);
                var iElement = document.createElement("i");
                iElement.className = "fa fa-close text-danger remove-selected ml-2";
                iElement.onclick = () => this.removeItem("span_author_" + event.value);
                spanElement.appendChild(inputElement);
                spanElement.appendChild(iElement);
                authorsDiv.appendChild(spanElement);
                // authorsDiv.innerHTML += "<span type='text' class='border rounded p-2 m-1 small-text' id='span_author_" + event.value + "' >" +
                //     "<input type='hidden' name='authors' value='" + event.value + "' >"
                //     + authorList[author].firstName + " " + authorList[author].lastName + "<i class='fa fa-close text-danger remove-selected ml-2' onclick='removeItem(\"span_author_" + event.value + "\")'></i></span>"
            }
        }
    }

    onSelectClickGenre(event) {
        var genreDiv = document.getElementById("genre");
        var genreList = this.state.genres.filter(genre => genre.id == event.value);
        if (!document.getElementById("span_genre_" + event.value)) {
            for (let genre in genreList) {
                var spanElement = document.createElement("span");
                spanElement.id = "span_genre_" + event.value;
                spanElement.className = "border rounded  p-2 m-1 small-text";
                spanElement.innerText = genreList[genre].name;
                var inputElement = document.createElement("input");
                inputElement.setAttribute("type", "hidden");
                inputElement.setAttribute("name", "genres");
                inputElement.setAttribute("value", event.value);
                var iElement = document.createElement("i");
                iElement.className = "fa fa-close text-danger remove-selected ml-2";
                iElement.onclick = () => this.removeItem("span_genre_" + event.value);
                spanElement.appendChild(inputElement);
                spanElement.appendChild(iElement);
                genreDiv.appendChild(spanElement);
            }
        }
    }

    removeItem(id) {
        var el = document.getElementById(id);
        if (el) {
            el.remove();
        }
    }

    render() {
        document.title="Online Library: Edit Book";
        return (
            <div>
                <Nav></Nav>
                {
                    this.state.book ?
                        <div className={"container mt-2 mb-2 border rounded bg-light"}>
                            <div className={"row mb-3"}>
                                <div className={"col"}>
                                    <div className={"row"}>
                                        <div className={"col card-header"}>
                                            <h5>
                                                Edit book
                                            </h5>
                                        </div>
                                    </div>
                                    <div className={"row"}>
                                        <div className={"col"}>
                                            <form id="add-book-form-id" onSubmit={this.saveBook.bind(this)}>
                                                <input type="hidden" name={"id"} value={this.state.book.id}/>
                                                <div className={"row mb-2"}>
                                                    <div className={"col-md-6 col-ld-6 col-sm-12"}>
                                                        <label htmlFor={"title"}>Title</label>
                                                        <input type={"text"} name={"title"} placeholder={"Title"}
                                                               defaultValue={this.state.book.title}
                                                               className={"form-control mb-2"} id={"title"}/>

                                                        <label htmlFor={"publisherYear"}>Published Year</label>
                                                        <input type={"number"} name={"publishedYear"}
                                                               placeholder={"Published year"}
                                                               defaultValue={this.state.book.publishedYear}
                                                               min={0}
                                                               max={2100}
                                                               className={"form-control mb-2"} id={"publisherYear"}/>

                                                        <label htmlFor={"description"}>Description</label>
                                                        <textarea name={"description"} placeholder={"Description"}
                                                                  defaultValue={this.state.book.description}
                                                                  className={"form-control mb-2"} id={"description"}
                                                        >
                                                   </textarea>

                                                        <label htmlFor={"image"}>Cover Image</label>
                                                        <input type={"file"} name={"image"}
                                                               className={"form-control mb-2"}
                                                               accept={"image/*"} id={"image"}/>

                                                        <label htmlFor={"pdf"}>Upload Pdf of the book</label>
                                                        <input type={"file"} name={"pdf"}
                                                               className={"form-control mb-2"}
                                                               accept={".pdf"} id={"pdf"}/>

                                                        <label htmlFor={"authors"}>Authors</label>
                                                        <select className={"form-control mb-2"}
                                                                id={"authors"}
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
                                                        <p id={"author"}>
                                                            {
                                                                this.state.book.author.map((author, index) => {
                                                                    return <span
                                                                        className="border rounded p-2 m-1 small-text"
                                                                        id={"span_author_" + author.id}>
                                                                        <input type="hidden" name="authors"
                                                                               value={author.id}/>{author.firstName} {author.lastName}
                                                                        <i className="fa fa-close text-danger remove-selected ml-2"
                                                                           onClick={() => this.removeItem("span_author_" + author.id)}>
                                                                        </i>
                                                                        </span>

                                                                })
                                                            }
                                                        </p>

                                                        <label
                                                            htmlFor={"genres"}> Genres </label>
                                                        <select className={"form-control mb-2"}
                                                                id={"genres"}
                                                                onChange={(value) => this.onSelectClickGenre(value.currentTarget)}>
                                                            <option selected></option>
                                                            {
                                                                this.state.genres ?
                                                                    this.state.genres.map((genre, index) => {
                                                                        return <option
                                                                            value={genre.id}>{genre.name}</option>
                                                                    }) :
                                                                    <option>No Genres available</option>
                                                            }
                                                        </select>
                                                        <p id={"genre"}>
                                                            {
                                                                this.state.book.genres ?
                                                                    this.state.book.genres.map(genre => {
                                                                        return <span
                                                                            className="border rounded p-2 m-1 small-text"
                                                                            id={"span_genre_" + genre.id}>
                                                                        <input type="hidden" name="genres"
                                                                               value={genre.id}/>{genre.name}
                                                                            <i className="fa fa-close text-danger remove-selected ml-2"
                                                                               onClick={() => this.removeItem("span_genre_" + genre.id)}>
                                                                        </i>
                                                                        </span>
                                                                    }) : <span></span>
                                                            }
                                                        </p>

                                                        <label htmlFor={"publisher"}>Publisher</label>
                                                        <select
                                                            className={"form-control mb-2"}
                                                            name={"publisherId"}
                                                            id={"publisher"}>
                                                            {
                                                                this.state.publishers ?
                                                                    this.state.publishers.map((publisher, index) => {
                                                                        if (this.state.book.publisher && this.state.book.publisher.id == publisher.id) {
                                                                            return <option
                                                                                value={publisher.id}
                                                                                selected>{publisher.name}</option>
                                                                        } else {
                                                                            return <option
                                                                                value={publisher.id}>{publisher.name}</option>
                                                                        }
                                                                    }) :
                                                                    <option>No Publishers
                                                                        available</option>
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className={"row"}>
                                                    <div className={"col"}>
                                                        <input type={"submit"} className={"btn btn-primary"}
                                                               value={"Save"}/>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div></div>
                }
            </div>
        )
    }

}

export default EditBook;