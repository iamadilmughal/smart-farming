import React, { Component } from "react";
import { RadioGroup, Radio } from "react-mdl";
import "./addPest.css";
import Axios from "axios";
import { useAlert } from "react-alert";
import { Redirect } from "react-router-dom";


const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class productdetails extends Component {
  constructor(props) {
    super(props);

    this.radioChangeHandler = this.radioChangeHandler.bind(this);
    // this.onSubmit= this.onSubmit.bind(this);
    this.state = {
      pestName: null,
      pMeasure: null,
      description: null,
      severityType: "high",
      selectedFile: "",
      diagnostics: "",
      scientificName: "",

      formErrors: {
        pestName: "",
        pMeasure: "",
        description: "",
        diagnostics: "",
        preventions: "",
        scientificName: ""
      }
    };
  }

  onChangeHandler = event => {
    console.log(this.state);
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  };
  radioChangeHandler(event) {
    // event.preventDefault();
    this.setState({
      severityType: event.target.value
    });
    console.log(this.state);
  }

  handleSubmit = e => {
    e.preventDefault();
    // alert("Clicked");

    if (formValid(this.state)) {
      const data = new FormData();

      data.append("pestImage", this.state.selectedFile);
      data.append("name", this.state.pestName);
      data.append("prevention", this.state.pMeasure);
      data.append("description", this.state.description);
      data.append("severity", this.state.severityType);
      data.append("diagnostics", this.state.diagnostics);
      data.append("scientificName", this.state.scientificName);

      console.log(data);

      alert(data);
      Axios.post("http://localhost:3000/pest/", data)
        .then(res => {
          console.log(res.data);
          if (res.data.status == 1) {
            alert("Pest Added Successfully")
            // this.props.history.push('/path')
          }
        })
        .catch(error => {
          alert(error)
          console.log(error)
        });
    } else {
      console.log(this.state.formErrors);
      alert("Invalid or Null Fields")
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target; //destructuring both name and its value.
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "pestName":
        formErrors.pestName =
          value.length < 4 ? "Minimum 4 characters required." : "";
        break;
      case "pMeasure":
        formErrors.pMeasure =
          value.length < 2 ? "minimum 3 characaters required" : "";
        break;
      case "description":
        formErrors.description =
          value.length < 10 ? "minimum 10 characaters required" : "";
        break;

      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper-pest">
          <h1>Add Pest Details</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="pestName">
              <label htmlFor="pestName">Pest Name*</label>
              <input
                className={formErrors.pestName.length > 0 ? "error" : null}
                placeholder="Pest Name"
                type="text"
                name="pestName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.pestName.length > 0 && (
                <span className="errorMessage">{formErrors.pestName}</span>
              )}
            </div>

            <div className="scientificName">
              <label htmlFor="scientificName">Scientific Name*</label>
              <input
                className={formErrors.pestName.length > 0 ? "error" : null}
                placeholder="Scientific Name"
                type="text"
                name="scientificName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.scientificName.length > 0 && (
                <span className="errorMessage">
                  {formErrors.scientificName}
                </span>
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

            <div className="diagnostics">
              <label htmlFor="diagnostics">Diagnostics*</label>
              <textarea
                className={formErrors.diagnostics.length > 0 ? "error" : null}
                placeholder="diagnostics"
                name="diagnostics"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.diagnostics.length > 0 && (
                <span className="errorMessage">{formErrors.diagnostics}</span>
              )}
            </div>

            <div className="pMeasure">
              <label htmlFor="pMeasure">Preventive Measures*</label>
              <textarea
                className={formErrors.pMeasure.length > 0 ? "error" : null}
                placeholder="Preventive Measures"
                name="pMeasure"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.pMeasure.length > 0 && (
                <span className="errorMessage">{formErrors.pMeasure}</span>
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

export default productdetails;
