import React, {useCallback, useContext, useEffect, useState} from 'react';

import {ReactComponent as Logo} from "../../images/logo.svg";
import {ReactComponent as User} from "../../images/user.svg";
import {Loader} from "rsuite";

import {NavLink} from "react-router-dom";
import {Button} from "reactstrap";
import {AuthContext} from "../../context/auth.context";
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import './Header.scss';

export default function Header (props) {
  const auth = useContext(AuthContext);

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
          <div className="container-fluid fw-bold">
              <a href="#!" className="navbar-brand d-flex flex-row align-items-center">
                  <Logo className='Header-Icon'/>
                  Talon order service
              </a>
              {auth.isAuth && <AuthHeader />}
          </div>
      </nav>
    );
}

const AuthHeader = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const {request} = useHttp();
  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = useCallback(async () => {
      try {
          const data = await request('/api/header/', 'GET', null, {
              Authorization: `Bearer ${auth.token}`
          });
          setUserInfo({firstName: data.firstName, lastName: data.lastName, talons: data.talons });
      } catch (e) {
          message(e.message, 'error');
          auth.logout();
      }
  }, [request, message, auth]);

  useEffect(()  => {
      getUserInfo();
  }, [getUserInfo])


  const logoutHandler = () => {
      auth.logout()
    };

    return (
      <>
      {userInfo ?
        <>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
                    aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse fs-5" id="navbarContent">
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item active">
                  <NavLink to='/detail' className="nav-link">Home</NavLink>
                </li>
                <li className="nav-item active">
                  <NavLink to='/order' className="nav-link">Order talon</NavLink>
                </li>
                <li className="nav-item active">
                  <NavLink to='/doctors' className="nav-link">Doctors</NavLink>
                </li>
              </ul>
            </div>
            <div className="d-flex">
              <NavLink to='/talons' className="nav-link Header-Profile">
                  <User className="Header-Profile_user"/>
                  {`${userInfo.firstName} ${userInfo.lastName}: ${userInfo.talons.length}`}
              </NavLink>
              <Button
                className="btn-primary"
                onClick={logoutHandler}
              >Log out</Button>
            </div>
        </>
      : <Loader speed="fast" />}
      </>
    );
}
