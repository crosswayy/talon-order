import React, {useCallback, useContext, useEffect, useState} from "react";

import {Button, Col, Row} from "reactstrap";
import DoctorListItem from "../DoctorListItem";

import './DoctorList.scss';
import oops from "../../images/oops.png";
import {NavLink} from "react-router-dom";
import {Loader, Sidebar} from "rsuite";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/auth.context";

export default function DoctorList() {
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);

    const [doctors, setDoctors] = useState(null);
    const [specs, setSpecs] = useState(null);
    const [activeElement, setActiveElement] = useState(null);

    const linkHandler = (e) => {
        e.preventDefault();

        document.querySelectorAll('.DoctorList-List_link').forEach(el => {
            el.classList.remove('active-link');
        });

        setActiveElement(e.currentTarget.textContent === 'All doctors' ? null : e.currentTarget.textContent);
        e.currentTarget.classList.add('active-link');
        window.scrollTo(0, 0);
    }

    const getDoctors = useCallback(async () => {
        const result = await request('/api/doctors/', 'GET', null, {
            Authorization: `Bearer ${token}`
        });

        setSpecs([...new Set(result.map(el => el.speciality))]);
        setDoctors(result);
    }, [token, request]);

    useEffect(() => {
        getDoctors()
    }, [getDoctors]);

    // useEffect(() => {
    //     if (!loading) {
    //         document.querySelectorAll('.DoctorList-List_link').forEach(el => {
    //             console.log(el.id);
    //             if (el.id === 'all') {
    //                 console.log(el);
    //                 el.classList.add('active-link');
    //             }
    //         });
    //     }
    // }, [loading]);

    if (loading) {
        return <Loader size="lg" speed="fast"/>
    }

    return (
        <>
            {!loading && doctors &&
                <div className="d-flex">
                    <div className="DoctorList-Sidebar">
                        <Sidebar
                            className="DoctorList-Sidebar_items"
                        >
                            <div className="">
                                <h2 className="mt-2  text-center">Our doctors</h2>
                                <div className="DoctorList-List mt-4">
                                    <ul>
                                        {specs.map((speciality, idx) => (
                                            <li key={idx} className="fw-bold fs-4 mt-3 DoctorList-List_link" onClick={linkHandler}>
                                                <a href="#!">
                                                    {speciality}
                                                </a>
                                            </li>
                                        ))}
                                        <li className="fw-bold fs-4 mt-5 DoctorList-List_link" id="all" onClick={linkHandler}>
                                            <a href="#!">
                                                All doctors
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Sidebar>
                    </div>
                    <div className="DoctorList-Items container pb-5">
                        {!activeElement ?
                            <CardElement title={"Our Doctors"} doctors={doctors} />
                            : <CardElement title={activeElement} doctors={doctors.filter(el => el.speciality === activeElement)} />
                        }
                    </div>
                </div>
            }
            {!doctors && <IfEmpty />}
        </>
    );
}

const CardElement = (props) => {
    const {title, doctors} = props;

    return (
        <>
            <h1>{title}</h1>
            <div className="mt-3">
                <Row xs={1} md={3} className="g-4 px-4">
                    {doctors.map((el, idx) => (
                        <Col key={idx}>
                            <DoctorListItem doctorInfo={el}/>
                        </Col>
                    ))}
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
                        By technical issues we have no ability to display our doctors.
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
