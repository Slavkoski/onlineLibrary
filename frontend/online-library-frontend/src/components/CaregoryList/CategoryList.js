import React, {Component} from "react";
import './CategoryList.css'
import Nav from "../Nav/Nav";
import axios from 'axios';
import {Link} from "react-router-dom";

class CategoryList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    async componentWillMount() {
        await axios.get("http://localhost:8080/genre").then(res => {
            console.log(res);
            this.setState({
                data: res.data
            })
        }).catch((err) => {
            console.log("Error: ", err);
        })
    }

    render() {

        return (
            <div>
                <h3 className={"mt-2"}><a href={"/genres"} className={"link-no-decoration"}>Genre</a></h3>
            <ul className={"list-group list-no-decoration"}>
                {
                    this.state.data != null ? (
                        this.state.data.map((item, index) => {
                            return (
                                <a className={"link-no-decoration"}
                                   href={"/genre/" + item.id}>
                                <li key={"index" + index} className={"p-2 ml-3 border-top border-bottom category-list-item"}>{item.name}
                                </li>
                                </a>
                            );
                        })
                    ) : (
                        <p>No categories available</p>
                    )
                }
            </ul>
            </div>
        )
    }

}

export default CategoryList;