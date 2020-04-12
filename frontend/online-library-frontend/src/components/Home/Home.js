import React, {Component} from "react";
import Nav from "../Nav/Nav";
import axios from 'axios';
import CategoryList from "../CaregoryList/CategoryList";
import PageLine from "../PageLine/PageLine";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            pageNumber: props.match.params.pageNumber
        }
    }

    async componentDidMount() {
        var pageNum= this.state.pageNumber ? this.state.pageNumber : 1;
        await axios.get("http://localhost:8080/books/page/"+pageNum).then(res => {
            this.setState({
                data: res.data,
                pageNumber: pageNum
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
                        <div className={"col-md-2 col-ld-3 col-sm-12 border transparent-bg rounded"}>
                            <CategoryList></CategoryList>
                        </div>
                        <div className="col-md-10 col-ld-9 col-sm-12">
                            <div className={"row transparent-bg ml-2 border rounded"}>
                                {
                                    this.state.data.map((item, index) => {
                                        return (
                                            <div key={index} className="col-lg-4 col-md-6 col-sm-6 col-flex">
                                                <div className="card m-2">
                                                    <img className="img-home"
                                                         src={"http://localhost:8080/books/image/"+item.id} alt=""/>
                                                    <div className="card-body">
                                                        <h5 className="card-title"><a className={"link-no-decoration"}
                                                            href={"/book/" + item.id}> {item.title}</a>
                                                        </h5>
                                                        <span className={"card-text"}>
                                                {
                                                    item.author.map((author, index) => {
                                                        return (
                                                            <a className={"link-no-decoration"} href={"/author/" + author.id}>{author.firstName} {author.lastName}{index === item.author.length - 1 ? "" : ", "} </a>)
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
                    <PageLine path={"http://localhost:3000/booksPage/"} numberOfPagesPath={"http://localhost:8080/books/numberOfPages"} currentPage={this.state.pageNumber}></PageLine>
                </div>

            </div>

        )
    }

}

export default Home;