import React, {useCallback, useContext, useEffect, useState} from 'react';

import {Button, Col, Row} from "reactstrap";
import TalonListItem from "../TalonListItem";
import {NavLink} from "react-router-dom";

import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/auth.context";

import oops from '../../images/oops.png';
import './TalonList.scss';
import {Loader} from "rsuite";

export default function TalonList() {
    const {error, loading, request, clearError} = useHttp();
    const auth = useContext(AuthContext);

    const [talons, setTalons] = useState(null);

    const getUserTalons = useCallback(async () => {
        try {
            const data = await request('/api/talons/', 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            });

            console.log(data);
            setTalons(data);
        } catch (e) {

        }
    }, [auth.token, request]);

    const cancelHandler = useCallback(async (talonId) => {
        try {
            const fetched = await request(`/api/talons/${talonId}`, 'DELETE', null, {
                Authorization: `Bearer ${auth.token}`
            });

            if (fetched.status === 200) {
                getUserTalons();
            }
        } catch (e) {}
    }, [request, auth.token, getUserTalons]);

    useEffect(() => {
        getUserTalons();
    }, [getUserTalons]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <Loader size='lg' speed="fast"/>
            </div>
        );
    }


    return (
        <>
            {!loading && talons && talons.length > 0 ?
                <>
                    <h1 className="mt-2">Your talons</h1>
                    <div className="container my-2">
                        <Row xs={1} md={4} className="g-4">
                            {talons.map((data, idx) => {
                                return (
                                    <Col key={idx}>
                                        <TalonListItem data={data} onCancelClick={cancelHandler}/>
                                    </Col>
                                );
                            })}
                        </Row>
                    </div>
                </>

                : <IfEmpty />
            }
        </>
    );
}

const IfEmpty = () => {

    return (
        <div className="container w-100 mt-5">
            <div className="IfEmpty-Flex d-flex">
                <img src={oops} alt="There is nothing yet..." className="IfEmpty-Img shadow-lg"/>
                <div className="IfEmpty-Info">
                    <h2 className="mb-4">You have not ordered any talons yet</h2>
                    <p className="fs-5 mb-5">
                        There is nothing to display, because you have not ordered talons.
                        Ordered talons will be displayed here with fully information about.
                        You should order a talon to display here. Press the button 'Order talon'
                        to move required page.
                    </p>
                    <p className="fs-5 mb-5">
                        You also can order a talon by pressing the button below...
                    </p>
                    <div className="IfEmpty-Btn text-center">
                        <NavLink to="/order">
                            <Button className="btn-outline-primary btn-lg">
                                Order a talon
                                <i className="ms-2 bi-bookmark-fill me-1"></i>
                            </Button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
