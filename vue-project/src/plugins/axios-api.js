import axios from "axios";

const baseAPI = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 600000,
});

export { baseAPI };
