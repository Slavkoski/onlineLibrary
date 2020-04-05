import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {
    withRouter
} from 'react-router-dom';
import './Nav.css';

class Nav extends Component {

    state = {
        menuShown: false,
        searchTerm: ""
    };


    toggleSidebar() {
        let menuClass = '';
        let toggleClass = '';

        if (this.state.menuShown) {
            menuClass = 'menu';
            toggleClass = '';
        } else {
            menuClass = 'menu menu_shown';
            toggleClass = 'active'
        }

        document.getElementById('menu').setAttribute('class', menuClass);
        document.getElementById('nav-toggle').setAttribute('class', toggleClass);

        this.setState((prevState) => ({
            menuShown: !prevState.menuShown
        }));
    }

    search(event){
        // event.preventDefault();
        var form = new FormData(event.target);
        this.props.history.push("/search/"+form.get("searchTerm"));
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
                    <button type="button" className="navbar-toggler" data-toggle="collapse"
                            data-target="#navbarCollapse1">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={"container"}>
                        <div className="collapse navbar-collapse" id="navbarCollapse1">
                            <div className="navbar-nav">
                                <div>
                                    <NavLink key={'navbar-books'}
                                             style={{
                                                 color: "white",
                                                 fontSize: "initial",
                                                 fontWeight: "bold"
                                             }}
                                             className="menu_menu m-4" to={'/books'}>
                                        Home
                                    </NavLink>
                                    <NavLink key={'navbar-authors'}
                                             style={{
                                                 color: "white",
                                                 fontSize: "initial",
                                                 fontWeight: "bold"
                                             }}
                                             className="menu_menu m-4" to={'/authors'}>
                                        Authors
                                    </NavLink>
                                    <NavLink key={'navbar-genre'}
                                             style={{
                                                 color: "white",
                                                 fontSize: "initial",
                                                 fontWeight: "bold"
                                             }}
                                             className="nav-item m-4" to={'/genres'}>
                                        Genres
                                    </NavLink>
                                    <NavLink key={'navbar-publishers'}
                                             style={{
                                                 color: "white",
                                                 fontSize: "initial",
                                                 fontWeight: "bold"
                                             }}
                                             className="menu_menu nav-item m-4" to={'/publishers'}>
                                        Publishers
                                    </NavLink>
                                    <NavLink key={'navbar-add-book'}
                                             style={{
                                                 color: "white",
                                                 fontSize: "initial",
                                                 fontWeight: "bold"
                                             }}
                                             className="menu_menu m-4" to={'/addBook'}>
                                        Add Book
                                    </NavLink>
                                    <NavLink key={'navbar-add-author'}
                                             style={{
                                                 color: "white",
                                                 fontSize: "initial",
                                                 fontWeight: "bold"
                                             }}
                                             className="menu_menu m-4" to={'/addAuthor'}>
                                        Add Author
                                    </NavLink>
                                </div>
                            </div>
                            <div className={"navbar-nav ml-auto m-2 w-30"}>
                                <form onSubmit={this.search.bind(this)} noValidate>
                                <div className="input-group">
                                    <input type="text" className="form-control" name={"searchTerm"} id="search" placeholder="Search"/>
                                    <div className="input-group-append">
                                        <button type={"submit"} className="btn btn-secondary">
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default withRouter(Nav);