import React, {useState} from 'react';
import {Form, FormGroup, Input, Label, Button} from 'reactstrap';

import 'react-datepicker/dist/react-datepicker.css';
import './Authorization.scss';
import {Link} from "react-router-dom";

export default function Registration(props) {
    const [startDate, setStartDate] = useState(new Date());

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
                        />
                        <Label for="password">Password</Label>
                    </FormGroup>
                    <Button
                        type="submit"
                        className="Registration-Btn btn-primary"
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
                                defaultChecked
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
