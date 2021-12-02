import React from "react";

import './Home.scss';
import {NavLink} from "react-router-dom";
import {Button} from "reactstrap";

export default function Home() {
  return (
      <div className="Home">
          <main className="Home-Main">
              <div className="container">
                  <main className="d-flex justify-content-between align-items-center">
                      <h1 className="text-start w-50">
                          Find doctors who care about your health
                      </h1>
                      <div className="flex-grow-1 text-center">
                          <NavLink className="Home-OrderBtn" to={'/doctors'}>
                              <Button className="btn-success btn-lg">
                                  <i className="bi-ticket-detailed-fill me-2"></i>
                                  Choose a doctor
                              </Button>
                          </NavLink>
                      </div>
                  </main>
              </div>
          </main>
          <section className="Home-Section container">
             <div className="d-flex justify-content-between align-items-center">
                 <div className="flex-grow-1 text center">
                     <NavLink className="Home-OrderBtn btn-lg" to={'/order'}>
                         <Button className="btn-outline-primary .btn-lg">
                             Order now
                             <i className="bi-arrow-up-right ms-2"></i>
                         </Button>
                     </NavLink>
                 </div>
                 <div className="w-50">
                     <h2>You can order a talon at any moment using our service</h2>
                     <p className="fs-4 mt-5">
                         Our service is available at day and night. You are allowed to order a talon
                         at any time you want. Just click the button right from.
                     </p>
                 </div>
             </div>
          </section>
      </div>
  );
}
