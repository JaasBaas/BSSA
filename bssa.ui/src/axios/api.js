import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "access-control-allow-origin": "*"
  }
});

export default instance;