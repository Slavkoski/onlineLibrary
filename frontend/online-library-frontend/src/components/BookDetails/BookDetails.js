import React, {Component} from "react";
import Nav from "../Nav/Nav";
import Comment from "../Comment/Comment"
import axios from 'axios';
import fetchClient from "../../fetchClient";
import {checkUserHasRole} from "../../Util";

class BookDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            id: props.match.params.id,
            publisher: [],
            genres: [],
            userDetails: null
        }
    }

    async componentDidMount() {
        this.state.userDetails = JSON.parse(localStorage.getItem("userDetails"));
        await fetchClient.get("http://localhost:8080/books/details/" + this.state.id, {}).then(res => {
            this.setState({
                data: res.data,
            })
        }).catch((err) => {
            console.log("Error: ", err);
        })
        await fetchClient.get("http://localhost:8080/publisher/book/" + this.state.id).then(res => {
            this.setState({
                publisher: res.data
            })
        }).catch((err) => {
            console.log("Error: ", err);
        });
        await fetchClient.get("http://localhost:8080/genre/book/" + this.state.id).then(res => {
            this.setState({
                genres: res.data
            })
        }).catch((err) => {
            console.log("Error: ", err);
        });
    }

    delete() {
        if (window.confirm("Are you sure that you want to delete?")) {
            var form = new FormData();
            form.set("bookId", this.state.id);
            fetchClient.post("http://localhost:8080/books/delete", form)
                .then(res => {
                        if (res.data) {
                            this.props.history.push("/books");
                        }
                    }
                ).catch(er => {
                console.log("cannot delete");
            })
        }
    }

    openPdf(){
        fetchClient.get("http://localhost:8080/books/pdf/" + this.state.id, {responseType:"arraybuffer"})
            .then((response) => {
                var file = new Blob([response.data], { type: "application/pdf" });
                const fileURL = URL.createObjectURL(file);

                // Open the URL on new Window
                const pdfWindow = window.open(fileURL,"_blank");
                URL.revokeObjectURL(fileURL);

            })
            .catch((error) => {
                console.log(error);
            });
    }

    getDownloadPdfButton(user,book){
        if(book.priority==="UNREGISTERED" || checkUserHasRole(user,"ADMIN") || checkUserHasRole(user,"PREMIUM_USER")){
            return (<button className="btn btn-primary btn btn-primary btn btn-primary align-content-center w-50"
                      onClick={this.openPdf.bind(this)}>Download
                PDF</button>)
        }else if (book.priority==="REGISTERED"){
            if(!user){
                return (<a className="btn btn-primary btn btn-primary btn btn-primary align-content-center w-50"
                           href={"/login"}>Log in to see this book</a>)
            }else{
                return (<button className="btn btn-primary btn btn-primary btn btn-primary align-content-center w-50"
                                onClick={this.openPdf.bind(this)}>Download
                    PDF</button>)
            }
        }else if (book.priority==="PREMIUM"){
            if(!user) {
                return (
                    <a className="btn btn-primary btn btn-primary btn btn-primary align-content-center w-50"
                       href={"/login"}>Log in to see this book</a>)
            }else{
                return (
                    <a className="btn btn-primary btn btn-primary btn btn-primary align-content-center w-50"
                       href={"/upgrade/premium"}>Get Premium to see this book</a>)
            }
        }
        return "";
    }

    render() {
        var name = "";
        if (this.state.data) {
            name = ": " + this.state.data.title;
        }
        document.title = "Online Library" + name;
        if (!this.state.data) {
            return (<Nav></Nav>)
        }

        return (
            <div>
                <Nav></Nav>
                <a id={"test"}></a>

                <div className="container bg-light rounded mt-3">
                    <div className="row">
                        <div className="col-md-6 col-ld-6 col-sm-12 mt-2 text-center">
                            <img className={"img-thumbnail img-fluid"}
                                 src={"http://localhost:8080/books/image/" + this.state.id}/>
                        </div>
                        <div className={"col-md-6 col-ld-6 col-sm-12 p-4"}>
                            <div className={"row"}>
                                <div className={"col"}>
                                    <h1 className={""}>
                                        {this.state.data.title}
                                    </h1>
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"col"}>
                                    {
                                        this.state.data.author.map((author, index) => {
                                            return (<a href={"/author/" + author.id}>
                                                    {author.firstName + " " + author.lastName
                                                    + (index === this.state.data.author.length - 1 ? "" : ", ")}
                                                </a>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"col"}>
                                    {this.state.data.publishedYear}
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"col"}>
                                    <a href={"/publisher/"+this.state.publisher.id}>
                                    {this.state.publisher.name}
                                    </a>
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"col"}>
                                    {
                                        this.state.genres.map(genre => {
                                            return <a href={"/genre/" + genre.id}>
                                                <span className="border rounded p-2 m-1 small-text"
                                                      id={"span_author_" + this.state.id}>{genre.name}
                                                </span>
                                            </a>
                                        })
                                    }
                                </div>
                            </div>
                            <div className={"row mt-3"}>
                                <div className={"col"}>
                                    {this.getDownloadPdfButton(this.state.userDetails,this.state.data)}

                                </div>
                            </div>
                            {checkUserHasRole(this.state.userDetails, "ADMIN") ?
                                <div className={"row mt-3"}>
                                    <div className={"col"}>
                                        <a href={"/editBook/" + this.state.id}
                                           className={"btn btn-primary"}>Edit</a>
                                    </div>
                                </div>
                                : ""
                            }
                            {checkUserHasRole(this.state.userDetails, "ADMIN") ?
                                <div className={"row mt-3"}>
                                    <div className={"col"}>
                                        <button className="btn btn-danger"
                                                onClick={this.delete.bind(this)}>Delete
                                        </button>
                                    </div>
                                </div>
                                : ""}

                        </div>
                    </div>
                    <div className={"row mt-5"}>
                        <div className={"col"}>
                            {this.state.data.description}
                        </div>
                    </div>
                    <Comment bookId={this.state.data.id}></Comment>
                </div>
            </div>
        )
    }

}

export default BookDetails;