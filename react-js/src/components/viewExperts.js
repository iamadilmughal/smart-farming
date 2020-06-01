import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faTrash,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import "./viewExperts.css";
import Axios from "axios";

const Todo = props => (
  <tr>
    <td>{props.todo.expertID}</td>
    <td>{props.todo.name}</td>
    <td>{props.todo.dob}</td>
    <td>{props.todo.username}</td>
    <td>{props.todo.address}</td>
    <td>{props.todo.rating}</td>
    import "./viewr.css";
  </tr>
);

export default class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/expert")
      .then(response => {
        this.setState({ todos: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  deleteExpert(uname) {
    console.log("Clicked");
    Axios.delete("http://localhost:3000/expert/delete/"+uname)
      .then(response => {
        if (response.data.status === 1) {
          alert("Expert Deleted Successfully");
        } else {
          alert("Some Error Occured. Not Deleted");
        }
      })
      .catch(error => {
        console.log(error);
        alert("Some Error Occured");
      });
  }

  todoList() {
    return this.state.todos.map((todos, index) => {
      const { _id, name, dob, username, address, rating } = todos; //destructuring
      return (
        <tr key={_id}>
          <td>{}</td>
          <td>{name}</td>
          <td>{dob}</td>
          <td>{username}</td>
          <td>{address}</td>
          <td>{rating}</td>
          <td>
            <button>
              <Link to={"/edit/expert/" + username}>
                <FontAwesomeIcon
                  icon={faEdit}
                  style={{ marginRight: "10px" }}
                />
              </Link>
            </button>
            <button>
              <FontAwesomeIcon icon={faEye} style={{ marginRight: "10px" }} />
            </button>
            <button onClick={() => {
              this.deleteExpert(username)
            }}>
              <FontAwesomeIcon icon={faTrash} style={{ marginRight: "10px" }} />
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
      <div className="body">
        <h1 id="title">View Experts</h1>

        <Link to="/reg">
          <button className="addExpertButton">
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: "10px" }} />
            Add New Expert
          </button>
        </Link>

        <table
          id="todos"
          className="table table-striped"
          style={{ marginTop: 20 }}
        >
          <thead>
            <tr>
              <th>Expert ID</th>
              <th>Name</th>
              <th>DOB</th>
              <th>Username</th>
              <th>Address</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.todoList()}</tbody>
        </table>
      </div>
    );
  }
}
