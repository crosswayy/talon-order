import React, {useState} from "react";

import {Button, Col, Row} from "reactstrap";
import DoctorListItem from "../DoctorListItem";

import './DoctorList.scss';
import oops from "../../images/oops.png";
import {NavLink} from "react-router-dom";
import {Sidebar} from "rsuite";

export default function DoctorList() {
    const [activeElement, setActiveElement] = useState(null);
    const length = 12;

    const linkHandler = (e) => {
        e.preventDefault();

        document.querySelectorAll('.DoctorList-List_link').forEach(el => {
            el.classList.remove('active-link');
        });

        setActiveElement(e.currentTarget.textContent);
        e.currentTarget.classList.add('active-link');
        window.scrollTo(0, 0);
    }

    return (
        <>
            {length > 0 ?
                    <div className="d-flex">
                        <div className="DoctorList-Sidebar">
                            <Sidebar
                                className="DoctorList-Sidebar_items"
                            >
                                <div className="">
                                    <h2 className="mt-2  text-center">Our doctors</h2>
                                    <div className="DoctorList-List mt-4">
                                        <ul>
                                            <li className="fw-bold fs-4 mt-3 DoctorList-List_link" onClick={linkHandler}>
                                                <a href="#!">
                                                    Cardiologists
                                                </a>
                                            </li>
                                            <li className="fw-bold fs-4 mt-3 DoctorList-List_link" onClick={linkHandler}>
                                                <a href="#!">
                                                    Surgery
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </Sidebar>
                        </div>
                        <div className="DoctorList-Items container">
                            {!activeElement ?
                                <CardElement title={"Our Doctors"} />
                                : <CardElement title={activeElement} />
                            }
                        </div>
                    </div>

                : <IfEmpty />
            }
        </>
    );
}

const CardElement = (props) => {
    const {
        title,
        length = 12
    } = props;

    return (
        <>
            <h1>{title}</h1>
            <div className="mt-3">
                <Row xs={1} md={3} className="g-4 px-4">
                    {Array.from({length}).map((_, idx) => (
                        <Col key={idx}>
                            <DoctorListItem/>
                        </Col>
                    ))
                    }
                </Row>
            </div>
        </>
    );
}

const IfEmpty = () => {

    return (
        <div className="container w-100 mt-5">
            <div className="IfEmpty-Flex d-flex">
                <img src={oops} alt="There is nothing yet..." className="IfEmpty-Img shadow-lg"/>
                <div className="IfEmpty-Info">
                    <h2 className="mb-4">At this moment we can't display our doctors</h2>
                    <p className="fs-5 mb-3">
                        By technical issues we can't display our doctors.
                        Doctor's will be displayed as soon as possible. Press the button 'Order talon'
                        to move Talon Order page.
                    </p>
                    <p className="fs-5 mb-3">
                        If you want to order a talon, press the button 'Order talon'
                        to move Talon Order page.
                    </p>
                    <p className="fs-5 mb-5">
                        We sorry. Please try again later...
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
