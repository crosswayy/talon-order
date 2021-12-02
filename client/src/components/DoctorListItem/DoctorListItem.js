import React from 'react';

import './DoctorListItem.scss';
import {Button, Card, CardBody, CardSubtitle, CardTitle} from "reactstrap";
import {useNavigate} from "react-router-dom";

export default function DoctorListItem(props) {
    const {
        details,
        speciality,
        firstName,
        lastName,
        room,
        years,
        email,
        id: doctorId
    } = props.doctorInfo;

    return (
        <Card className={details ? "TalonItem-Bgc" : ""}>
            <CardBody className="CardBody">
                <CardTitle
                    tag="h5"
                >
                    {speciality}
                </CardTitle>
                <CardSubtitle
                    className="mb-4 text-muted"
                    tag="h5"
                >
                    {firstName + ' ' + lastName}
                </CardSubtitle>
                <hr />
                <div className="DoctorText-Info mb-4 d-flex flex-column">
                    <div className="d-flex flex-row justify-content-between align-items-baseline">
                        <p className="fs-6">Consulting room:</p>
                        <p className="fw-bold fs-6">{room}</p>
                    </div>
                    <div className="mb-3 d-flex flex-row justify-content-between align-items-baseline">
                        <p className="fs-6">Year of experience:</p>
                        <p className="fw-bold fs-6">{years}</p>
                    </div>
                    <div className="mb-3 d-flex flex-row justify-content-between align-items-baseline">
                        <p className="fs-6">Email:</p>
                        <p className="fw-bold fs-6">{email}</p>
                    </div>
                </div>
                <hr />
                {!details && <Buttons doctorId={doctorId} email={email} />}
            </CardBody>
        </Card>
    );
}

const Buttons = (props) => {
    const navigate = useNavigate();
    const {doctorId} = props;
    const email = `mailto:${props.email}`;

    const orderHandler = () => {
        navigate('/order', {state: { doctorId }});
    };

    return (
        <div className="d-flex justify-content-between">
            <a href={email}>
                <Button className="btn-outline-primary btn-sm">
                    <i className="bi-envelope me-1"></i>
                    Send mail
                </Button>
            </a>
            <Button className="btn-outline-success" onClick={orderHandler}>
                Order a talon
                <i className="bi-box-arrow-up-right ms-1"></i>
            </Button>
        </div>
    );
}
