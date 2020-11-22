import React, { Component } from "react";
import axios from "axios";
import BookListItem from "./bookListItem";

class BookList extends Component {
  state = {
    books: [],
  };

  async componentDidMount() {
    await axios.get("http://localhost:9000/library/books", {
      "headers":{
        "x-auth-token": localStorage.getItem("auth-token")
      }
    }).then((res) => {
      const books = res.data;
      this.setState({ books });
    });
  }

  render() {
    return (
      <React.Fragment>
        <h1>All Books</h1>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Author</th>
              <th scope="col">Price</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.books.map((book) => (
              <BookListItem key={book._id} bookItem={book} />
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default BookList;
