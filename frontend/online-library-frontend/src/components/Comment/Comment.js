import React, {Component} from "react";
// import './BookDetails.css'
import Nav from "../Nav/Nav";
import axios from 'axios';
import {Link} from "react-router-dom";
import CategoryList from "../CaregoryList/CategoryList";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            id: props.bookId,
        }
    }

    async componentDidMount() {
        await axios.get("http://localhost:8080/comment/book/" + this.state.id).then(res => {
            // debugger;
            this.setState({
                data: res.data
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

    render() {
        if (!this.state.data) {
            return (<Nav></Nav>)
        }

        return (
            <div className={"row"}>
                <div className={"col"}>
                    {this.state.data.map((comment,index)=>{
                        return(
                            <div className={"row border m-2 bg-light"}>
                                <div className={"col"}>
                                    <p>{comment.commentOwnerName}</p>
                                    <p className={"ml-3"}>{comment.comment}</p>
                                </div>
                            </div>
                            )
                    })}
                </div>
                {/*<Nav></Nav>*/}
            </div>

        )
    }

}

export default Home;