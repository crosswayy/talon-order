import React, {useCallback, useContext, useEffect, useState} from 'react';

import {DatePicker, Loader} from 'rsuite';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";

import 'rsuite/dist/rsuite.min.css';
import './TalonOrder.scss';
import DropdownBtn from "../DropdownBtn";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/auth.context";
import {useMessage} from '../../hooks/message.hook';
import {useLocation, useNavigate} from "react-router-dom";

export default function TalonOrder() {
    const location = useLocation();

    const auth = useContext(AuthContext);
    const {error, clearError, loading, request} = useHttp();
    const navigate = useNavigate();
    const message = useMessage();
    const [birthDate, setBirthDate] = useState(new Date());
    const [orderDate, setOrderDate] = useState(new Date());
    const [dropDownSpeciality, setDropDownSpeciality] = useState('Speciality');
    const [dropDownDoctor, setDropDownDoctor] = useState('Doctor');
    const [doctorsData, setDoctorsData] = useState([]);
    const [talonData, setTalonData] = useState({
        firstName: '', lastName: '', dateOfBirth: '', dateOfAppointment: '', doctor: ''
    });

    const doctorsHandler = useCallback(async () => {
        try {
            const data = await request('/api/doctors/', 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            });

            setDoctorsData((doctorsData) => [...doctorsData, ...data]);
        } catch(e) {}
    }, [request, auth.token]);

    const changeHandler = (e) => {
        setTalonData({ ...talonData, [e.target.name]: e.target.value});
    }

    const handleDateBirth = (date) => {
        setBirthDate(date);
        setTalonData(talonData => ({ ...talonData, dateOfBirth: date }));
    }

    const handleDateAppointment = (date) => {
        setOrderDate(date);
        setTalonData({ ...talonData, dateOfAppointment: date });
    }

    const confirmHandler = async () => {
      try {
            const data = await request('/api/talons/create', 'POST', {...talonData}, {
                Authorization: `Bearer ${auth.token}`
            });

            message('Successfully ordered!', 'success');
            navigate(`/detail/${data._id}`);
      } catch (e) {

      }
    }

    useEffect(() => {
        if (location.state && location.state.doctorId && doctorsData.length > 0) {
            const elements = document.querySelectorAll('.Dropdown-Name');

            const doctor = doctorsData.filter(el => el.id === location.state.doctorId)[0];
            setDropDownSpeciality(doctor.speciality);
            setDropDownDoctor(doctor.firstName + ' ' + doctor.lastName);
            setTalonData({ ...talonData, doctor: location.state.doctorId});

            elements[0].innerHTML = doctor.speciality;
            elements[1].innerHTML = doctor.firstName + ' ' + doctor.lastName;
        }
    }, [location.state, doctorsData]);

    useEffect(() => {
        doctorsHandler();
    }, [doctorsHandler]);

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

    const handleDropDown = (name, value) => {
        if (name === 'dropDownSpeciality') {
            setDropDownSpeciality(value);
            setDropDownDoctor('Doctor');
        } else {
            setDropDownDoctor(value);
            setTalonData({ ...talonData, doctor: doctorsData.filter(el => value === el.firstName + ' ' + el.lastName)[0].id});
        }
    }

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
                                onChange={changeHandler}
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
                                onChange={changeHandler}
                              />
                              <Label for="lastName">Last Name</Label>
                          </FormGroup>
                      </div>
                  </div>
                  <FormGroup className="Talon-UserDate mb-5">
                      <Label for="datePicker">Date of birth</Label>
                      <DatePicker
                        id="datePicker"
                        name="dateOfBirth"
                        className="w-50"
                        size="lg"
                        format="dd.MM.yyyy"
                        placeholder="Date of birth"
                        placement="rightEnd"
                        oneTap
                        style={{ color: "black" }}
                        onChange={handleDateBirth}
                      />
                  </FormGroup>
                  <FormGroup className="form-floating">
                      <Input
                          id="complaints"
                          name="complaints"
                          type="textarea"
                          className="form-control"
                          placeholder="Complaints"
                          required
                          onChange={changeHandler}
                      />
                      <Label for="complaints">Complaints</Label>
                  </FormGroup>
              </Form>

              <Form className="TalonOrder-PatientForm">
                  <h2 className="mb-3">Talon info</h2>
                  <div className="TalonOrder-TalonForm mb-3">
                      <div className="">
                          <FormGroup className="">
                              {!loading && doctorsData ?
                                  <DropdownBtn
                                      btnName={dropDownSpeciality}
                                      name="dropDownSpeciality"
                                      items={[...new Set(doctorsData.map(el => el.speciality))]}
                                      onSelectItem={handleDropDown}
                                  />
                              : <Loader speed="fast"/>}
                          </FormGroup>
                      </div>
                      <div className="">
                          <FormGroup className="">
                              <DropdownBtn
                                  btnName={dropDownDoctor}
                                  name="dropDownDoctor"
                                  items={doctorsData.filter(el => el.speciality === dropDownSpeciality).map(el => (`${el.firstName} ${el.lastName}`))}
                                  disabled={!dropDownSpeciality}
                                  onSelectItem={handleDropDown}
                              />
                          </FormGroup>
                      </div>
                  </div>
                  <FormGroup className="form-floating mb-5">
                      <FormGroup className="Talon-UserDate mb-5">
                          <Label for="orderDatePicker">Date of appointment</Label>
                          <DatePicker
                              format="dd-MM-yyyy HH:mm"
                              ranges={[]}
                              id="orderDatePicker"
                              name="dateOfAppointment"
                              className="w-50"
                              size="lg"
                              placeholder="Date of appointment"
                              placement="leftEnd"
                              oneTap
                              style={{ color: "black" }}
                              onChange={handleDateAppointment}
                          />
                      </FormGroup>
                  </FormGroup>
              </Form>
          </div>

          <div className="TalonOrder-Confirm float-end">
              <Button
                  className="mt-5 me-4 btn-lg btn-outline-danger"
                  // onClick={resetHandler}
              >
                  Reset
              </Button>

              <Button
                  className="mt-5 btn-lg btn-primary"
                  onClick={confirmHandler}
              >
                  Order a talon
              </Button>
          </div>
      </div>
    );
}
