import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
// import Login from "./components/Login/Login";
// import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";
import GenreList from "./components/GenreList/GenreList";
import GenreDetails from "./components/GenreDetails/GenreDetails"
import BookDetails from "./components/BookDetails/BookDetails"
import AuthorList from "./components/AuthorList/AuthorList"
// import Liquid from "./components/Liquid/Liquid";
// import Logout from './components/Logout/Logout';
// import MedicineDetails from "./components/Details/MedicineDetails";
// import Cart from './components/Cart/Cart';

class App extends Component {

    render() {
        var routes = (
                <BrowserRouter>
                    <Route path="/" exact component={Home}/>
                    <Route path="/books" component={Home}/>
                    <Route path="/genres" component={GenreList}/>
                    <Route path="/genre/:id" component={GenreDetails}/>
                    <Route path="/book/details/:id" component={BookDetails}/>
                    <Route path="/authors" component={AuthorList}/>
                    {/*<Route path="/signup" component={SignUp}/>*/}
                </BrowserRouter>
            );
        return (
            <div>  {routes} </div>

        );
    }
}
export default App;
