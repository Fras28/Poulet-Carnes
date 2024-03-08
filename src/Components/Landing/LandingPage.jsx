import React from "react";
import { NavLink } from "react-router-dom";
import "./LandingPage.css";

import Logo from "../assets/Logo.png";
import { VerPedido } from "../BtnBag/BtnBag";

import { useSelector } from "react-redux";

import Spinner from "../assets/Spinner/Spinner";

const API = process.env.REACT_APP_API_STRAPI;

export default function LandingPage(url) {
  

  const id = url.location.pathname.slice(1, 3);
  const { categorias } = useSelector((state) => state.alldata);
const categoriasTrue = categorias?.filter((categoria) => categoria?.attributes?.articulos?.data.length !== 0)



console.log(categoriasTrue, "llegar a confirmar que esa categoria tiene articulos");
  return (
    <div className="animate__animated  animate__zoomIn">
      {categorias.length === 0 ? <Spinner imageUrl={Logo} /> : null}
      <div className="naviLanding titCasa ">
        <div className="logoL">
          <NavLink to={`/${id}`}>
            <img src={Logo} alt="" width="120px" />
          </NavLink>
        </div>
        <div className="navi2">
          <svg
            width="59"
            height="2"
            viewBox="0 0 59 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M59 0.999995L0 1" stroke="#E88A23" />
          </svg>
          <p className="naviTit2"> Nuesto Catalogo </p>
          <svg
            width="59"
            height="2"
            viewBox="0 0 59 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M59 0.999995L0 1" stroke="#E88A23" />
          </svg>
        </div>
      </div>

      <div className="conteinerLB2  ">
        <div className="rowsCardL">
          {categoriasTrue?.map((categoria) => (
            <NavLink
              className="navLink"
              to={
                url.location.pathname === "/"
                  ? `/${categoria?.attributes?.name}`
                  : `${url.location.pathname}/${categoria?.attributes?.name}`
              }
            >
              <div className="titInicio">
                <div className="titInicioTop">
                  <img
                    src={
                      `${API}${categoria?.attributes?.picture?.data?.attributes?.url}` ||
                      Logo
                    }
                    alt="fotito"
                  />
                </div>
                <div className="titInicioBot">
                  <p>{categoria?.attributes?.name}</p>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="navi2">
        <svg
          width="59"
          height="2"
          viewBox="0 0 59 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M59 0.999995L0 1" stroke="#E88A23" />
        </svg>
        <p className="naviTit3"> Seguinos en </p>
        <svg
          width="59"
          height="2"
          viewBox="0 0 59 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M59 0.999995L0 1" stroke="#E88A23" />
        </svg>
      </div>
      <VerPedido id={url.location.pathname.slice(1, 3)} />
    </div>
  );
}
