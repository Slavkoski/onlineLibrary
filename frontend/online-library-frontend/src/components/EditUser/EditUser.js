import React, {Component} from "react";
import axios from "axios";
import Nav from "../Nav/Nav";
import fetchClient from "../../fetchClient";
import {checkUserHasRole} from "../../Util";

class EditUser extends Component {
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

    saveEdit(event) {
        event.preventDefault();
        var formDataObject = new FormData(event.target);
        fetchClient.post("http://localhost:8080/users/edit", formDataObject)
            .then(res => {
                this.props.history.push("/users/details/" + this.state.data.id);
            })
            .catch(err=>{
                console.log(err)
            })
    }

    updateDataValue(dataName, value) {
        var dataToUpdate = this.state.data;
        dataToUpdate[dataName] = value;
        this.setState({data: dataToUpdate})
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
                                    <form id={"editUserId"} className="edit-user-id"
                                          onSubmit={this.saveEdit.bind(this)}>
                                        <h2 className="form-signin-heading">Edit User</h2>
                                        <div className="form-group">
                                            <label htmlFor={"firstName"}>FirstName</label>
                                            <input type="text"
                                                   className="form-control"
                                                   name={"firstName"}
                                                   id={"firstName"}
                                                   placeholder="First name"
                                                   onChange={e => this.updateDataValue("firstName",e.target.value)}
                                                   value={this.state.data.firstName}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={"lastName"}>Last Name</label>
                                            <input type="text"
                                                   className="form-control"
                                                   name="lastName"
                                                   id="lastName"
                                                   onChange={e => this.updateDataValue("lastName",e.target.value)}
                                                   value={this.state.data.lastName}
                                                   placeholder="Last name"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={"email"}>Email</label>
                                            <input type="email"
                                                   className="form-control"
                                                   name="email"
                                                   id="email"
                                                   onChange={e => this.updateDataValue("email",e.target.value)}
                                                   value={this.state.data.email}
                                                   placeholder="Email"/>
                                        </div>
                                        {
                                            this.state.data && this.state.currentUser
                                            && checkUserHasRole(this.state.currentUser, "ADMIN") ?
                                                <div className="form-group">
                                                    <label htmlFor={"role"}>Role</label>
                                                    <select name={"roleName"} id={"role"} className="form-control"
                                                            onChange={e => this.updateDataValue("roleName",e.target.value)}>
                                                        <option value="ADMIN"
                                                                selected={this.state.data.roles[0] === "ADMIN"}>Admin
                                                        </option>
                                                        <option value="REGISTERED_USER"
                                                                selected={this.state.data.roles[0] === "REGISTERED_USER"}>Registered
                                                        </option>
                                                        <option value="PREMIUM_USER"
                                                                selected={this.state.data.roles[0] === "PREMIUM_USER"}>Premium
                                                        </option>
                                                    </select>
                                                </div>
                                                : <input type="hidden" name="roleName"
                                                         value={this.state.data.roles[0]}/>
                                        }
                                        <input type="hidden" name="id" value={this.state.id}/>
                                        <div className="form-group">
                                            <label onClick={()=>this.props.history.push("/users/password/"+this.state.id)}>Change Password</label>
                                        </div>
                                        <button className="btn btn-lg btn-primary btn-block" type="submit">
                                            Save
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

export default EditUser;