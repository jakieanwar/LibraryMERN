import React, { Component } from "react";
import jwtDecode from "jwt-decode";

class NavBar extends Component {
  state = {
    active: "Home",
    user: {},
  };

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("auth-token");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (ex) {}
  }

  onLogOut() {
    localStorage.removeItem("auth-token");
    window.location = "/";
  }

  render() {
    let user = null;
    if (localStorage.getItem("auth-token")) {
      const jwt = localStorage.getItem("auth-token");
      user = jwtDecode(jwt);
    }

    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="/">
              <span>Logo</span>Library
            </a>
            <button className="navbar-toggler" type="button">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <a className="nav-link" href="/">
                    Home <span className="sr-only">(current)</span>
                  </a>
                </li>
                {user && user.role === "admin" && (
                  <React.Fragment>
                    <li className="nav-item">
                      <a className="nav-link" href="/addBook">
                        Add Book
                      </a>
                    </li>
                  </React.Fragment>
                )}
                {user && (
                  <React.Fragment>
                    <li className="nav-item">
                      <a className="nav-link" href="/books">
                        Books
                      </a>
                    </li>
                  </React.Fragment>
                )}
                {this.state.user.email == null && (
                  <React.Fragment>
                    <li className="nav-item" style={{ marginLeft: "75vh" }}>
                      <a className="nav-link" href="/login">
                        Login
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/register">
                        Register
                      </a>
                    </li>
                  </React.Fragment>
                )}
                {this.state.user.email != null && (
                  <React.Fragment>
                    <li
                      className="nav-item nav-link"
                      style={{ marginLeft: "55vh" }}
                    >
                      {this.state.user.email}
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/" onClick={this.onLogOut}>
                        Logout
                      </a>
                    </li>
                  </React.Fragment>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
