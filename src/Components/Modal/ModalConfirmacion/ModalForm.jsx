// ModalForm.js
import React from "react";
import "./ModalForm.css"; // Create a separate CSS file for styling

const ModalForm = ({
  order,
  handleOrder,
  sendComanda,
  whatsappLink,
  isValidForm,
}) => {
  return (
    <div className="modal-form">
      <div>
        <label htmlFor="telefono">Teléfono:</label>
        <input
          className={`telefono-input selectP ${
            /^\d{10}$/.test(order.Phone) ? "" : "redX"
          }`}
          type="tel"
          id="telefono"
          name="Phone"
          maxLength="10"
          pattern="[0-9]{10}"
          value={order.Phone}
          onChange={handleOrder}
          placeholder="Ingresar telefono"
        />
        {(order.Phone && /^\d{10}$/.test(order.Phone)) ? (
          <p className="valid-message">✔️</p>
        ) : (
          (order.Phone && order.Phone !== "291" ) && (
            <p className="error-message">
              Por favor, ingrese un número de teléfono válido.
            </p>
          )
        )}
      </div>
      {/* ... Other form fields */}
      <a
        href={whatsappLink}
        onClick={(e) => sendComanda(e)}
        rel="noreferrer"
        target="_blank"
        disabled={!isValidForm}
      >
        <button
          className="btnWssp"
          onClick={(e) => sendComanda(e)}
          disabled={!isValidForm}
        >
          Enviar Pedido
        </button>
      </a>{" "}
      {!isValidForm && (
        <p style={{ color: "red", marginTop: "10px" }}>
          Por favor, complete todos los campos obligatorios.
        </p>
      )}
    </div>
  );
};

export default ModalForm;
