// ComandasComponent.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Comander.css';
import { asyncComandas, asyncPedidoRealizado } from '../redux/slice';
import LoginComponent from './LogIn';

const ComandasComponent = () => {
  const dispatch = useDispatch();
  const { comandas, usuarioComander } = useSelector((state) => state.alldata);

  useEffect(() => {
    // Define la función asincrónica para obtener comandas
    const obtenerComandas = async () => {
      try {
        // Llama a la acción asincrónica para obtener comandas
        await dispatch(asyncComandas());
      } catch (error) {
        console.error('Error al obtener comandas:', error);
        // Puedes dispatchar una acción para manejar el error según tus necesidades
      }
    };

    // Ejecuta la función para obtener comandas solo si usuarioComander cambia
    obtenerComandas();

    // Establece un intervalo para obtener comandas cada 15 segundos después de la primera llamada
    const intervalId = setInterval(() => {
      obtenerComandas();
    }, 15000);

    // Limpia el intervalo cuando el componente se desmonta o cuando ya no es necesario
    return () => clearInterval(intervalId);
  }, [usuarioComander, dispatch]);

  const HandleEntrega = (comanda) => {
    dispatch(asyncPedidoRealizado(comanda));
  };

  let OnlyToDo = comandas.filter((comanda) => comanda.attributes.Status === false);
  let Realizadas = comandas.filter((comanda) => comanda.attributes.Status === true);

  return (
    <div className="comandas-container">
      <LoginComponent/>
      <h2 className="comandas-title">Comandas en Tiempo Real</h2>
      <ul className="comandas-list">
        {OnlyToDo.map((comanda) => (
          <li key={comanda.attributes.id} className="comanda-item">
            <div className="comanda-details">
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
              { comanda.attributes.Adress ? (
                <>
                  <label className="comanda-label" htmlFor="phone">
                    Direccion:
                  </label>
                  <span className="comanda-value">{comanda.attributes.Adress}</span>
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
                {comanda.attributes.Order.split(',').map((item, index) => (
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
              <span className="comanda-value">{comanda.attributes.Order_total}</span>
            </div>
            <div className="comanda-details" >
              <button className='BtnComander' onClick={() => HandleEntrega(comanda)}>
                {comanda.attributes.Status ? 'Regenerate' : 'Entregado'}
              </button>
            </div>
          </li>
        ))}
         {Realizadas.map((comanda) => (
          <li key={comanda.attributes.id} className="comanda-item">
            <div className="comanda-details">
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
              { comanda.attributes.Adress ? (
                <>
                  <label className="comanda-label" htmlFor="phone">
                    Direccion:
                  </label>
                  <span className="comanda-value">{comanda.attributes.Adress}</span>
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
                {comanda.attributes.Order.split(',').map((item, index) => (
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
              <span className="comanda-value">{comanda.attributes.Order_total}</span>
            </div>
            <div className="comanda-details" style={{backgroundColor:"green"}}>
              <button className='BtnComander' onClick={() => HandleEntrega(comanda)}>
                {comanda.attributes.Status ? 'Regenerate' : 'Entregado'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComandasComponent;
