import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrashAlt,
  faEdit,
  faEye
} from "@fortawesome/free-solid-svg-icons";
import "./viewUsers.css";

export default class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/farmer")
      .then(response => {
        this.setState({ todos: response.data });
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  deleteUser(uname) {
    if (!window.confirm("Are you sure you wish to delete this item?")) {
      return;
    }
    console.log("Clicked");
    axios
      .delete("http://localhost:3000/farmer/" + uname)
      .then(response => {
        if (response.data.status === 1) {
          alert("Farmer Deleted Successfully");
        } else {
          alert("Some Error Occured. Not Deleted");
          console.log(response);
        }
      })
      .catch(error => {
        console.log(error);
        alert("Some Error Occured");
      });
  }

  todoList() {
    return this.state.todos.map((todos, index) => {
      const { name, email, username, dob, address, picturePath } = todos; //destructuring
      return (
        <tr key={index}>
          <td>
            <img src={picturePath} width="100" height="100" />
          </td>
          <td>{name}</td>
          <td>{email}</td>
          <td>{username}</td>
          <td>{dob}</td>
          <td>{address}</td>
          <td>
            <button>
              <FontAwesomeIcon icon={faEdit} style={{ marginRight: "10px" }} />
            </button>
            <button>
              <FontAwesomeIcon icon={faEye} style={{ marginRight: "10px" }} />
            </button>
            <button
              onClick={() => {
                this.deleteUser(username);
              }}
            >
              <FontAwesomeIcon
                icon={faTrashAlt}
                style={{ marginRight: "10px" }}
              />
            </button>
          </td>
        </tr>
      );
    });

    // return this.state.todos.map(function(currentTodo, i) {
    //     return <Todo todo={currentTodo} key={i} />;
    // });
  }

  render() {
    return (
      <div className="mainDiv">
        <h1 id="title">View Farmers</h1>
        <hr />
        <table
          id="todos"
          className="table table-striped"
          style={{ marginTop: 20 }}
        >
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>DOB</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.todoList()}</tbody>
        </table>
      </div>
    );
  }
}
