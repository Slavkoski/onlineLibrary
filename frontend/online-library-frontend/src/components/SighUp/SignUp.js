import React, {Component} from "react";
import axios from "axios";
import Nav from "../Nav/Nav";

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            username: "admin",
            password: "admin"
        };
    }

    handleDashboard() {
        this.props.history.push("books")
    }

    async signUp(event) {
        event.preventDefault();
        var formDataObject=new FormData(event.target);
        var password=document.getElementById("password").value;
        var confirmedPassword=document.getElementById("confirmedPassword").value;
        if(password!==confirmedPassword){
           this.showErrorWhileSignUp();
        }else{
        axios.post("http://localhost:8080/sign-up", formDataObject)
            .then(res => {
                this.props.history.push("books");
            });
        }
    }

    showErrorWhileSignUp(){
        var errorMessageElement=document.getElementById("errorMessage");
        var logInButtonElement=document.getElementById("signUpButton");
        if(errorMessageElement && logInButtonElement){
            errorMessageElement.classList.remove("hidden");
            logInButtonElement.classList.remove("btn-primary");
            logInButtonElement.classList.add("btn-danger");
        }
    }

    render() {
        return (
            <div>
                <Nav></Nav>

                <div className="container mt-3" style={{minWidth: "1000px"}}>
                    <div className="row border transparent-bg rounded p-5">
                        <div className={"col-3"}></div>
                        <div className="col bg-light rounded p-3">
                            <form id={"someId"} className="form-signup" onSubmit={this.signUp.bind(this)}>
                                <h2 className="form-signin-heading">Sign up</h2>
                                <div className="form-group">
                                    <input type="text"
                                           className="form-control"
                                           name={"firstName"}
                                           required={true}
                                           placeholder="First name"/>
                                </div>
                                <div className="form-group">
                                    <input type="text"
                                           className="form-control"
                                           name="lastName"
                                           required={true}
                                           placeholder="Last name"/>
                                </div>
                                <div className="form-group">
                                    <input type="email"
                                           className="form-control"
                                           name="email"
                                           required={true}
                                           placeholder="Email"/>
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                           className="form-control"
                                           name="password"
                                           required={true}
                                           id="password"
                                           placeholder="Password"/>
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                           className="form-control"
                                           name="confirmedPassword"
                                           required={true}
                                           id="confirmedPassword"
                                           placeholder="Confirm your password"/>
                                </div>
                                <span id="errorMessage" className="hidden text-danger">Password and repeated password did not match</span>
                                <button id="signUpButton" className="btn btn-lg btn-primary btn-block" type="submit">
                                    Sign Up
                                </button>
                            </form>
                        </div>
                        <div className={"col-3"}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;