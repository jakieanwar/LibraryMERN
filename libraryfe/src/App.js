import React, { Component } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import NavBar from "./components/navbar";
import BookForm from "./components/bookForm";
import BookList from "./components/bookList";
import UserForm from "./components/userForm";
import history from "./helpers/history";

class App extends Component {
  state = {
    id: "",
  };
  env = require("dotenv").config();

  render() {
    let user = null;
    if (localStorage.getItem("auth-token")) {
      const jwt = localStorage.getItem("auth-token");
      user = jwtDecode(jwt);
    }

    return (
      <Router history={history}>
        <NavBar />
        <div className="container">
          <Route exact path="/" render={(props) => <p>Hello World!!</p>} />
          <Route
            exact
            path="/addBook"
            render={(props) => {
              if (!user) return <Redirect to="/login" />;
              return <BookForm {...props} pageMode="Add" />;
            }}
          />
          <Route
            exact
            path="/books"
            render={(props) => {
              if (!user) return <Redirect to="/login" />;
              return <BookList />;
            }}
          />
          <Route
            path="/books/edit/:id"
            render={(props) => {
              if (!user) return <Redirect to="/login" />;
              return <BookForm {...props} pageMode="Edit" />;
            }}
          />
          <Route
            exact
            path="/login"
            render={(props) => <UserForm {...props} mode="Login" />}
          />
          <Route
            exact
            path="/register"
            render={(props) => <UserForm {...props} mode="Register" />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
