import React, { Component } from "react";
import axios from "../axios";
import _ from "lodash";

class UserForm extends Component {
  state = {
    user: {
      email: "",
      password: "",
      role: "",
    },
  };

  onUserSubmit = async (e) => {
    e.preventDefault();
    if (this.props.mode === "Login") {
      await axios
        .post(
          `/library/users/auth`,
          _.pick(this.state.user, ["email", "password"])
        )
        .then((res) => {
          console.log("Logged in");
          localStorage.setItem("auth-token", res.headers["x-auth-token"]);
        });
      window.location = "/";
    } else {
      if (this.state.user.role !== "admin") {
        const user = { ...this.state.user };
        this.state.user.role = "user";
        this.setState({ user });
      }
      await axios.post(`/library/users`, this.state.user).then((res) => {
        alert("User registered");
      });
      this.props.history.push("/login");
    }
    // this.props.history.push("/books");
  };

  handleChange = (e) => {
    const user = { ...this.state.user };
    user[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ user });
  };

  render() {
    return (
      <div className="card bg-light mb-3 mt-3">
        <div className="card-header">{this.props.mode}</div>
        <div className="card-body">
          <form onSubmit={this.onUserSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={this.state.user.email}
                type="text"
                className="form-control"
                id="email"
                name="email"
                onChange={this.handleChange}
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={this.state.user.password}
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={this.handleChange}
                placeholder="Password"
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

export default UserForm;
