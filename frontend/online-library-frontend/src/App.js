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
class App extends Component {

    render() {
        let routes = (
                <BrowserRouter>
                    <Route path="/" exact component={Home}/>
                    <Route path="/books" component={Home}/>
                    <Route path="/booksPage/:pageNumber" component={Home}/>
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
                </BrowserRouter>
            );
        return (
            <div>  {routes} </div>

        );
    }
}
export default App;
