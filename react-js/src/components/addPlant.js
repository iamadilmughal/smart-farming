import React, { Component } from "react";
import "./addPlant.css";
import Axios from "axios";

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  return valid;
};

class restaurantdetails extends Component {
  constructor(props) {
    super(props);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);

    this.state = {
      name: null,
      value: "winter",
      value1: [],
      value2: [],
      description: null,
      selectedFile: "",
      pestOptions: [],
      formErrors: {
        name: "",
        description: "",
      },
    };
  }
  componentDidMount() {
    this.loadPestOptions();
  }

  handleChange1(event) {
    // event.preventDefault();
    console.log(event);
    this.setState({ value: event.target.value });
  }
  handleChange2(event) {
    event.preventDefault();
    console.log(event);
    this.setState({ value1: event.target.value1 });
  }
  handleChange3(e) {
    const { value2 } = e.target;
    console.log(e);
    this.setState({ value2: value2 }, () => console.log(this.state));
  }

  onChangeHandler = (event) => {
    console.log(event);
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // alert("clicked");
    let ab = {
      a: this.state.name,
      b: this.state.value2,
    };
    console.log(ab);

    console.log(formValid(this.state));

    if (formValid(this.state)) {
      let data = new FormData();

      console.log("Here");

      data.append("name", this.state.name);
      data.append("season", this.state.value);
      data.append("diseases", this.state.value1);
      data.append("pests", this.state.value2);
      data.append("description", this.state.description);
      data.append("plantImage", this.state.selectedFile);

      console.log(data);
      // alert(data);

      Axios.post("http://localhost:3000/plant", data)
        .then((res) => {
          if (res.data.status === 1) {
            alert("Plant Added Successfully");
          } else {
            console.log("Error Occured" + res.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log(this.state.formErrors);
    }
  };

  loadPestOptions() {
    Axios.get("http://localhost:3000/pest/")
      .then((response) => {
        this.setState({ pestOptions: response.data.result });
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getPestOptions() {
    return this.state.pestOptions.map((pestOption, index) => {
      const { pestName, _id } = pestOption; //destructuring
      return <option value2={_id}>{pestName}</option>;
    });
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "name":
        formErrors.name =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;

      case "description":
        formErrors.description =
          value.length < 10 ? "minimum 10 characaters required" : "";
        break;

      default:
        break;
    }
    if (name == "1") {
      this.setState({
        value: value,
      });
    } else if (name == "2") {
      this.setState({
        value1: value,
      });
    } else if (name == "3") {
      this.setState({
        value2: value,
      });
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper-add-plant">
          <h1>Add Plant Details</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="plantName">
              <label htmlFor="name">Plant Name*</label>
              <input
                className={formErrors.name.length > 0 ? "error" : null}
                placeholder="Plant Name"
                type="text"
                name="name"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.name.length > 0 && (
                <span className="errorMessage">{formErrors.name}</span>
              )}
            </div>

            <div className="season">
              <label htmlFor="season">Select Season*</label>
              <select
                name="1"
                value={this.state.value}
                onChange={this.handleChange}
              >
                <option selected value="winter">
                  Winter
                </option>
                <option value="summer">Summer</option>
                <option value="autumn">Autumn</option>
                <option value="spring">Spring</option>
              </select>
            </div>

            <div className="description">
              <label htmlFor="description">Description*</label>
              <textarea
                className={formErrors.description.length > 0 ? "error" : null}
                placeholder="Description"
                type="text"
                name="description"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.description.length > 0 && (
                <span className="errorMessage">{formErrors.description}</span>
              )}
            </div>
            <div className="pestDiseaseSelect">
              <div className="disease">
                <label htmlFor="disease">Select Disease*</label>
                <select
                  name="2"
                  value1={this.state.value}
                  onChange={this.handleChange2}
                  multiple
                >
                  <option value1="blackRot">Black Rot</option>
                  <option value1="cedarRust">Cedar Rust</option>
                  <option value1="earlyBlight">Early Blight</option>
                  <option value1="lateBlight">Late Blight</option>
                </select>
              </div>
              <div className="pest">
                <label htmlFor="pest">Select Pest*</label>
                <select
                  name="3"
                  value2={this.state.value}
                  onChange={this.handleChange}
                  multiple
                >
                  {this.getPestOptions()}
                </select>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group files">
                    <label>Upload a Plant Picture</label>
                    <input
                      type="file"
                      name="file"
                      multiple
                      onChange={this.onChangeHandler}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="login">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default restaurantdetails;
