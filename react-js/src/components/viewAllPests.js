import React, { Component } from "react";
import { DataTable, TableHeader, Textfield } from "react-mdl";
import "./viewAllPests.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

const Todo = props => (
  <tr>
    <td>
      <img src={props.todo.pestImage} width="100" />
    </td>
    <td>{props.todo.pestName}</td>
    <td>{props.todo.scientificName}</td>
    <td>{props.todo.severity}</td>
    {/* <td>
          <Link to={"/editfood/"+props.todo._id}>Edit</Link>
      </td> */}
  </tr>
);

class rtable extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/pest/")
      .then(response => {
        this.setState({ todos: response.data.result });
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  todoList() {
    return this.state.todos.map(function(currentTodo, i) {
      return <Todo todo={currentTodo} key={i} />;
    });
  }

  render() {
    return (
      <div className="pestListBody">
        <h1> Pest List</h1>
        <Link to="/addPest">
        <button className='addPestButton'>
        <FontAwesomeIcon icon={faPlus} style={{ marginRight: "10px" }} />
            Add New Pest
        </button>
        </Link>
        

        <table
          id="todos"
          className="table table-striped"
          style={{ marginTop: 20 }}
        >
          <thead>
            <tr>
              <th>image</th>
              <th>Name</th>
              <th>Scintific Name</th>
              <th>Severity</th>
            </tr>
          </thead>
          <tbody>{this.todoList()}</tbody>
        </table>
      </div>
    );
  }
}

export default rtable;
