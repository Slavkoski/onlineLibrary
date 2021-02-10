import React, {Component} from "react";
import axios from 'axios';

class CategoryList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            activeId: props.activeId
        }
    }

    async componentWillMount() {
        await axios.get("http://localhost:8080/genre").then(res => {
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
                <div className={"row category-list-item card"}>
                    <div className={"col"}>
                        <h3 className={"mt-2"}><a href={"/genres"}
                                                  className={"link-no-decoration category-list-item"}>Genre</a></h3>
                    </div>
                </div>
                <ul className={"list-group list-no-decoration"}>
                    {
                        this.state.data != null ? (
                            this.state.data.map((item, index) => {
                                return (
                                    this.state.activeId == item.id ?
                                        <a className={"link-no-decoration category-item-selected mt-1 mb-1 rounded category-list-item"}
                                           href={"/genre/" + item.id}>
                                            <li key={"index" + index}
                                                className={"p-2 ml-3"}>{item.name}
                                                {item.books ? item.books.length : 0}
                                            </li>
                                        </a>
                                        :
                                        <a className={"link-no-decoration card category-list-item mt-1 mb-1 rounded"}
                                           href={"/genre/" + item.id}>
                                            <li key={"index" + index}
                                                className={"p-2 ml-3"}>{item.name} ({item.books ? item.books.length : 0})
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