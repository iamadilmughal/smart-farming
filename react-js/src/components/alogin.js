import React, { Component } from "react";
import "./alogin.css";
import Axios from "axios";
import Auth from "./auth";
import { Redirect } from "react-router-dom";

const formValid = ({ formErrors, ...rest }) => {
  //form valid function.
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

class alogin extends Component {
  constructor(props) {
    //passing properties to the constructor.
    super(props); //extending the component so have to call "super".

    this.handleChange1 = this.handleChange1.bind(this);

    this.state = {
      //contains all the form fields. can either be null or just simply empty strings.

      email: "",
      password: "",
      value: "admin",
      formErrors: {
        //holds the errors that are likely to pop up.

        email: "",
        password: "",
      },
    };
  }

  handleChange1(event) {
    event.preventDefault();
    this.setState({ value: event.target.value });
  }
  handleSubmit = (e) => {
    const { password } = this.state;
    // perform all neccassary validations
    e.preventDefault();

    if (formValid(this.state)) {
      //if the form is valid then we pass the values.
      const alogin = {
        username: this.state.email,
        password: this.state.password,
        category: this.state.value,
      };
      console.log(alogin);

      var role = this.state.value;
      if (role === "expert") {
        Axios.post("http://localhost:3000/expert/login", alogin)
          .then((res) => {
            console.log(res.data);
            if (res.data.status === 1) {
              alert("Login Successful");
              this.props.history.push("/");
            } else {
              alert(res.data.message);
            }
          })
          .catch((error) => {
            alert("Some Error Occured. Please Try Again");
            console.log(error);
          });
      } else {
        if (Auth.login(this.state.email, this.state.password)) {
          this.history.push("/addPlant")
        }
      }
    } else {
      //if the form is invalid then we display the corresponding error message.
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target; //destructuring both name and its value.
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "password":
        formErrors.password =
          value.length < 6 ? "Password has to be more than 6 characters!" : "";
        break;

      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper1">
        <div className="form-wrapper">
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="email">
              <label htmlFor="email">Username*</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password*</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            {/* <div className="confirmPassword">
              <label htmlFor="confirmPassword"> Confirm Password*</label>
              <input
                className="pp"
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                noValidate
                onChange={this.handleChange}
              />
            </div> */}

            <div className="role">
              <label htmlFor="role">Select Role*</label>
              <select value={this.state.value} onChange={this.handleChange1}>
                <option value="admin">Admin</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            {/* <div className="dont">
              <a href="/reg"> Don't have an account?</a>
            </div> */}
            <div className="login">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default alogin;
