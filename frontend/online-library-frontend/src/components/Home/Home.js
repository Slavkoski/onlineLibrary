import React, {Component} from "react";
import './Home.css'
import Nav from "../Nav/Nav";
import axios from 'axios';
import {Link} from "react-router-dom";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    async componentDidMount() {
        await axios.get("http://localhost:8080/books").then(res => {
            // console.log(res);
            this.setState({
                data: res.data
            })
        }).catch((err) => {
            console.log("Error: ", err);
        })
    }

    searchMedicine = () => {
        let inputSearch = document.getElementById('search').value;
        let url = 'http://localhost:8080/home/search/' + inputSearch;

        axios.get(url).then(res => {
            console.log(res);
            this.setState({
                data: res.data
            })
        }).catch(err => {

        })
    };

    // sortAllAsc = () => {
    //     let url = 'http://localhost:8080/home/sort/10/asc';
    //     axios.get(url).then(res => {
    //         console.log(res);
    //         this.setState({
    //             data: res.data
    //         })
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // };
    // sortAllDesc = () => {
    //     let url = 'http://localhost:8080/home/sort/10/desc';
    //     axios.get(url).then(res => {
    //         console.log(res);
    //         this.setState({
    //             data: res.data
    //         })
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // };
    findAllLiquid = () => {
        let url = 'http://localhost:8080/home/filter/10/liquid';
        axios.get(url).then(res => {
            console.log(res);
            this.setState({
                data: res.data

            })
        }).catch(err => {
            console.log(err)
        })
    };

    findAllSolid = () => {
        let url = 'http://localhost:8080/home/filter/10/solid';
        axios.get(url).then(res => {
            console.log(res);
            this.setState({
                data: res.data
            })
        }).catch(err => {
            console.log(err)
        })
    };


    addToCart = (genericName) => {
        debugger;
        let username = localStorage.getItem('username');
        const form = new FormData();
        form.set('username', username);
        form.set('genericName', genericName);
        axios.post("http://localhost:8080/cart/addToCart", form).then(res => {
            // console.log(res);
            alert('You added medicine to your cart successfully')
        }).catch(err => {
            console.log(err);
        });

    };

    pagination = (e) => {
        debugger;
        let page = e.target.innerText;
        axios.get("http://localhost:8080/home/page/" + page).then(res => {
            this.setState({
                data: res.data
            })
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    };

    render() {
        let najaven = localStorage.getItem('username');

        if (!this.state.data) {
            return (<Nav></Nav>)
        }

        return (
            <div>
                <Nav></Nav>

                <div className="container mt-3" style={{minWidth: "1000px"}}>
                    <div className="row">
                        {
                            this.state.data.map((item, index) => {
                                return (
                                    <div key={index} className="col-lg-4 col-md-4 col-sm-4">
                                        <div className="card m-2" style={{width: "18rem"}}>
                                            <img className="card-img-top"
                                                 src="https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                                 alt="" width={40} height={220}/>
                                            <div className="card-body">
                                                <h5 className="card-title"><a
                                                    href={"/books/details/" + item.id}> {item.title}</a>
                                                </h5>
                                                <span className={"card-text"}>
                                                {
                                                    item.author.map((author, index) => {
                                                        return (
                                                            <a href={"/authors/details/" + author.id}>{author.firstName} {author.lastName}{index === item.author.length - 1 ? "" : ", "} </a>)
                                                    })
                                                }
                                                </span>
                                                <p className={"card-text"}>
                                                    {item.publishedYear}
                                                </p>

                                                <a className="btn btn-primary btn btn-primary btn btn-primary align-content-center w-50"
                                                   href={"/books/details/" + item.id}>Details</a>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }

                    </div>
                    <div className="text-center">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">

                                <li className="page-item"><a className="page-link" style={{color: "#007bff"}}
                                                             onClick={(e) => this.pagination(e)}>1</a></li>
                                <li className="page-item"><a className="page-link"
                                                             onClick={(e) => this.pagination(e)}>2</a></li>
                                <li className="page-item"><a className="page-link"
                                                             onClick={(e) => this.pagination(e)}>3</a></li>
                                <li className="page-item"><a className="page-link"
                                                             onClick={(e) => this.pagination(e)}>4</a></li>
                                <li className="page-item"><a className="page-link"
                                                             onClick={(e) => this.pagination(e)}>5</a></li>
                                <li className="page-item"><a className="page-link"
                                                             onClick={(e) => this.pagination(e)}>6</a></li>
                                <li className="page-item"><a className="page-link"
                                                             onClick={(e) => this.pagination(e)}>7</a></li>
                                <li className="page-item"><a className="page-link"
                                                             onClick={(e) => this.pagination(e)}>8</a></li>
                                <li className="page-item"><a className="page-link"
                                                             onClick={(e) => this.pagination(e)}>9</a></li>
                                <li className="page-item"><a className="page-link"
                                                             onClick={(e) => this.pagination(e)}>10</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>

            </div>

        )
    }

}

export default Home;