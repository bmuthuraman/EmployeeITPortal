import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:44383/api"
});

export default API;