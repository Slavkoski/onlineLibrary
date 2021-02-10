import React, {Component} from "react";
import Nav from "../Nav/Nav";
import fetchClient from "../../fetchClient";

class AddAuthor extends Component {

    constructor(props) {
        super(props);
    }

    async addAuthor(event) {
        event.preventDefault();
        fetchClient.post("http://localhost:8080/authors/add", new FormData(event.target), {})
            .then(res => {
                this.props.history.push("author/" + res.data.id);
            });
    }


    render() {
        document.title="Online Library: Add Author";
        return (
            <div>
                <Nav></Nav>
                <div className={"container mt-2 mb-2 border rounded bg-light"}>
                    <div className={"row mb-3"}>
                        <div className={"col"}>
                            <div className={"row mb-2"}>
                                <div className={"col card-header"}>
                                    <h5>
                                        Add Author
                                    </h5>
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"col"}>
                                    <form id="add-book-form-id" onSubmit={this.addAuthor.bind(this)}>
                                        <div className={"row mb-2"}>
                                            <div className={"col-md-6 col-ld-6 col-sm-12"}>
                                                <input type={"text"} name={"firstName"} placeholder={"First Name"}
                                                       required
                                                       className={"form-control mb-2"}/>
                                            </div>
                                            <div className={"col-md-6 col-ld-6 col-sm-12"}>
                                                <input type={"text"} name={"lastName"}
                                                       placeholder={"Last Name"} required
                                                       className={"form-control mb-2"}/>
                                            </div>
                                        </div>
                                        <div className={"row"}>
                                            <div className={"col-md-6 col-ld-6 col-sm-12"}>
                                                <input type={"text"} name={"city"} placeholder={"City"}
                                                       required
                                                       className={"form-control mb-2"}/>
                                            </div>
                                            <div className={"col-md-6 col-ld-6 col-sm-12"}>
                                                <input type={"text"} name={"country"}
                                                       placeholder={"Country"} required
                                                       className={"form-control mb-2"}/>
                                            </div>
                                        </div>
                                        <div className={"row"}>
                                            <div className={"col-md-6 col-ld-6 col-sm-12"}>
                                                <input type="date" name={"birthDate"} required
                                                       className={"form-control date-picker mb-2"}/>
                                            </div>
                                            <div className={"col-md-6 col-ld-6 col-sm-12"}>
                                                <input type={"file"} name={"image"} className={"form-control"}
                                                       accept={"image/*"} required/>
                                            </div>
                                        </div>
                                        <div className={"row"}>
                                            <div className={"col"}>
                                            <textarea name={"biography"} placeholder={"Biography"}
                                                      className={"form-control"} required>
                                        </textarea>
                                            </div>
                                        </div>
                                        <div className={"row mt-2"}>
                                            <div className={"col-md-3 col-ld-3 col-sm-6"}>
                                                <input type={"submit"} className={"btn btn-primary form-control"}
                                                       value={"Add Author"}/>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default AddAuthor;