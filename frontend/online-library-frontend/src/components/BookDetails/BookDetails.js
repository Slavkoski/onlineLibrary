import React, {Component} from "react";
import Nav from "../Nav/Nav";
import Comment from "../Comment/Comment"
import axios from 'axios';

class BookDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            id: props.match.params.id,
            publisher: [],
            genres: []
        }
    }

    async componentDidMount() {
        await axios.get("http://localhost:8080/books/details/" + this.state.id).then(res => {
            // debugger;
            this.setState({
                data: res.data,
                // publisher: this.getPublisher(this.state.id)
            })
        }).catch((err) => {
            console.log("Error: ", err);
        })
        await axios.get("http://localhost:8080/publisher/book/" + this.state.id).then(res => {
            this.setState({
                publisher: res.data
            })
        }).catch((err) => {
            console.log("Error: ", err);
        });
        await axios.get("http://localhost:8080/genre/book/" + this.state.id).then(res => {
            this.setState({
                genres: res.data
            })
        }).catch((err) => {
            console.log("Error: ", err);
        });
    }

    delete(){
        if (window.confirm("Are you sure that you want to delete?")) {
            console.log(this.state.id);
            var form=new FormData();
            form.set("bookId",this.state.id);
            axios.post("http://localhost:8080/books/delete",form)
                .then(res=> {
                        if(res.data){
                            this.props.history.push("/books");
                        }
                    }
                ).catch(er => {
                console.log("cannot delete");
            })
        }
    }

    render() {
        var name="";
        if(this.state.data){
            name=": " +this.state.data.title;
        }
        document.title="Online Library"+name;
        if (!this.state.data) {
            return (<Nav></Nav>)
        }

        return (
            <div>
                <Nav></Nav>

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
                                    {this.state.publisher.name}
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"col"}>
                                    {
                                        this.state.genres.map(genre => {
                                            return <a href={"/genre/"+genre.id}>
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
                                    <a className="btn btn-primary btn btn-primary btn btn-primary align-content-center w-50"
                                       target="_blank"
                                       href={"http://localhost:8080/books/pdf/" + this.state.id}>Download PDF</a>
                                </div>
                            </div>
                            <div className={"row mt-3"}>
                                <div className={"col"}>
                                    <a href={"/editBook/" + this.state.id} className={"btn btn-primary"}>Edit</a>
                                </div>
                            </div>
                            <div className={"row mt-3"}>
                                <div className={"col"}>
                                    <button className="btn btn-danger" onClick={this.delete.bind(this)}>Delete</button>
                                </div>
                            </div>
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