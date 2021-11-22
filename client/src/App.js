import React from "react";
import {BrowserRouter as Router} from "react-router-dom";

import useRoutes from "./routes";
import useAuth from "./hooks/auth.hook";
import {AuthContext} from "./context/auth.context";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const {token, userId, login, logout} = useAuth();
  const isAuth = !!token;
  console.log('TOKEN', token);
  const routes = useRoutes(isAuth);

  return (
    <AuthContext.Provider value={{
      token, userId, login, logout, isAuth
    }}>
      <Router>
        <Header />
        {routes}
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
