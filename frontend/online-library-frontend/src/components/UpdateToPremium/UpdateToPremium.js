import React, {Component} from "react";
import axios from "axios";
import Nav from "../Nav/Nav";
import fetchClient from "../../fetchClient";

class UpdateToPremium extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            currentUser: JSON.parse(localStorage.getItem("userDetails")),
        }
    }

    updateToPremium(event) {
        event.preventDefault();
        // var formDataObject=new FormData(event.target);
        fetchClient.post("http://localhost:8080/users/upgradeToPremium")
            .then(res => {
                if(res.data) {
                    localStorage.removeItem("userDetails")
                    localStorage.setItem("userDetails", JSON.stringify(res.data))
                }
                this.props.history.push("/users/details/"+this.state.currentUser.id);
            });
    }

    render() {
        return (
            <div>
                <Nav></Nav>

                <div className="container mt-3" style={{minWidth: "1000px"}}>
                    <div className="row border transparent-bg rounded p-5">
                        <div className={"col-3"}>
                        </div>
                        <div className="col bg-light rounded p-3 m-2">
                            <h4>Upgrade to premium for only 10$ a month</h4>
                            <div className="row">
                                <div className="col">
                                    <form onSubmit={this.updateToPremium.bind(this)}>
                                        <div className="form-group">
                                            <label htmlFor={"cardNumber"}>Card number</label>
                                            <input type="text"
                                                   className="form-control"
                                                   name={"cardNumber"}
                                                   id={"cardNumber"}
                                                   required={true}
                                                   placeholder="Card Number"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={"cardholderName"}>Cardholder Name</label>
                                            <input type="text"
                                                   className="form-control"
                                                   name="cardholderName"
                                                   id="cardholderName"
                                                   required={true}
                                                   placeholder="Cardholder Name"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={"securityNumber"}>Security number</label>
                                            <input type="number"
                                                   className="form-control"
                                                   name="securityNumber"
                                                   id="securityNumber"
                                                   required={true}
                                                   placeholder="Security number"/>
                                        </div>
                                        <div className="form-group">
                                            <input type="submit" className="btn btn-success float-right mr-3" value="Upgrade"/>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className={"col-3"}>
                        </div>
                    </div>
                </div>
            </div>
    );
    }
    }

    export default UpdateToPremium;