import React, {Component} from "react";
import Nav from "../Nav/Nav";
import axios from 'axios';

class SearchResult extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            searchTerm: props.match.params.searchTerm
        }
    }

    async componentWillMount() {
        await axios.get("http://localhost:8080/search/" + this.state.searchTerm).then(res => {
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
                <Nav></Nav>
                <div className={"container"}>
                    <h2>Search results:</h2>
                    {
                        this.state.data != null && this.state.data.length > 0 ? (
                            this.state.data.map((item, index) => {
                                return (
                                    <a className={"link-no-decoration"}
                                       href={item.link}>
                                        <div className={"row border rounded m-2 category-list-item"}>
                                            <div className={"col"}>
                                                <h5>
                                                    {item.title}
                                                </h5>
                                                <p>{item.description}</p>
                                            </div>
                                        </div>
                                    </a>
                                );
                            })
                        ) : (
                            <p>No Search Results available</p>
                        )
                    }
                </div>
            </div>
        )
    }

}

export default SearchResult;