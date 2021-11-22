import React, {useContext, useEffect, useState} from 'react';
import {Form, FormGroup, Input, Label, Button} from 'reactstrap';

import 'react-datepicker/dist/react-datepicker.css';
import {Link} from "react-router-dom";
import {useHttp} from "../../../hooks/http.hook";

import './Registration.scss';
import {useMessage} from "../../../hooks/message.hook";

export default function Registration(props) {
    const auth = useContext(AudioContext);
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', password: ''
    });

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message, 'success');
            auth.login(data.token)
        } catch (e) {}
    }


    useEffect(() => {
        if (error !== null) {
            if (error.errors) {
                error.errors.forEach(el => message(el, 'error'));
            } else {
                message(error.message, 'error');
            }
            clearError();
        }
    }, [error, message, clearError]);

    return (
        <div className="Registration">
            <h1 className="fw-normal text-center mt-3">Registration</h1>
            <Form className="Registration-Form">
                <div className="row mb-3">
                    <div className="col">
                        <FormGroup className="form-floating">
                            <Input
                                id="firstName"
                                name="firstName"
                                type="text"
                                className="form-control"
                                placeholder="First Name"
                                required
                                onChange={changeHandler}
                            />
                            <Label for="firstName">First Name</Label>
                        </FormGroup>
                    </div>
                    <div className="col">
                        <FormGroup className="form-floating">
                            <Input
                                id="lastName"
                                name="lastName"
                                type="text"
                                className="form-control"
                                placeholder="Last Name"
                                required
                                onChange={changeHandler}
                            />
                            <Label for="lastName">Last Name</Label>
                        </FormGroup>
                    </div>
                </div>
                <FormGroup className="form-floating">
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        required
                        onChange={changeHandler}
                    />
                    <Label for="email">Email</Label>
                </FormGroup>
                <FormGroup className="form-floating mb-5">
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        required
                        onChange={changeHandler}
                    />
                    <Label for="password">Password</Label>
                </FormGroup>
                <Button
                    type="submit"
                    className="Registration-Btn btn-primary mb-5"
                    onClick={registerHandler}
                    disabled={loading}
                >
                    Sign up
                </Button>

                <div className="text-center">
                    <p>Already have an account? <Link to={"/login"}>Sign in</Link></p>
                </div>
            </Form>
        </div>
    );
}
