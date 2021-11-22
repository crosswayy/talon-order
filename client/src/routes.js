import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom';

import TalonOrder from "./components/TalonOrder";
import DoctorList from "./components/DoctorList";
import TalonDetail from "./components/TalonDetail";
import Authorization from './components/Auth/Authorization';
import Registration from "./components/Auth/Registration";
import Home from "./components/Home";

export default function useRoutes(isAuth) {
    if (isAuth) {
      console.log('Authed')
        return (
            <>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/talons" element={<TalonOrder />} />
                <Route path="/doctors" element={<DoctorList />} />
                <Route path="/detail/:id" element={<TalonDetail />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </>
        );
    } else {
      console.log('Not auth')
        return (
          <>
            <Routes>
              <Route path="/login" exact element={<Authorization/>}/>
              <Route path="/signup" exact element={<Registration/>}/>
              <Route path="*" element={<Navigate to="/login"/>}/>
            </Routes>
          </>
        );
    }
}
