import http from "../http-common";

class ComputerDataService {
  getAll() {
    return http.get("/computers");
  }

  get(id) {
    return http.get(`/computers/${id}`);
  }

  create(data) {
    return http.post("/computers", data);
  }

  update(id, data) {
    return http.put(`/computers/${id}`, data);
  }

  delete(id) {
    return http.delete(`/computers/${id}`);
  }

  deleteAll() {
    return http.delete(`/computers`);
  }

  findByTitle(model) {
    return http.get(`/computers?model=${model}`);
  }
}

export default new ComputerDataService();
