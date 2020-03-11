import React, {Component} from "react";
import './GenreDetails.css'
import Nav from "../Nav/Nav";
import axios from 'axios';
import CategoryList from "../CaregoryList/CategoryList";

class GenreDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            id: props.match.params.id
        }
    }

    async componentDidMount() {
        await axios.get("http://localhost:8080/genre/"+this.state.id).then(res => {
            this.setState({
                data: res.data
            })
        }).catch((err) => {
            console.log("Error: ", err);
        })
    }

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

        if (!this.state.data) {
            return (<Nav></Nav>)
        }

        return (
            <div>
                <Nav></Nav>

                <div className="container mt-3" style={{minWidth: "1000px"}}>
                    <div className="row">
                        <div className={"col-md-2 col-ld-3 col-sm-12 border"}>
                            <CategoryList></CategoryList>
                        </div>
                        <div className={"col-md-10 col-ld-9 col-sm-12"}>
                            <div className={"row"}>
                                <div className={"col"}>
                                    <h1>{this.state.data.name}</h1>
                                </div>
                            </div>
                            <div className={"row"}>
                                {
                                    this.state.data.books.map((item, index) => {
                                        return (
                                            <div key={index} className="col-lg-4 col-md-4 col-sm-4">
                                                <div className="card m-2" style={{width: "18rem"}}>
                                                    <img className="card-img-top"
                                                         src="https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                                         alt="" width={40} height={220}/>
                                                    <div className="card-body">
                                                        <h5 className="card-title"><a
                                                            href={"/book/" + item.id}> {item.title}</a>
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
                                                           href={"/book/" + item.id}>Details</a>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }

                            </div>
                        </div>

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

export default GenreDetails;