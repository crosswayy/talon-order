import React from 'react';

import {Button, Col, Row} from "reactstrap";
import TalonListItem from "../TalonListItem";
import {NavLink} from "react-router-dom";

import oops from '../../images/oops.png';
import './TalonList.scss';

export default function TalonList() {

    const length = 12;

    return (
        <>
            {length > 0 ?
                <>
                    <h1 className="mt-5">Your talons</h1>
                    <div className="container my-5">
                        <Row xs={1} md={4} className="g-4">
                            {Array.from({length}).map((_, idx) => (
                                <Col key={idx}>
                                    <TalonListItem/>
                                </Col>
                            ))
                            }
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
