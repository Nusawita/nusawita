import React from "react";
import axios from "axios";

const AxiosContext = React.createContext({
  api: {},
});

export const AxiosContextProvider = (props) => {
  const api = axios.create({
    baseURL: "https://clumsy-pink-bedclothes.cyclic.app/api",
  });
  return (
    <AxiosContext.Provider value={{ api: api }}>
      {props.children}
    </AxiosContext.Provider>
  );
};

export default AxiosContext
