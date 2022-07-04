import React, {Component} from "react";
import Nav from "../Nav/Nav";
import axios from 'axios';
import fetchClient from "../../fetchClient";

class EditPublisher extends Component {

    constructor(props) {
        super(props);
        this.state = {
            publisher: null,
            id: props.match.params.id
        }
    }

    async componentDidMount() {
        axios.get("http://localhost:8080/publisher/" + this.state.id)
            .then(res => {
                this.setState({
                    publisher: res.data
                })
            });
    }

    async savePublisher(event) {
        event.preventDefault();
        fetchClient.post("http://localhost:8080/publisher/save", new FormData(event.target), {})
            .then(res => {
                this.props.history.push("/publisher/" + res.data.id);
            });
    }

    render() {
        document.title="Online Library: Edit Publisher";
        return (
            <div>
                <Nav></Nav>
                {
                    this.state.publisher ?

                        <div className={"container mt-2 mb-2 border rounded bg-light"}>
                            <div className={"row mb-3"}>
                                <div className={"col"}>
                                    <div className={"row mb-2"}>
                                        <div className={"col card-header"}>
                                            <h5>
                                                Edit publisher
                                            </h5>
                                        </div>
                                    </div>
                                    <div className={"row"}>
                                        <div className={"col"}>
                                            <form onSubmit={this.savePublisher.bind(this)}>
                                                <input type={"hidden"} name={"id"} value={this.state.publisher.id}/>
                                                <div className={"row mb-2"}>
                                                    <div className={"col-md-6 col-ld-6 col-sm-12"}>
                                                        <input type={"text"} name={"name"} placeholder={"Name"}
                                                               defaultValue={this.state.publisher.name}
                                                               className={"form-control mb-2"}/>
                                                        <textarea name={"description"} placeholder={"Description"}
                                                                  defaultValue={this.state.publisher.description}
                                                                  className={"form-control"}>
                                                   </textarea>
                                                        <label htmlFor={"coverImage"}>Cover Image</label>
                                                        <input type={"file"} name={"image"} id={"coverImage"}
                                                               className={"form-control"}
                                                               accept={"image/*"}/>
                                                    </div>
                                                </div>
                                                <div className={"row"}>
                                                    <div className={"col"}>
                                                        <input type={"submit"} className={"btn btn-primary"}
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

export default EditPublisher;