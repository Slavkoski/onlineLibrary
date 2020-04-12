import React, {Component} from "react";
import axios from 'axios';

class AddGenre extends Component {

    constructor(props) {
        super(props);
    }

    addGenre(event) {
        const form = new FormData(event.target);
        if (form.get("name")) {
            axios.post("http://localhost:8080/genre/add/", form)
        }
    }

    render() {

        return (
            <div className="mt-2 mb-2">
                <div className={"row bg-light rounded border pb-2"}>
                    <div className={"col"}>
                        <div className={"row"}>
                            <div className={"col"}>
                                <h6> Your genre is not here? Create new one.</h6>
                            </div>
                        </div>
                        <div className={"row"}>
                            <div className={"col"}>
                                <form onSubmit={this.addGenre}>
                                    <div className={"row"}>
                                        <div className={"col-md-6 col-ld-6 col-sm-12"}>
                                            <input type={"text"} name={"name"} placeholder={"Name"} required
                                                   className={"form-control"}/>
                                        </div>
                                        <div className={"col"}>
                                            <input type={"submit"} className={"btn btn-primary"}
                                                   value={"Add New Genre"}/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default AddGenre;