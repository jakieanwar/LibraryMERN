import React, { Component } from "react";
import axios from "axios";

class BookListItem extends Component {
  state = {
    book: this.props.bookItem,
  };

  onDeleteBook = async () => {
    await axios
      .delete(`http://localhost:9000/library/books/${this.state.book._id}`)
      .then(() => {
        console.log("Deleted");
      });
  };

  render() {
    return (
      <tr>
        <td>{this.state.book.name}</td>
        <td>{this.state.book.author}</td>
        <td>{this.state.book.price}</td>
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
      </tr>
    );
  }
}

export default BookListItem;
