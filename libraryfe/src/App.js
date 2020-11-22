import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import BookForm from "./components/bookForm";
import BookList from "./components/bookList";
import UserForm from "./components/userForm"

class App extends Component {
  state = {
    id: "",
  };

  render() {
    return (
      <Router>
        <NavBar />
        <div className="container">
          <Route exact path="/" render={(props) => <p>Hello World!!</p>} />
          <Route
            exact
            path="/addBook"
            render={(props) => <BookForm {...props} pageMode="Add" />}
          />
          <Route exact path="/books" render={(props) => <BookList />} />
          <Route
            path="/books/edit/:id"
            render={(props) => <BookForm {...props} pageMode="Edit" />}
          />
          <Route exact path="/login" render={(props) => <UserForm {...props} mode="Login" />}/>
          <Route exact path="/register" render={(props) => <UserForm {...props} mode="Register" />}/>
        </div>
      </Router>
    );
  }
}

export default App;
