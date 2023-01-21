import React, { Component } from "react";
import ComputerDataService from "../services/computer.service";
import { withRouter } from "../common/with-router";

class Computer extends Component {
  constructor(props) {
    super(props);
    this.onChangeModel = this.onChangeModel.bind(this);
    this.onChangeSerial_number = this.onChangeSerial_number.bind(this);
    this.onChangePurchase_date = this.onChangePurchase_date.bind(this);
    this.getComputer = this.getComputer.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateComputer = this.updateComputer.bind(this);
    this.deleteComputer = this.deleteComputer.bind(this);

    this.state = {
      currentComputer: {
        id: null,
        model: "",
        serial_number: "",
        purchase_date: "",
        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getComputer(this.props.router.params.id);
  }

  onChangeModel(e) {
    const model = e.target.value;

    this.setState(function (prevState) {
      return {
        currentComputer: {
          ...prevState.currentComputer,
          model: model,
        },
      };
    });
  }

  onChangeSerial_number(e) {
    const serial_number = e.target.value;

    this.setState((prevState) => ({
      currentComputer: {
        ...prevState.currentComputer,
        serial_number: serial_number,
      },
    }));
  }

  onChangePurchase_date(e) {
    const purchase_date = e.target.value;

    this.setState((prevState) => ({
      currentComputer: {
        ...prevState.currentComputer,
        purchase_date: purchase_date,
      },
    }));
  }

  getComputer(id) {
    ComputerDataService.get(id)
      .then((response) => {
        this.setState({
          currentComputer: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentComputer.id,
      model: this.state.currentComputer.model,
      serial_number: this.state.currentComputer.serial_number,
      purchase_date: this.state.currentComputer.purchase_date,
      published: status,
    };

    ComputerDataService.update(this.state.currentComputer.id, data)
      .then((response) => {
        this.setState((prevState) => ({
          currentComputer: {
            ...prevState.currentComputer,
            published: status,
          },
        }));
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateComputer() {
    ComputerDataService.update(
      this.state.currentComputer.id,
      this.state.currentComputer
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The computer was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteComputer() {
    ComputerDataService.delete(this.state.currentComputer.id)
      .then((response) => {
        console.log(response.data);
        this.props.router.navigate("/computers");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentComputer } = this.state;

    return (
      <div>
        {currentComputer ? (
          <div className="edit-form">
            <h4>Computer</h4>
            <form>
              <div className="form-group">
                <label htmlFor="model">Model</label>
                <input
                  type="text"
                  className="form-control"
                  id="model"
                  value={currentComputer.model}
                  onChange={this.onChangeModel}
                />
              </div>
              <div className="form-group">
                <label htmlFor="serial_number">Serial Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="serial_number"
                  value={currentComputer.serial_number}
                  onChange={this.onChangeSerial_number}
                />
              </div>

              <div className="form-group">
                <label htmlFor="purchase_date">Purchase Date</label>
                <input
                  type="text"
                  className="form-control"
                  id="purchase_date"
                  value={currentComputer.purchase_date}
                  onChange={this.onChangePurchase_date}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentComputer.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentComputer.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteComputer}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateComputer}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Computer...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Computer);
