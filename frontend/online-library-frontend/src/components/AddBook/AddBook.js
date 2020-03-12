import React, {Component} from "react";
// import './GenreList.css'
import Nav from "../Nav/Nav";
import axios from 'axios';
// import {DropzoneArea} from "material-ui-dropzone"

class AddBook extends Component {

    constructor(props) {
        super(props);
        this.state={
            authors: null,
            publishers: null,
            genres: null
        }
    }

    async componentDidMount() {
        // document.getElementById("selectId").onchange = function(e){
        //     var id = document.getElementById('selectId').value;
        //     alert("id: "+id);
        // };
        await axios.get("http://localhost:8080/authors").then(res=>{
            this.setState({
                authors: res.data
            })
        }).catch(err=>{
            console.log(err);
        });

        await axios.get("http://localhost:8080/genre").then(res=>{
            this.setState({
                genres: res.data
            })
        }).catch(err=>{
            console.log(err);
        });

        await axios.get("http://localhost:8080/publisher").then(res=>{
            this.setState({
                publishers: res.data
            })
        }).catch(err=>{
            console.log(err);
        })
    }

    addBook(event) {
        event.persist();
        const form = new FormData(event.target);
            // console.log(form.get("image"));
        // if (form.get("title")) {
            axios.post("http://localhost:8080/books/add/", form,{})
        // }
    }

    // addHiddenInput(name,idValue){
    //     // alert("heeey")
    //     var hiddenInput=document.createElement("input");
    //     hiddenInput.setAttribute("type","hidden");
    //
    //     document.getElementById("add-book-form-id")
    // }

    // addAuthor(){
    //     alert("haaay")
    // }

    render() {

        return (
            <div>
                <Nav></Nav>
                <div className={"container mt-2 mb-2 border rounded bg-light"}>
                    <div className={"row mt-2 mb-3"}>
                        <div className={"col"}>
                            <div className={"row"}>
                                <div className={"col"}>
                                    Add new book
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"col"}>
                                    <form id="add-book-form-id" onSubmit={this.addBook}>
                                        <div className={"row mb-2"}>
                                            <div className={"col-md-6 col-ld-6 col-sm-12"}>
                                                <input type={"text"} name={"title"} placeholder={"Title"} required
                                                       className={"form-control mb-2"}/>
                                                <input type={"number"} name={"publishedYear"}
                                                       placeholder={"Published year"} required min={0} max={2100}
                                                       className={"form-control mb-2"}/>
                                                <textarea name={"description"} placeholder={"Description"} required
                                                          className={"form-control"}>
                                                   </textarea>
                                                <input type={"file"} name={"image"} className={"form-control"} accept={"image/*"}/>
                                                <input type={"file"} name={"pdf"} className={"form-control"} accept={".pdf"}/>
                                                <input type={"hidden"} name={"authors"} value={1}/>
                                                <input type={"hidden"} name={"authors"} value={2}/>
                                                <input type={"hidden"} name={"genreId"} value={1}/>
                                                <input type={"hidden"} name={"genreId"} value={2}/>
                                                <input type={"hidden"} name={"publisherId"} value={1}/>
                                            </div>
                                        </div>
                                        <div className={"row"}>
                                            <div className={"col"}>
                                                <input type={"submit"} className={"btn btn-primary"}
                                                       value={"Add Book"}/>
                                            </div>
                                        </div>
                                        <div className={"row"}>
                                            <div className={"col"}>
                                                {/*<input type={"file"} name={"image"} className={"form-control"} accept={"image/*"}/>*/}
                                            </div>
                                        </div>
                                        {/*<DropzoneArea*/}
                                        {/*    acceptedFiles={['image/*']}*/}
                                        {/*    filesLimit={1}*/}
                                        {/*    maxFileSize={20000000}*/}
                                        {/*    dropzoneText={"Drop files to upload or click to browse"}*/}
                                        {/*    name={"image"}*/}
                                        {/*    useChipsForPreview*/}
                                        {/*/>*/}
                                        {/*<select id="selectId"className={"form-control"} onChange={this.addAuthor()}>*/}
                                        {/*    <option key={-1} selected disabled value={""}>Choose Author</option>*/}
                                            {/*{*/}
                                            {/*    this.state.authors ?*/}
                                            {/*        this.state.authors.map((item,index)=>{*/}
                                            {/*            return <option key={item.id} value={item.id}>{item.firstName+" "+item.lastName}</option>;*/}
                                            {/*        }):("")*/}
                                            {/*}*/}
                                        {/*</select>*/}

                                        {
                                            this.state.publishers ?
                                                this.state.publishers.map((item,index)=>{
                                                    return item.name+" ";
                                                }):
                                                <div>
                                                    dasdasdasdas dasdas
                                                </div>
                                        }
                                        {
                                            this.state.genres ?
                                                this.state.genres.map((item,index)=>{
                                                    return item.name+" ";
                                                }):
                                                <div>
                                                    dasdasdasdas dasdas
                                                </div>
                                        }
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default AddBook;