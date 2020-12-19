import React, { Component } from "react";
import axios from "../axios";

class BookForm extends Component {
  state = {
    book: {
      name: "",
      author: "",
      price: "",
    },
  };

  onBookSubmit = async (e) => {
    e.preventDefault();
    if (this.props.pageMode === "Edit") {
      console.log(axios);
      await axios
        .patch(
          "/library/books/" + this.props.match.params.id,
          this.state.book,
          {
            headers: {
              "x-auth-token": localStorage.getItem("auth-token"),
            },
          }
        )
        .then((res) => {
          console.log("Book Updated");
        });
    } else {
      await axios
        .post(`/library/books`, this.state.book, {
          headers: {
            "x-auth-token": localStorage.getItem("auth-token"),
          },
        })
        .then((res) => {
          alert("Book saved!!");
          console.log(res.status);
        });
    }
    this.props.history.push("/books");
  };

  handleChange = (e) => {
    const book = { ...this.state.book };
    book[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ book });
  };

  async componentDidMount() {
    await axios
      .get(`/library/books/` + this.props.match.params.id, {
        headers: {
          "x-auth-token": localStorage.getItem("auth-token"),
        },
      })
      .then((res) => {
        const book = {
          name: res.data.name,
          author: res.data.author,
          price: res.data.price,
        };
        this.setState({ book });
      });
  }

  render() {
    return (
      <div className="card bg-light mb-3 mt-3">
        <div className="card-header">{this.props.pageMode} Book</div>
        <div className="card-body">
          <form onSubmit={this.onBookSubmit}>
            <div className="form-group">
              <label htmlFor="bookName">Name</label>
              <input
                value={this.state.book.name}
                type="text"
                className="form-control"
                id="bookName"
                name="name"
                onChange={this.handleChange}
                placeholder="Book Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="bookAuthor">Author</label>
              <input
                value={this.state.book.author}
                type="text"
                className="form-control"
                id="bookAuthor"
                name="author"
                onChange={this.handleChange}
                placeholder="Author Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="bookPrice">Price</label>
              <input
                value={this.state.book.price}
                type="number"
                className="form-control"
                id="bookPrice"
                name="price"
                onChange={this.handleChange}
                placeholder="Price"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default BookForm;
