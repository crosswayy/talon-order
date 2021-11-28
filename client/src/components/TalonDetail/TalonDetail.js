import React from "react";

import TalonListItem from "../TalonListItem";

import {ReactComponent as Attention} from "../../images/attention.svg";
import './TalonDetail.scss';
import {Button} from "reactstrap";

export default function TalonDetail() {
    return (
        <div className="container w-100 mt-2 my-5">
            <div className="TalonDetail d-flex">
                <div className="TalonDetail-Card text-center">
                    <h3 className="mb-1">Your talon</h3>
                    <TalonListItem details />
                </div>
                <div className="TalonDetail-Info">
                    <h2 className="mb-3">You should know</h2>
                    <p className="fs-5">
                        In the right section of this page you can view your all information about the talon you ordered.
                        You can see the speciality and doctor's name your choose, name of patient, his birth date. You
                        also have information about time of appointment with a doctor.
                    </p>
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="TalonDetail-Attention mt-4 me-3">
                            <Attention />
                        </div>
                        <p className="fs-5">
                            Before you go to the consulting room, you should contact registry worker and call him a number
                            <b classNmae="fw-bold fs-1"> 678</b> and get a printed talon to visit the doctor
                        </p>
                    </div>
                    <p className="fs-5">
                        If you changed your mind about visiting a doctor, you should cancel your talon.
                        You can cancel the talon by pressing the button below.
                    </p>
                    <div className="TalonDetail-Btn text-center mt-5">
                        <Button className="btn-outline-danger btn-lg">
                            <i className="bi-x-square me-2"></i>
                            Cancel the order
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
