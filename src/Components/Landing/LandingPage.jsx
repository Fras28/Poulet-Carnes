import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./LandingPage.css";

import Logo from "../assets/Logo.png";
import { VerPedido } from "../BtnBag/BtnBag";

import { useDispatch, useSelector } from "react-redux";
import {
  asyncAllProducts,
  asyncCategorias,
  asyncComercio,
} from "../redux/slice";
import Spinner from "../assets/Spinner/Spinner";

const API = process.env.REACT_APP_API_STRAPI;

export default function LandingPage(url) {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = () => {
      console.log("Effect is running");
      dispatch(asyncCategorias());
    };

    // Ejecutar la función inmediatamente al montar el componente
    fetchData();

    // Configurar la repetición cada 15 minutos
    const intervalId = setInterval(fetchData, 15 * 60 * 1000); // 15 minutos en milisegundos

    // Limpiar el intervalo al desmontar el componente para evitar fugas de memoria
    return () => clearInterval(intervalId);
  }, [dispatch]);
  const id = url.location.pathname.slice(1, 3);
  const { categorias } = useSelector((state) => state.alldata);
  console.log(categorias, " api ??");
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
          {categorias?.map((categoria) => (
            <NavLink
              className="navLink"
              to={
                url.location.pathname === "/"
                  ? `/${categoria.attributes?.name}`
                  : `${url.location.pathname}/${categoria.attributes?.name}`
              }
            >
              <div className="titInicio">
                <div className="titInicioTop">
                  <img
                    src={
                      `${API}${categoria.attributes.picture.data.attributes.url}` ||
                      Logo
                    }
                    alt="fotito"
                  />
                </div>
                <div className="titInicioBot">
                  <p>{categoria.attributes?.name}</p>
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
