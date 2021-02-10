import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./components/Home/Home";
import GenreList from "./components/GenreList/GenreList";
import GenreDetails from "./components/GenreDetails/GenreDetails";
import BookDetails from "./components/BookDetails/BookDetails";
import AuthorList from "./components/AuthorList/AuthorList";
import AuthorDetails from "./components/AuthorDetails/AuthorDetails";
import PublisherList from "./components/PublisherList/PublisherList";
import PublisherDetails from "./components/PublisherDetails/PublisherDetails";
import AddBook from "./components/AddBook/AddBook";
import AddAuthor from "./components/AddAuthor/AddAuthor";
import SearchResult from "./components/SearchResult/SearchResult";
import EditAuthor from "./components/EditAuthor/EditAuthor";
import EditBook from "./components/EditBook/EditBook";
import EditPublisher from "./components/EditPublisher/EditPublisher";
import Login from "./components/Login/Login";
import SignUp from "./components/SighUp/SignUp";
import UserManagement from "./components/UserManagement/UserManagement";
import UserDetails from "./components/UserDetails/UserDetails";
import EditUser from "./components/EditUser/EditUser";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import UpdateToPremium from "./components/UpdateToPremium/UpdateToPremium";
class App extends Component {



    render() {
        let routes = (
                <BrowserRouter>
                    <Route path="/" exact component={Home}/>
                    <Route path="/books" component={Home}/>
                    <Route path="/booksPage/:pageNumber" component={Home}/>
                    <Route path="/booksByPriority/:priority" component={Home}/>
                    <Route path="/genres" component={GenreList}/>
                    <Route path="/genre/:id" component={GenreDetails}/>
                    <Route path="/genrePage/:id/:pageNumber" component={GenreDetails}/>
                    <Route path="/book/:id" component={BookDetails}/>
                    <Route path="/authors" component={AuthorList}/>
                    <Route path="/author/:id" component={AuthorDetails}/>
                    <Route path="/publishers" component={PublisherList}/>
                    <Route path="/publisher/:id" component={PublisherDetails}/>
                    <Route path="/addBook" component={AddBook}/>
                    <Route path="/addAuthor" component={AddAuthor}/>
                    <Route path="/search/:searchTerm" component={SearchResult}/>
                    <Route path="/editAuthor/:id" component={EditAuthor}/>
                    <Route path="/editBook/:id" component={EditBook}/>
                    <Route path="/editPublisher/:id" component={EditPublisher}/>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route path="/users/management" component={UserManagement}/>
                    <Route path="/users/details/:id" component={UserDetails}/>
                    <Route path="/users/edit/:id" component={EditUser}/>
                    <Route path="/users/password/:id" component={ChangePassword}/>
                    <Route path="/updateToPremium" component={UpdateToPremium}/>
                </BrowserRouter>
            );
        return (
            <div>  {routes} </div>

        );
    }
}
export default App;
