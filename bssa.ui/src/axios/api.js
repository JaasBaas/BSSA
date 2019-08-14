import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:5001",
  headers: {
    "access-control-allow-origin": "*"
  }
});

export default instance;
