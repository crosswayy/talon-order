import React, {useContext, useEffect, useState} from 'react';
import {Form, FormGroup, Input, Label, Button} from 'reactstrap';

import {Link} from "react-router-dom";
import {useMessage} from "../../../hooks/message.hook";
import {useHttp} from "../../../hooks/http.hook";
import {AuthContext} from "../../../context/auth.context";

import 'react-datepicker/dist/react-datepicker.css';
import './Authorization.scss'

export default function Registration(props) {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    });
    const [checked, setChecked] = useState(true);

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const checkboxHandler = (event) => {
        setChecked(event.target.checked);
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            message(data.message, 'success', 500);
            auth.login(data.token, data.userId, checked);
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
            <h1 className="fw-bold text-center mt-3">Authorization</h1>
            <Form className="Registration-Form">
                <div className="mb-4">
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
                            onChange={changeHandler}
                        />
                        <Label for="password">Password</Label>
                    </FormGroup>
                    <Button
                        type="submit"
                        className="Registration-Btn btn-primary"
                        disabled={loading}
                        onClick={loginHandler}
                    >
                        Sign in
                    </Button>
                </div>

                <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                        <FormGroup className="form-check">
                            <Input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="rememberCheckbox"
                                checked={checked}
                                onChange={checkboxHandler}
                            />
                            <Label className="form-check-label" for="rememberCheckbox"> Remember me </Label>
                        </FormGroup>
                    </div>
                    <div className="col">
                        <a href="#!">Forgot password?</a>
                    </div>
                </div>

                <div className="text-center">
                    <p>Not a member? <Link to={"/signup"}>Sign up</Link></p>
                </div>
            </Form>
        </div>
    );
}
