import React from "react";
import Layout from "./containers/Layout";
import AppContext from "./context/AppContext";
import useInitialState from "./hooks/useInitialState";
import "./styles/global.css";

function App() {
  const initialState = useInitialState();
  return (
    <>
      <AppContext.Provider value={initialState}>
        <Layout />
      </AppContext.Provider>
    </>
  );
}

export default App;
