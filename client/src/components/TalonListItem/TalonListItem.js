import React from 'react';

import {Button, Card, CardBody, CardSubtitle, CardTitle} from "reactstrap";
import {useNavigate} from "react-router-dom";

import './TalonListItem.scss';

export default function TalonListItem(props) {
    const {details, data, data: {doctor}, onCancelClick} = props;

    return (
        <Card className={details && "TalonItem-Bgc"}>
            <CardBody className="CardBody">
                <CardTitle
                    tag="h5"
                >
                    {doctor.speciality}
                </CardTitle>
                <CardSubtitle
                    className="mb-4 text-muted"
                    tag="h5"
                >
                    {doctor.firstName + ' ' + doctor.lastName}
                </CardSubtitle>
                <hr />
                <div className="CardText-Info mb-4 d-flex flex-column">
                    <div className="d-flex flex-row justify-content-between align-items-baseline">
                        <p className="fs-6">Patient:</p>
                        <p className="fw-bold fs-6">{data.firstName + ' ' + data.lastName}</p>
                    </div>
                    <div className="mb-3 d-flex flex-row justify-content-between align-items-baseline">
                        <p className="fs-6">Date of birth:</p>
                        <p className="fw-bold fs-6">{data.dateOfBirth}</p>
                    </div>
                    <div className="d-flex flex-row justify-content-between align-items-baseline">
                        <p className="fs-6">Consulting room:</p>
                        <p className="fw-bold fs-6">{doctor.room}</p>
                    </div>
                    <div className="mb-2 d-flex flex-row justify-content-between align-items-baseline">
                        <p className="fs-6">Date of order:</p>
                        <p className="fw-bold fs-6">{data.dateOfAppointment}</p>
                    </div>
                    <div className="d-flex flex-column justify-content-between align-items-baseline">
                        <p className="fs-6">Complaints:</p>
                        <p className="ms-3">{data.complaints}</p>
                    </div>
                </div>
                <hr />
                {!details && <Buttons talonId={data._id} onCancelClick={onCancelClick}/>}
            </CardBody>
        </Card>
    );
}

const Buttons = (props) => {
    const {talonId, onCancelClick} = props;
    const navigate = useNavigate();

    const moreInfoHandler = () => {
        navigate(`/detail/${talonId}`);
    }

    const handleCancelTalon = () => {
        onCancelClick(talonId);
    }

    return (
        <div className="d-flex justify-content-between">
            <Button className="btn-outline-danger btn-sm" onClick={handleCancelTalon}>
                <i className="bi-x-square-fill me-1"></i>
                Cancel
            </Button>
            <Button className="btn-outline-primary" onClick={moreInfoHandler}>
                View more info
                <i className="bi-box-arrow-up-right ms-1"></i>
            </Button>
        </div>
    );
}
