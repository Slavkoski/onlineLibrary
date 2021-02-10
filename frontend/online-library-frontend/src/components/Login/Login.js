import React, {Component} from "react";
import axios from "axios";
import Nav from "../Nav/Nav";

class login extends Component {
    constructor() {
        super();
    }


    showErrorWhileLogIn(){
        var errorMessageElement=document.getElementById("errorMessage");
        var logInButtonElement=document.getElementById("logInButton");
        if(errorMessageElement && logInButtonElement){
            errorMessageElement.classList.remove("hidden");
            logInButtonElement.classList.remove("btn-primary");
            logInButtonElement.classList.add("btn-danger");
        }
    }
    async logIn(event) {

        event.preventDefault();
        var formElement=event.target;
        var formData={
            email: formElement.username.value,
            password: formElement.password.value
        }
        axios.post("http://localhost:8080/login", formData,
            {})
            .then(res => {
                localStorage.setItem("Authorization", res.data.Authorization);
                this.props.history.push("books");
            })
            .catch(()=>{
                this.showErrorWhileLogIn();
            })
    }

    render() {
        return (
            <div>
                <Nav></Nav>

                <div className="container mt-3" style={{minWidth: "1000px"}}>
                    <div className="row border transparent-bg rounded p-5">
                        <div className={"col-3"}></div>
                        <div className="col bg-light rounded p-3">
                            <form className="form-login" id={"otherId"} onSubmit={this.logIn.bind(this)}>
                                <h2 className="form-signin-heading">Please login</h2>
                                <div className="form-group">
                                    <input type="text"
                                           className="form-control"
                                           name="username"
                                           placeholder="User name"/>
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                           className="form-control"
                                           name="password"
                                           placeholder="password"/>
                                </div>
                                <span id="errorMessage" className="hidden text-danger">Wrong username or password</span>
                                <button id="logInButton" className="btn btn-lg btn-primary btn-block" type="submit">
                                    Login
                                </button>
                                Still not having accound? <a className="" href={"/signup"}>Join Us</a>
                            </form>
                        </div>
                        <div className={"col-3"}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default login;