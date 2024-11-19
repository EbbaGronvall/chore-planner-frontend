import axios from "axios";

axios.defaults.baseURL = "https://chore-planner-api-6d4feabd1d60.herokuapp.com";
axios.defaults.headers.post["Content-Type"] = "mulitpart/form-data";
axios.defaults.withCredentials = true;
