import React, {Component} from "react";
import axios from "axios";
import Nav from "../Nav/Nav";
import fetchClient from "../../fetchClient";

class UserManagement extends Component {
    constructor() {
        super();
        this.state = {
            admins: [],
            premium: [],
            registered: []
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    async componentWillMount() {
        await fetchClient.get("http://localhost:8080/users/ADMIN")
            .then(res => {
                if (res.data) {
                    this.setState({
                        admins: res.data
                    });
                }
            })
        await fetchClient.get("http://localhost:8080/users/PREMIUM_USER")
            .then(res => {
                if (res.data) {
                    this.setState({
                        premium: res.data
                    });
                }
            })
        await fetchClient.get("http://localhost:8080/users/REGISTERED_USER")
            .then(res => {
                if (res.data) {
                    this.setState({
                        registered: res.data
                    });
                }
            })
    }

    handleFormSubmit = event => {
        event.preventDefault();

        const endpoint = "http://localhost:8080/login";

        const username = this.state.username;
        const password = this.state.password;

        const user_object = {
            username: username,
            password: password
        };

        axios.post(endpoint, user_object).then(res => {
            localStorage.setItem("Authorization", res.data.Authorization);
            return this.handleDashboard();
        });
    };

    handleFormSubmitSignUp = event => {
        event.preventDefault();

        const endpoint = "http://localhost:8080/users/sign-up";

        const username = this.state.username;
        const password = this.state.password;

        const user_object = {
            username: username,
            password: password
        };
        axios.post(endpoint, user_object).then(res => {
            localStorage.setItem("Authorization", res.data.token);
            return this.handleDashboard();
        });
    };

    handleDashboard() {
        this.props.history.push("books")
    }

    async signUp(event) {
        event.preventDefault();
        var formElement = event.target;
        var formData = {
            firstName: formElement.firstName.value,
            lastName: formElement.lastName.value,
            email: formElement.email.value,
            password: formElement.password.value
        }
        var formDataObject = new FormData(event.target);
        axios.post("http://localhost:8080/sign-up", formDataObject)
            .then(res => {
                this.props.history.push("books");
            });
    }

    render() {
        return (
            <div>
                <Nav></Nav>

                <div className="container mt-3" style={{minWidth: "1000px"}}>
                    <div className="row border transparent-bg rounded p-5">
                        <div className={"col bg-light rounded p-3 m-2"}>
                            <div className="row">
                                <div className="col">
                                    Admins:
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    {
                                        this.state.admins.map((adminUser, index) => {
                                            return <div className="row">
                                                <div className="col">
                                                    <a href={"/users/details/"+adminUser.id}>{adminUser.firstName} {adminUser.lastName}</a>
                                                </div>
                                            </div>;
                                        })
                                    }
                                </div>
                            </div>

                        </div>
                        <div className="col bg-light rounded p-3 m-2">
                            <div className="row">
                                <div className="col">
                                    Premium users:
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    {
                                        this.state.premium.map((premiumUser, index) => {
                                            return <div className="row">
                                                <div className="col">
                                                    <a href={"/users/details/"+premiumUser.id}>{premiumUser.firstName} {premiumUser.lastName}</a>
                                                </div>
                                            </div>;
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={"col bg-light rounded p-3 m-2"}>
                            <div className="row">
                                <div className="col">
                                    Registered users:
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    {
                                        this.state.registered.map((registeredUser, index) => {
                                            return <div className="row">
                                                <div className="col">
                                                    <a href={"/users/details/"+registeredUser.id}>{registeredUser.firstName} {registeredUser.lastName}</a>
                                                </div>
                                            </div>;
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserManagement;