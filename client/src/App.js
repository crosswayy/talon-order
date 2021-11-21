import React from "react";
import {BrowserRouter as Router} from "react-router-dom";

import useRoutes from "./routes";
import useAuth from "./hooks/auth.hook";
import {AuthContext} from "./context/auth.context";

function App() {
  const {token, userId, login, logout} = useAuth();
  const isAuth = !!token;
  const routes = useRoutes(isAuth);

  return (
    <AuthContext.Provider value={{
      token, userId, login, logout, isAuth
    }}>
      <Router>
        {routes}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
