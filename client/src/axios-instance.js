import axios from "axios";

const instance = axios.create({
    baseURL: 'https://clumsy-pink-bedclothes.cyclic.app/api/',
  });
  export default instance;