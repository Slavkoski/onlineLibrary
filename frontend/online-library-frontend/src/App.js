import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
// import Login from "./components/Login/Login";
// import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";
// import Solid from "./components/Solid/Solid";
// import Liquid from "./components/Liquid/Liquid";
// import Logout from './components/Logout/Logout';
// import MedicineDetails from "./components/Details/MedicineDetails";
// import Cart from './components/Cart/Cart';

class App extends Component {

    render() {
        var najaven = localStorage.getItem('username');
        var routes;
        if(!najaven) {
            routes = (
                <BrowserRouter>
                    <Route path="/" exact component={Home}/>
                    <Route path="/home" component={Home}/>
                    {/*<Route path="/login" component={Login}/>*/}
                    {/*<Route path="/signup" component={SignUp}/>*/}
                </BrowserRouter>
            );
        } else {
            routes = (
                <BrowserRouter>
                    <Route path="/" exact component={Home}/>
                    <Route path="/home" component={Home}/>
                    {/*<Route path="/logout" component={Logout}/>*/}
                    {/*<Route path="/signup" component={SignUp}/>*/}
                    {/*<Route path="/cart" component={Cart}/>*/}
                    {/*<Route path="/solid" component={Solid}/>*/}
                    {/*<Route path="/liquid" component={Liquid}/>*/}
                    {/*<Route path="/details/:name" component={MedicineDetails}/>*/}
                </BrowserRouter>
            );
        }


        return (
            <div>  {routes} </div>

        );
    }
}
export default App;
