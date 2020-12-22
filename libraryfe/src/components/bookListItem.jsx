import React, { Component } from "react";
import axios from "../axios";
import jwtDecode from "jwt-decode";
import history from "../helpers/history";

class BookListItem extends Component {
  state = {
    book: this.props.bookItem,
    issueClicked: 0,
  };
  env = require("dotenv").config();

  onDeleteBook = async () => {
    alert("Blah blah delete");
    try {
      await axios
        .delete(`/library/books/${this.state.book._id}`, {
          headers: {
            "x-auth-token": localStorage.getItem("auth-token"),
          },
        })
        .then(() => {
          alert("Deleted");
        });
    } catch (ex) {
      alert("delete blah");
    }
    alert("What the hell is being deleted?");
  };

  onIssueBook = async (e) => {
    await axios
      .post(`/library/books/issue/${this.state.book._id}`)
      .then(function (response) {
        console.log(response);
        alert("Book issue api called again");
        history.push("/books");
      });
  };

  render() {
    let user = null;
    if (localStorage.getItem("auth-token")) {
      const jwt = localStorage.getItem("auth-token");
      user = jwtDecode(jwt);
    }

    return (
      <tr>
        <td>{this.state.book.name}</td>
        <td>{this.state.book.author}</td>
        <td>{this.state.book.price}</td>
        {user.role === "admin" && (
          <React.Fragment>
            <td>
              <a
                className="btn btn-primary"
                href={"/books/edit/" + this.state.book._id}
                role="button"
              >
                Edit
              </a>
            </td>
            <td>
              <a
                className="btn btn-danger"
                href="/books"
                role="button"
                onClick={this.onDeleteBook}
              >
                Delete
              </a>
            </td>
          </React.Fragment>
        )}
        {user.role === "user" && (
          <React.Fragment>
            <td>
              <button className="btn btn-danger" onClick={this.onIssueBook}>
                Issue
              </button>
            </td>
          </React.Fragment>
        )}
      </tr>
    );
  }
}

export default BookListItem;
