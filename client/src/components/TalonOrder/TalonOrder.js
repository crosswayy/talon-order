import React, {useState} from 'react';

import { DatePicker } from 'rsuite';
import {Button, Form, FormGroup, Input, Label, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";

import 'rsuite/dist/rsuite.min.css';
import './TalonOrder.scss';

export default function TalonOrder() {
    const [birthDate, setBirthDate] = useState(new Date());
    const [orderDate, setOrderDate] = useState(new Date());
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [dropDownItem, setDropDownItem] = useState("Doctor's speciality");

    const dropDownOpenHandler = () => {
        const dropdown = !dropDownOpen;
        setDropDownOpen(dropdown);
    }

    const dropDownHandler = (e) => {
        setDropDownItem(e.currentTarget.textContent);
    }

    console.log(birthDate);

    return (
      <div className="container mt-3">
          <h1>Talon order</h1>
          <div className="d-flex justify-content-between">
              <Form className="TalonOrder-UserForm">
                  <h2 className="mb-3">Patient info</h2>
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
                              />
                              <Label for="firstName">Name</Label>
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
                              />
                              <Label for="lastName">Last Name</Label>
                          </FormGroup>
                      </div>
                  </div>
                  <FormGroup className="Talon-UserDate mb-5">
                      <Label for="datePicker">Date of birth</Label>
                      <DatePicker
                        id="datePicker"
                        className="w-50"
                        size="lg"
                        format="dd.MM.yyyy"
                        placeholder="Date of birth"
                        placement="rightEnd"
                        oneTap
                        style={{ color: "black" }}
                        onChange={setBirthDate}
                      />
                  </FormGroup>
              </Form>

              <Form className="TalonOrder-PatientForm">
                  <h2 className="mb-3">Talon info</h2>
                  <div className="row mb-3">
                      <div className="col">
                          <FormGroup className="">
                              <ButtonDropdown
                                  toggle={dropDownOpenHandler}
                                  isOpen={dropDownOpen}
                                  size="lg"
                              >
                                  <DropdownToggle caret className="btn-primary">
                                      {dropDownItem}
                                  </DropdownToggle>
                                  <DropdownMenu>
                                      <DropdownItem header>
                                          Header
                                      </DropdownItem>
                                      <DropdownItem onClick={dropDownHandler}>
                                          Action
                                      </DropdownItem>
                                      <DropdownItem onClick={dropDownHandler}>
                                          Action #2
                                      </DropdownItem>
                                  </DropdownMenu>
                              </ButtonDropdown>
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
                              />
                              <Label for="lastName">Last Name</Label>
                          </FormGroup>
                      </div>
                  </div>
                  <FormGroup className="form-floating mb-5">
                      <Label for="password">Password</Label>
                  </FormGroup>
              </Form>
          </div>
      </div>
    );
}
