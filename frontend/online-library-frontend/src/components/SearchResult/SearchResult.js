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
                    <div className={"row"}>
                        <div className={"col"}>
                            <div className={"card m-2"}>
                                <h2 className={"card-header"}>Search results for: "{this.state.searchTerm}"</h2>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.data != null && this.state.data.length > 0 ? (
                            this.state.data.map((item, index) => {
                                return (
                                    <a className={"link-no-decoration"}
                                       href={item.link}>
                                        <div className={"row border rounded m-2 category-list-item card"}>
                                            <div className={"col"}>
                                                <h5 className={"mt-1"}>
                                                    {item.title}
                                                </h5>
                                                <p className={"card-text"}>{item.description}</p>
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