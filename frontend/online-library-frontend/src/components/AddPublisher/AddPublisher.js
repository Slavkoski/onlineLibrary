import React, {Component} from "react";
import axios from 'axios';

class AddPublisher extends Component {

    constructor(props) {
        super(props);
    }

    addPublisher(event) {
        const form = new FormData(event.target);
        if (form.get("name")) {
            axios.post("http://localhost:8080/publisher/add/", form)
        }
    }

    render() {

        return (
            <div className={"row mt-2 mb-2 border rounded bg-light"}>
                <div className={"col"}>
                    <div className={"row mb-3"}>
                        <div className={"col"}>
                            <div className={"row mb-2"}>
                                <div className={"col card-header"}>
                                    <h5>
                                        Create new publisher
                                    </h5>
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"col"}>
                                    <form onSubmit={this.addPublisher}>
                                        <div className={"row mb-2"}>
                                            <div className={"col-md-6 col-ld-6 col-sm-12"}>
                                                <input type={"text"} name={"name"} placeholder={"Name"} required
                                                       className={"form-control mb-2"}/>
                                                <textarea name={"description"} placeholder={"Description"} required
                                                          className={"form-control"}>
                                                   </textarea>
                                                <label htmlFor={"coverImage"}>Cover Image</label>
                                                <input type={"file"} name={"image"} id={"coverImage"}
                                                       className={"form-control"} required accept={"image/*"}/>
                                            </div>
                                        </div>
                                        <div className={"row"}>
                                            <div className={"col"}>
                                                <input type={"submit"} className={"btn btn-primary"}
                                                       value={"Add Publisher"}/>
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

export default AddPublisher;