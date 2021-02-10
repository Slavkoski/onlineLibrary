import React, {Component} from "react";
import Nav from "../Nav/Nav";
import fetchClient from "../../fetchClient";
import {checkUserHasRole} from "../../Util";

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            currentUser: null,
            id: props.match.params.id
        }
    }

    async componentDidMount() {
        await fetchClient.get("http://localhost:8080/users/details/" + this.state.id)
            .then(res => {
                if (res.data) {
                    this.setState({
                        data: res.data,
                        currentUser: JSON.parse(localStorage.getItem("userDetails"))
                    });
                }
            })
    }

    changePassword(event) {
        event.preventDefault();
        var formDataObject = new FormData(event.target);
        fetchClient.post("http://localhost:8080/users/changePassword", formDataObject)
            .then(res => {
                this.props.history.push("/users/details/" + this.state.data.id);
            })
            .catch(err => {
                console.log(err)
            })
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
                            <div className="col bg-light rounded p-3">
                                {(this.state.data && this.state.currentUser
                                    && this.state.data.id === this.state.currentUser.id)
                                || checkUserHasRole(this.state.currentUser, "ADMIN") ?
                                    <form id={"changePassword"} className="edit-user-id"
                                          onSubmit={this.changePassword.bind(this)}>
                                        <h2 className="form-signin-heading">Change Password</h2>
                                        {
                                            !checkUserHasRole(this.state.currentUser, "ADMIN")
                                                ?
                                                <div className="form-group">
                                                    <label htmlFor={"oldPassword"}>Old Password</label>
                                                    <input type="password"
                                                           className="form-control"
                                                           name={"oldPassword"}
                                                           id={"oldPassword"}
                                                           placeholder="Old Password"/>
                                                </div>
                                                : ""
                                        }
                                        <div className="form-group">
                                            <label htmlFor={"newPassword"}>New Password</label>
                                            <input type="password"
                                                   className="form-control"
                                                   name={"newPassword"}
                                                   id={"newPassword"}
                                                   placeholder="New Password"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={"repeatNewPassword"}>Repeat New Password</label>
                                            <input type="password"
                                                   className="form-control"
                                                   name={"repeatNewPassword"}
                                                   id={"repeatNewPassword"}
                                                   placeholder="Repeat New Password"/>
                                        </div>
                                        <input type="hidden" name="id" value={this.state.id}/>
                                        <button className="btn btn-lg btn-primary btn-block" type="submit">
                                            Change Password
                                        </button>
                                    </form>
                                    : "User doesn't exists or you don't have permisions to edit"
                                }
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

export default ChangePassword;