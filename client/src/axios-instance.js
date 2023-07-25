import axios from "axios";

const cyclicServer = 'https://clumsy-pink-bedclothes.cyclic.app/api/'
const localServer = 'http://localhost:5000/api/'
const instance = axios.create({
    baseURL: cyclicServer,
  });
  export default instance;