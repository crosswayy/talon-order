import React from "react";
import {BrowserRouter as Router} from "react-router-dom";

import useRoutes from "./routes";
import useAuth from "./hooks/auth.hook";
import {AuthContext} from "./context/auth.context";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const {token, userId, login, logout} = useAuth();
  const isAuth = !!token;
  const routes = useRoutes(isAuth);

  return (
    <AuthContext.Provider value={{
      token, userId, login, logout, isAuth
    }}>
      <Router>
        <Header />
        <div className="vh-50">
          {routes}
        </div>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
