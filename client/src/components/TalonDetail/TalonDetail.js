import React, {useCallback, useContext, useEffect, useState} from "react";

import TalonListItem from "../TalonListItem";

import {ReactComponent as Attention} from "../../images/attention.svg";
import './TalonDetail.scss';
import {Button} from "reactstrap";
import {AuthContext} from "../../context/auth.context";
import {useHttp} from "../../hooks/http.hook";
import {useNavigate, useParams} from "react-router-dom";
import {Loader} from "rsuite";

export default function TalonDetail() {
    const {token} = useContext(AuthContext);
    const {loading, request} = useHttp();
    const navigate = useNavigate();
    const [talon, setTalon] = useState(null);
    const [talonNumber, setTalonNumber] = useState(null);
    const talonId = useParams().id;

    const getTalon = useCallback(async () => {
        try {
            const fetched = await request(`/api/talons/${talonId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })

            setTalon(fetched);
            setTalonNumber(fetched._id.replace(/[A-z]/g, '').slice(-3));
        } catch (e) {}
    }, [token, talonId, request]);

    const cancelHandler = useCallback(async () => {
        try {
            const fetched = await request(`/api/talons/${talonId}`, 'DELETE', null, {
                Authorization: `Bearer ${token}`
            });

            if (fetched.status === 200) {
                navigate('/talons');
            }
        } catch (e) {}
    }, [request, token, talonId, navigate]);

    useEffect(() => {
       getTalon();
    }, [getTalon]);

    if (loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && talon &&
                <div className="container w-100 mt-2 my-5">
                    <div className="TalonDetail d-flex">
                        <div className="TalonDetail-Card text-center">
                            <h3 className="mb-1">Your talon</h3>
                            <TalonListItem details data={talon} />
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
                                    <b className="fw-bold"> {talonNumber}</b> and get a printed talon to visit the doctor
                                </p>
                            </div>
                            <p className="fs-5">
                                If you changed your mind about visiting a doctor, you should cancel your talon.
                                You can cancel the talon by pressing the button below.
                            </p>
                            <div className="TalonDetail-Btn text-center mt-5">
                                <Button className="btn-outline-danger btn-lg" onClick={cancelHandler}>
                                    <i className="bi-x-square me-2"></i>
                                    Cancel the order
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
