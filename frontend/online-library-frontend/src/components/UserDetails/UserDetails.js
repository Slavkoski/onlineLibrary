import React, {Component} from "react";
import axios from "axios";
import Nav from "../Nav/Nav";
import fetchClient from "../../fetchClient";
import {checkUserHasRole} from "../../Util";

class UserDetails extends Component {
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

    editUser() {
        this.props.history.push("/users/edit/"+this.state.id);
    }

    deleteUser() {
        const user=new FormData();
        user.append("userId", this.state.id)
        if(window.confirm("Are you sure that you want to delete")){
            fetchClient.post("http://localhost:8080/users/delete",user)
                .then(()=>{
                    this.props.history.push("/books");
                })
                .catch((err)=>{
                    alert("Failed to delete user")
                })
        }else{
            alert("I changed my mind")
        }
    }

    updateToPremium() {
        this.props.history.push("/updateToPremium")
    }

    unsubscribePremium(){
        fetchClient.post("http://localhost:8080/users/removePremium")
            .then(res => {
                if(res.data) {
                    localStorage.removeItem("userDetails")
                    localStorage.setItem("userDetails", JSON.stringify(res.data))
                }
                window.location.reload(false);
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
                            <div className="row">
                                <div className="col">
                                    <div className="col">
                                        <div className="row">
                                            FirstName
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="row">
                                            LastName
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="row">
                                            Email
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="row">
                                            UserType
                                        </div>
                                    </div>
                                </div>
                                {this.state.data ?
                                    <div className="col">
                                        <div className="col">
                                            <div className="row">
                                                {this.state.data.firstName}
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="row">
                                                {this.state.data.lastName}
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="row">
                                                {this.state.data.email}
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="row">
                                                {this.state.data.roles[0]}
                                            </div>
                                        </div>
                                    </div>
                                    : ""
                                }

                            </div>
                            {(this.state.currentUser
                                && this.state.data.id === this.state.currentUser.id)
                            || checkUserHasRole(this.state.currentUser, "ADMIN")
                                ?
                                <div className="row">
                                    <div className="col text-right">
                                        {(this.state.currentUser
                                            && this.state.data.id === this.state.currentUser.id)
                                        && !checkUserHasRole(this.state.currentUser, "ADMIN")
                                            && !checkUserHasRole(this.state.currentUser, "PREMIUM_USER")
                                            ?
                                            <button className="btn btn-info mr-2"
                                                    onClick={()=>this.updateToPremium()}>Get Premium</button>
                                            : ""
                                        }
                                        {(this.state.currentUser
                                            && this.state.data.id === this.state.currentUser.id)
                                        && !checkUserHasRole(this.state.currentUser, "ADMIN")
                                        && checkUserHasRole(this.state.currentUser, "PREMIUM_USER")
                                            ?
                                            <button className="btn btn-info mr-2"
                                                    onClick={()=>this.unsubscribePremium()}>Unsubscribe</button>
                                            : ""
                                        }
                                        <button className="btn btn-info mr-2" onClick={()=>this.editUser()}>Edit
                                        </button>
                                        <button className="btn btn-danger"
                                                onClick={()=>this.deleteUser()}>Delete
                                        </button>
                                    </div>
                                </div>
                                : ""
                            }
                        </div>
                        <div className={"col-3"}>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserDetails;