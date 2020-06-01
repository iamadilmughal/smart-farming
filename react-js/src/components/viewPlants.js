import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./viewPlants.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/plant/")
      .then(response => {
        this.setState({ todos: response.data });
        console.log(response.data);
      })

      .catch(function(error) {
        console.log(error);
      });
  }

  todoList() {
    return this.state.todos.map((todos, index) => {
      const { plantName, season, plantImage, description } = todos; //destructuring
      return (
        <tr key={index}>
          <td width="15%">
            <img src={plantImage} width="150" />
          </td>
          <td width="15%">{plantName}</td>
          <td width="10%">{season}</td>
          <td width="30%">{description}</td>
          <td width="15%">
            <Link to={"/editr/" + todos._id}>
              <FontAwesomeIcon icon={faPencilAlt} />
            </Link>
          </td>
          <td width="15%">
            <Link to={"/deleter/" + todos._id}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </Link>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="details">
        <h1 id="title">Plants List</h1>

        <table
          id="todos"
          className="table table-striped"
          style={{ marginTop: 20 }}
        >
          <thead>
            <tr>
              <th>Image</th>
              <th>Plant Name</th>
              <th>Season</th>
              <th>Description</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.todoList()}</tbody>
        </table>
      </div>
    );
  }
}
