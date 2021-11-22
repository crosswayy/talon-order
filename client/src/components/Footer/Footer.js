import React from "react";

import {ReactComponent as GitHub} from "../../images/github.svg";
import {ReactComponent as LinkedIn} from "../../images/linkedin.svg";
import {ReactComponent as Telegram} from "../../images/telegram.svg";
import {ReactComponent as VK} from "../../images/vk.svg";

import './Footer.scss';
import {NavLink} from "react-router-dom";

export default function Footer() {

  return (
    <footer className="text-center text-white fixed-bottom">
      <div className="container pt-2">
        <section className="mb-2">
          <a href="https://github.com/crosswayy" className="btn btn-link">
            <GitHub className="Footer-Icon"/>
          </a>
          <a href="https://www.linkedin.com/in/yauhen-dubina-4954951a6/" className="btn btn-link">
            <LinkedIn className="Footer-Icon"/>
          </a>
          <a href="https://t.me/crosswayy" className="btn btn-link">
            <Telegram className="Footer-Icon"/>
          </a>
          <a href="https://vk.com/crosswayy" className="btn btn-link">
            <VK className="Footer-Icon"/>
          </a>
        </section>
      </div>

      <div className="text-center text-dark p-3 Footer-Copy">
        © 2021 Copyright:
        <a className="text-dark" href="https://github.com/crosswayy"> github.com</a>
      </div>
    </footer>
  );
}
