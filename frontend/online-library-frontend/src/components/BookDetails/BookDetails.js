import React, {Component} from "react";
import './BookDetails.css'
import Nav from "../Nav/Nav";
import Comment from "../Comment/Comment"
import axios from 'axios';
import {Link} from "react-router-dom";
import CategoryList from "../CaregoryList/CategoryList";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            id: props.match.params.id,
            publisher: null
        }
    }

    async componentWillMount() {
        await axios.get("http://localhost:8080/publisher/book/" + this.state.id).then(res => {
            // debugger;
            this.setState({
                publisher: res.data
            })
        }).catch((err) => {
            console.log("Error: ", err);
        });
    }

    async componentDidMount() {
        await axios.get("http://localhost:8080/books/details/" + this.state.id).then(res => {
            // debugger;
            this.setState({
                data: res.data,
                publisher: this.getPublisher(this.state.id)
            })
        }).catch((err) => {
            console.log("Error: ", err);
        })
    }

    async getPublisher(id) {
        var publisher = [];
        await axios.get("http://localhost:8080/publisher/book/" + id).then(res => {
            publisher = res.data
        }).catch((err) => {
            console.log("Error: ", err);
        });
        return publisher;
    }

    pagination = (e) => {
        debugger;
        let page = e.target.innerText;
        axios.get("http://localhost:8080/home/page/" + page).then(res => {
            this.setState({
                data: res.data
            })
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    };

    render() {
        let najaven = localStorage.getItem('username');

        if (!this.state.data) {
            return (<Nav></Nav>)
        }

        return (
            <div>
                <Nav></Nav>

                <div className="container mt-3" style={{minWidth: "1000px"}}>
                    <div className="row">
                        <div className={"col-md-6 col-ld-6 col-sm-12"}>
                            <img className={"thumbnail"}
                                 src="https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
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
                                            return (<a href={"authors/" + author.id}>
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

export default Home;