import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom';

import TalonOrder from "./components/TalonOrder";
import DoctorList from "./components/DoctorList";
import TalonDetail from "./components/TalonDetail";
import Authorization from './components/Auth/Authorization';
import Registration from "./components/Auth/Registration";

export default function useRoutes(isAuth) {
    if (isAuth) {
        return (
            <Routes>
                <Route path="/talons" exact element={<TalonOrder />} />
                <Route path="/doctors" exact element={<DoctorList />} />
                <Route path="/detail/:id" element={<TalonDetail />} />
                <Route path="*" element={<Navigate to="/talons" />} />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route path="/login" exact element={<Authorization />} />
            <Route path="/signup" exact element={<Registration />} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}
