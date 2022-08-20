import React from "react";
import Layout from "./containers/Layout";
import AccountsContext from "./context/AccountsContext";
import AppContext from "./context/AppContext";
import useGetUsers from "./hooks/useGetUsers";
import useInitialState from "./hooks/useInitialState";
import "./styles/global.css";

function App() {
  const initialState = useInitialState();
  const initialAccounts = useGetUsers();
  return (
    <>
      <AppContext.Provider value={initialState}>
        <AccountsContext.Provider value={initialAccounts}>
          <Layout />
        </AccountsContext.Provider>
      </AppContext.Provider>
    </>
  );
}

export default App;
