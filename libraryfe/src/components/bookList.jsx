import React, { Component } from "react";
import axios from "../axios";
import jwtDecode from "jwt-decode";
import BookListItem from "./bookListItem";

class BookList extends Component {
  state = {
    books: [],
  };

  async componentDidMount() {
    await axios
      .get(`/library/books`, {
        headers: {
          "x-auth-token": localStorage.getItem("auth-token"),
        },
      })
      .then((res) => {
        const books = res.data;
        this.setState({ books });
      });
  }

  render() {
    let user = null;
    if (localStorage.getItem("auth-token")) {
      const jwt = localStorage.getItem("auth-token");
      user = jwtDecode(jwt);
    }

    return (
      <React.Fragment>
        <h1>All Books</h1>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Author</th>
              <th scope="col">Price</th>
              {user.role === "admin" && (
                <React.Fragment>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </React.Fragment>
              )}
              {user.role === "user" && (
                <React.Fragment>
                  <th scope="col"></th>
                </React.Fragment>
              )}
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
