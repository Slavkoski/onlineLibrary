import React, {Component} from "react";
import Nav from "../Nav/Nav";
import BookList from "../BookList/BookList";
import axios from 'axios';

class PublisherDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            id: props.match.params.id
        }
    }

    async componentWillMount() {
        await axios.get("http://localhost:8080/publisher/" + this.state.id).then(res => {
            this.setState({
                data: res.data
            });
        }).catch((err) => {
            console.log("Error: ", err);
        })
    }

    delete() {
        if (window.confirm("Are you sure that you want to delete?")) {
            console.log(this.state.id);
            var form = new FormData();
            form.set("publisherId", this.state.id);
            axios.post("http://localhost:8080/publisher/delete", form)
                .then(res => {
                        if (res.data) {
                            this.props.history.push("/publishers")
                        }
                    }
                ).catch(er => {
                console.log("cannot delete");
            })
        }
    }

    render() {
        var name = "";
        if (this.state.data) {
            name = ": " + this.state.data.name;
        }
        document.title = "Online Library" + name;
        return (
            <div>
                <Nav></Nav>
                <div className={"container mt-2"}>
                    {
                        this.state.data != null ? (
                                <div className={"row"}>
                                    <div className={"col-12"}>
                                        <div className={"row bg-light rounded pt-2 pb-2"}>
                                            <div className={"col-md-5 col-ld-6 col-sm-12"}>
                                                <img className={"img-thumbnail img-fluid"}
                                                     src={"http://localhost:8080/publisher/image/" + this.state.id}/>
                                            </div>
                                            <div className={"col ml-5"}>
                                                <h3>{this.state.data.name}</h3>
                                                {this.state.data.description}
                                                <br/>
                                                <a href={"/addBook"} className={"btn btn-primary"}>Add Book For This
                                                    Publisher</a>
                                                <br/>
                                                <a href={"/editPublisher/" + this.state.data.id}
                                                   className={"btn btn-primary mt-2"}>Edit</a>
                                                <br/>
                                                <button className="btn btn-danger mt-2" onClick={this.delete.bind(this)}>Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"col transparent-bg rounded mt-2"}>
                                        <BookList
                                            path={"http://localhost:8080/publisher/books/" + this.state.id}></BookList>
                                    </div>
                                </div>
                            )
                            : (
                                <p>No Data For This Publisher</p>
                            )
                    }
                </div>
            </div>
        )
    }

}

export default PublisherDetails;