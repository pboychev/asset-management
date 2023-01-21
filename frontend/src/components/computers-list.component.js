import React, { Component } from "react";
import ComputerDataService from "../services/computer.service";
import { Link } from "react-router-dom";

export default class ComputersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchModel = this.onChangeSearchModel.bind(this);
    this.retrieveComputers = this.retrieveComputers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveComputer = this.setActiveComputer.bind(this);
    this.removeAllComputers = this.removeAllComputers.bind(this);
    this.searchModel = this.searchModel.bind(this);

    this.state = {
      computers: [],
      currentComputer: null,
      currentIndex: -1,
      searchModel: "",
    };
  }

  componentDidMount() {
    this.retrieveComputers();
  }

  onChangeSearchModel(e) {
    const searchModel = e.target.value;

    this.setState({
      searchModel: searchModel,
    });
  }

  retrieveComputers() {
    ComputerDataService.getAll()
      .then((response) => {
        this.setState({
          computers: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveComputers();
    this.setState({
      currentComputer: null,
      currentIndex: -1,
    });
  }

  setActiveComputer(computer, index) {
    this.setState({
      currentComputer: computer,
      currentIndex: index,
    });
  }

  removeAllComputers() {
    ComputerDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchModel() {
    ComputerDataService.findByModel(this.state.searchModel)
      .then((response) => {
        this.setState({
          computers: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { searchModel, computers, currentComputer, currentIndex } =
      this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by model"
              value={searchModel}
              onChange={this.onChangeSearchModel}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchModel}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Computers List</h4>

          <ul className="list-group">
            {computers &&
              computers.map((computer, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveComputer(computer, index)}
                  key={index}
                >
                  {computer.model}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllComputers}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentComputer ? (
            <div>
              <h4>Computer</h4>
              <div>
                <label>
                  <strong>Model:</strong>
                </label>{" "}
                {currentComputer.model}
              </div>
              <div>
                <label>
                  <strong>Serial Number:</strong>
                </label>{" "}
                {currentComputer.serial_number}
              </div>
              <div>
                <label>
                  <strong>Purchase date:</strong>
                </label>{" "}
                {currentComputer.purchase_date}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentComputer.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/computers/" + currentComputer.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Computer...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
