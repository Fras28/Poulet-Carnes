import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./LandingPage.css";

import Logo from "../assets/Logo.png";
import { VerPedido } from "../BtnBag/BtnBag";

import { useDispatch, useSelector } from "react-redux";

import Spinner from "../assets/Spinner/Spinner";
import Horarios from "../BtnNavidad/Horarios";

export default function LandingPage(url) {
  const { comercio, categorias } = useSelector((state) => state.alldata);
  const API = process.env.REACT_APP_API_STRAPI;
  const id = url.location.pathname.slice(1, 3);

  return (
    <div className="animate__animated  animate__zoomIn">
      {!categorias ? <Spinner imageUrl={Logo} /> : null}
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
          <Horarios />
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
          {categorias?.map((categoria, index) => (
            categoria?.attributes?.articulos?.data?.length !== 0?
            <NavLink
              className={`navLink `}
              to={
                url.location.pathname === "/"
                  ? `/${categoria.attributes?.name}`
                  : `${url?.location?.pathname}/${categoria?.attributes?.name}`
              }
            >
              <div
                className={`titInicio ${
                  index === comercio.length - 1 && index % 2 === 0
                    ? "fullWidth"
                    : ""
                }`}
              >
                <img
                  src={categoria?.attributes?.picture?.data != null ?
                    API +
                      categoria?.attributes?.picture?.data?.attributes?.formats
                        ?.small?.url : Logo
                  }
                  alt="fotito"
                />
                <p>{categoria?.attributes?.name}</p>
              </div>
            </NavLink> : null
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
