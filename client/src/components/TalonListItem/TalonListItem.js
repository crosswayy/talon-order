import React from 'react';

import {Button, Card, CardBody, CardImg, CardSubtitle, CardTitle} from "reactstrap";

import './TalonListItem.scss';

export default function TalonListItem(props) {
    const {details} = props;

    return (
        <Card className={details && "TalonItem-Bgc"}>
            {!details &&
                <CardImg
                    alt="Card image cap"
                    src="https://picsum.photos/318/180"
                    className="CardImg shadow-lg"
                    top
                />
            }
            <CardBody className="CardBody">
                <CardTitle
                    tag="h5"
                >
                    Cardiologist
                </CardTitle>
                <CardSubtitle
                    className="mb-4 text-muted"
                    tag="h5"
                >
                    Marya Dalhou
                </CardSubtitle>
                <hr />
                <div className="CardText-Info mb-4 d-flex flex-column">
                    <div className="d-flex flex-row justify-content-between align-items-baseline">
                        <p className="fs-6">Patient:</p>
                        <p className="fw-bold fs-6">Anatoliy Dalhou</p>
                    </div>
                    <div className="mb-3 d-flex flex-row justify-content-between align-items-baseline">
                        <p className="fs-6">Date of birth:</p>
                        <p className="fw-bold fs-6">25.01.2001</p>
                    </div>
                    <div className="d-flex flex-row justify-content-between align-items-baseline">
                        <p className="fs-6">Consulting room:</p>
                        <p className="fw-bold fs-6">614a</p>
                    </div>
                    <div className="mb-2 d-flex flex-row justify-content-between align-items-baseline">
                        <p className="fs-6">Date of order:</p>
                        <p className="fw-bold fs-6">10.03.2001</p>
                    </div>
                    <div className="d-flex flex-column justify-content-between align-items-baseline">
                        <p className="fs-6">Complaints:</p>
                        <p className="ms-3">
                            В последнее время во время голого сна наступает внезапная сувачка члена в жопку автоматически. Данный процесс не могу контролировать, когда просыпаюсь приходиться доставать.
                        </p>
                    </div>
                </div>
                <hr />
                {!details && <Buttons />}
            </CardBody>
        </Card>
    );
}

const Buttons = () => {
    return (
        <div className="d-flex justify-content-between">
            <Button className="btn-outline-danger btn-sm">
                <i className="bi-x-square-fill me-1"></i>
                Cancel
            </Button>
            <Button className="btn-outline-primary">
                View more info
                <i className="bi-box-arrow-up-right ms-1"></i>
            </Button>
        </div>
    );
}
