import React, { Component } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

class BookListItem extends Component {
  state = {
    book: this.props.bookItem,
  };

  onDeleteBook = async () => {
    await axios
      .delete(`http://localhost:9000/library/books/${this.state.book._id}`, {
        "headers":{
          "x-auth-token": localStorage.getItem("auth-token")
        }
      })
      .then(() => {
        console.log("Deleted");
      });
  };

  render() {
    let user = null;
    if(localStorage.getItem("auth-token")){
      const jwt = localStorage.getItem("auth-token");
      user = jwtDecode(jwt);
    }

    return (
      <tr>
        <td>{this.state.book.name}</td>
        <td>{this.state.book.author}</td>
        <td>{this.state.book.price}</td>
        {(user.role === "admin") && (<React.Fragment><td>
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
        </td></React.Fragment>)}
      </tr>
    );
  }
}

export default BookListItem;
