import React, { Component } from "react";
import "./addDisease.css";
import Axios from "axios";

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  return valid;
};

class AddDisease extends Component {
  constructor(props) {
    super(props);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);

    this.state = {
      pestOption: [],

      name: null,
      description: null,
      symptoms: "",
      cures: [],
      selectedFile: "",
      causedBy: "",
      formErrors: {
        name: "",
        description: "",
        diseaseName: "",
        symptoms: "",
        cures: ""
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

      Axios.post("http://localhost:3000/disease", data)
        .then((res) => {
          if (res.data.status === 1) {
            alert("Disease Added Successfully");
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
        this.setState({ pestOption: response.data.result });
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getPestOptions() {
    return this.state.pestOption.map((pestOption, index) => {
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

      case "diseaseName":
        formErrors.diseaseName = value.length <= 0 ? "Cannot Be Empty" : "";
        break;

      case "symptoms":
        formErrors.symptoms = value.length <= 0 ? "Cannot Be Empty" : "";
        break;

      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  handlePestSelect = (e) => {
    e.preventDefault()
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      causedBy: value,
    });
    console.log(this.state)
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="disease-wrapper">
        <div className="form-wrapper-add-disease">
          <h1>Add Disease Details</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="diseaseName">
              <label htmlFor="diseaseName">Disease Name*</label>
              <input
                className={formErrors.diseaseName.length > 0 ? "error" : null}
                placeholder="Disease Name"
                type="text"
                name="diseaseName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.diseaseName.length > 0 && (
                <span className="errorMessage">{formErrors.diseaseName}</span>
              )}
            </div>

            <div className="description">
              <label htmlFor="description">Description*</label>
              <textarea
                className={formErrors.description.length > 0 ? "error" : null}
                placeholder="Description"
                name="description"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.description.length > 0 && (
                <span className="errorMessage">{formErrors.description}</span>
              )}
            </div>

            <div className="symptoms">
              <label htmlFor="symptoms">Symptoms*</label>
              <textarea
                placeholder="Symptoms"
                type="text"
                name="symptoms"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.symptoms.length > 0 && (
                <span className="errorMessage">{formErrors.symptoms}</span>
              )}
            </div>

            <div className="severityType">
              <label>Severity Type*</label>
              <input
                type="radio"
                value="high"
                name="severity"
                checked={this.state.severityType === "high"}
                onChange={this.radioChangeHandler}
              />
              High
              <input
                type="radio"
                value="medium"
                name="severity"
                checked={this.state.severityType === "medium"}
                onChange={this.radioChangeHandler}
              />
              Medium
              <input
                type="radio"
                value="low"
                name="severity"
                checked={this.state.severityType === "low"}
                onChange={this.radioChangeHandler}
              />
              Low
            </div>

            <div className="pestOptions">
              <label htmlFor="pestOptions">Caused By*</label>
              <select
                name="pestOptions"
                value2={this.state.value}
                onChange={this.handlePestSelect}
                multiple
              >
                {this.getPestOptions()}
              </select>
            </div>

            <div className="cures">
              <label htmlFor="cures">Cures*</label>
              <textarea
                className={formErrors.cures.length > 10 ? "error" : null}
                placeholder="Preventive Measures"
                name="pMeasure"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.cures.length > 0 && (
                <span className="errorMessage">{formErrors.cures}</span>
              )}
            </div>

            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group files">
                    <label>Upload Your File </label>
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
            <div className="submit">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddDisease;
