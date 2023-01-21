import React, { Component } from "react";
import ComputerDataService from "../services/computer.service";

export default class AddComputer extends Component {
  constructor(props) {
    super(props);
    this.onChangeComputer = this.onChangeComputer.bind(this);
    this.onChangeSerial_number = this.onChangeSerial_number.bind(this);
    this.onChangePurchase_date = this.onChangePurchase_date.bind(this);
    this.saveComputer = this.saveComputer.bind(this);
    this.newComputer = this.newComputer.bind(this);

    this.state = {
      id: null,
      model: "",
      serial_number: "",
      purchase_date: "",
      published: false,

      submitted: false,
    };
  }

  onChangeComputer(e) {
    this.setState({
      model: e.target.value,
    });
  }

  onChangeSerial_number(e) {
    this.setState({
      serial_number: e.target.value,
    });
  }

  onChangePurchase_date(e) {
    this.setState({
      purchase_date: e.target.value,
    });
  }

  saveComputer() {
    var data = {
      model: this.state.model,
      serial_number: this.state.serial_number,
      purchase_date: this.state.purchase_date,
    };

    ComputerDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          model: response.data.model,
          serial_number: response.data.serial_number,
          purchase_date: response.data.purchase_date,
          published: response.data.published,

          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newComputer() {
    this.setState({
      id: null,
      model: "",
      serial_number: "",
      purchase_date: "",
      published: false,

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newComputer}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Model</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeModel}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="serial_number">Serial Number</label>
              <input
                type="text"
                className="form-control"
                id="serial_number"
                required
                value={this.state.serial_number}
                onChange={this.onChangeSerial_number}
                name="serial_number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="purchase_date">Purchase Date</label>
              <input
                type="text"
                className="form-control"
                id="purchase_date"
                required
                value={this.state.purchase_date}
                onChange={this.onChangePurchase_date}
                name="purchase_date"
              />
            </div>

            <button onClick={this.saveComputer} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
