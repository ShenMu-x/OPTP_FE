import axios from "axios";
import { getToken } from "../storage";

const axiosConfig = {
    baseURL: 'http://175.178.37.132:8081',
    timeout: 3000,
    headers: {},
}
const _axios = axios.create(axiosConfig);

export default _axios;