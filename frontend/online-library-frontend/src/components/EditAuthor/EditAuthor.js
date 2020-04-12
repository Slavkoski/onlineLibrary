import React, {Component} from "react";
import Nav from "../Nav/Nav";
import axios from 'axios';

class EditAuthor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            author: null,
            id: props.match.params.id
        }
    }

    async componentDidMount() {
        axios.get("http://localhost:8080/authors/details/" + this.state.id)
            .then(res => {
                this.setState({
                    author: res.data
                })
            });
    }

    async addAuthor(event) {
        event.preventDefault();
        axios.post("http://localhost:8080/authors/save", new FormData(event.target), {})
            .then(res => {
                this.props.history.push("/author/" + res.data.id);
            });
    }

    render() {
        return (
            <div>
                <Nav></Nav>
                {
                    this.state.author ?

                        <div className={"container mt-2 mb-2 border rounded bg-light"}>
                            <div className={"row mb-3"}>
                                <div className={"col"}>
                                    <div className={"row mb-2"}>
                                        <div className={"col card-header"}>
                                            <h5>
                                                Edit Author
                                            </h5>
                                        </div>
                                    </div>
                                    <div className={"row"}>
                                        <div className={"col"}>
                                            <form id="add-book-form-id" onSubmit={this.addAuthor.bind(this)}>
                                                <input type={"hidden"} name={"authorId"} value={this.state.author.id}/>
                                                <div className={"row mb-2"}>
                                                    <div className={"col-md-6 col-ld-6 col-sm-12"}>
                                                        <input type={"text"} name={"firstName"}
                                                               placeholder={"First Name"}
                                                               className={"form-control mb-2"}
                                                               defaultValue={this.state.author.firstName}/>
                                                    </div>
                                                    <div className={"col-md-6 col-ld-6 col-sm-12"}>
                                                        <input type={"text"} name={"lastName"}
                                                               className={"form-control mb-2"}
                                                               defaultValue={this.state.author.lastName}/>
                                                    </div>
                                                </div>
                                                <div className={"row"}>
                                                    <div className={"col-md-6 col-ld-6 col-sm-12"}>
                                                        <input type={"text"} name={"city"} placeholder={"City"}
                                                               required
                                                               className={"form-control mb-2"}
                                                               defaultValue={this.state.author.city}/>
                                                    </div>
                                                    <div className={"col-md-6 col-ld-6 col-sm-12"}>
                                                        <input type={"text"} name={"country"}
                                                               placeholder={"Country"} required
                                                               className={"form-control mb-2"}
                                                               defaultValue={this.state.author.country}/>
                                                    </div>
                                                </div>
                                                <div className={"row"}>
                                                    <div className={"col-md-6 col-ld-6 col-sm-12"}>
                                                        <input type="date" name={"birthDate"} required
                                                               className={"form-control date-picker mb-2"}
                                                               defaultValue={this.state.author.birthDate.substr(0, this.state.author.birthDate.indexOf("T"))}/>
                                                    </div>
                                                    <div className={"col-md-6 col-ld-6 col-sm-12"}>
                                                        <input type={"file"} name={"image"} className={"form-control"}
                                                               accept={"image/*"}/>
                                                    </div>
                                                </div>
                                                <div className={"row"}>
                                                    <div className={"col"}>
                                            <textarea name={"biography"} placeholder={"Biography"}
                                                      className={"form-control"} required
                                                      defaultValue={this.state.author.biography}>
                                        </textarea>
                                                    </div>
                                                </div>
                                                <div className={"row mt-2"}>
                                                    <div className={"col-md-3 col-ld-3 col-sm-6"}>
                                                        <input type={"submit"}
                                                               className={"btn btn-primary form-control"}
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

export default EditAuthor;