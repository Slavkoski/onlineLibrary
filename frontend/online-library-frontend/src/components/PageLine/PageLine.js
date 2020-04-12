import React, {Component} from "react";
import axios from 'axios';

class PageLine extends Component {

    constructor(props) {
        super(props);
        this.state = {
            path: props.path,
            numberOfPages: 0,
            currentPage: props.currentPage,
            numberOfPagesPath: props.numberOfPagesPath
        }
    }

    async componentDidMount() {
        await axios.get(this.state.numberOfPagesPath).then(res => {
            this.setState({
                numberOfPages: res.data
            })
        }).catch((err) => {
            console.log("Error: ", err);
        })
    }


    render() {

        return (

            <div className="d-flex justify-content-center mt-2">
                <ul className="pagination">
                    {
                        [...Array(this.state.numberOfPages).keys()].map(i => {
                            if (i + 1 == this.state.currentPage) {
                                return <li className="page-item active"><a className="page-link" href={"#"}>{i + 1}</a>
                                </li>
                            } else {
                                return <li className="page-item"><a className="page-link"
                                                                    href={this.state.path + (i + 1)}>
                                    {i + 1}</a>
                                </li>
                            }
                        })
                    }
                </ul>
            </div>
        )
    }

}

export default PageLine;