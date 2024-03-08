// ComandasComponent.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Comander.css";
import { asyncComandas, asyncPedidoRealizado } from "../redux/slice";
import LoginComponent from "./LogIn";

const CardComanda = (comanda) => {
  const dispatch = useDispatch();

  const [loadingComandas, setLoadingComandas] = useState([]);





  const HandleEntrega = async (comanda) => {
    // Actualiza el estado de carga para la comanda correspondiente
    setLoadingComandas((prevLoadingComandas) => [...prevLoadingComandas, comanda.attributes.id]);

    try {
      await dispatch(asyncPedidoRealizado(comanda));
    } finally {
      // Elimina la comanda del estado de carga una vez que la operación se ha completado
      setLoadingComandas((prevLoadingComandas) =>
        prevLoadingComandas.filter((id) => id !== comanda.attributes.id)
      );
    }
  };

  return (
    <div>
    <li key={comanda.attributes.id} className="comanda-item">
            <div className="comanda-details">
              <label className="comanda-label" htmlFor="customer-name">
                {comanda.attributes.createdAt}
              </label>
              <label className="comanda-label" htmlFor="customer-name">
                Nombre del Cliente:
              </label>
              <span className="comanda-value">{comanda.attributes.Name}</span>
            </div>
            <div className="comanda-details">
              <label className="comanda-label" htmlFor="phone">
                Teléfono:
              </label>
              <span className="comanda-value">{comanda.attributes.Phone}</span>
              {comanda.attributes.Adress ? (
                <>
                  <label className="comanda-label" htmlFor="phone">
                    Direccion:
                  </label>
                  <span className="comanda-value">
                    {comanda.attributes.Adress}
                  </span>
                </>
              ) : (
                <label className="comanda-label" htmlFor="phone">
                  -- Take Way
                </label>
              )}
            </div>
            <div className="comanda-details">
              <label className="comanda-label" htmlFor="order">
                Pedido:
              </label>
              <div className="order-items">
                {comanda.attributes.Order.split(",").map((item, index) => (
                  <div key={index} className="order-item">
                    {item.trim()}
                  </div>
                ))}
              </div>
            </div>
            <div className="comanda-details">
              <label className="comanda-label" htmlFor="order-total">
                Total:
              </label>
              <span className="comanda-value">
                ${comanda.attributes.Order_total}
              </span>
            </div>
            <div className="comanda-details" backgroundColor="green">
              {loadingComandas.includes(comanda.attributes.id) ? (
                <div className="spinner">Cargando...</div>
              ) : comanda.attributes.Status ? (
                <button className="BtnComander" onClick={() => HandleEntrega(comanda)}>
                  Regenerate
                </button>
              ) : (
                <button className="BtnComander2" onClick={() => HandleEntrega(comanda)}>
                  Entregado
                </button>
              )}
            </div>
          </li>
    </div>
  )};

  export default CardComanda;