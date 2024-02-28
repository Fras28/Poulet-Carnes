import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Logo from "../../assets/Logo.png";
import "./ModalConfirmar.css"
import { useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalConfirm({total, pago, whatsappMessage }) {
  const [open, setOpen] = React.useState(false);
  const [telefono, setTelefono] = React.useState("");
  const [payment, setPayment] = React.useState({
    payment: "",
  });

  const [order, setOrder] = React.useState({
    pedido: "",
    description: "",
    mesa: "",
    price: "",
    telefono: "291", // Nuevo campo para el número de teléfono
    status: true,
  });

  const { comercio, favProd } = useSelector((state) => state.alldata);
  const handleTelefonoChange = (e) => {
    setOrder({
      ...order,
      telefono: e.target.value,
    });
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const metodoPago = function handbleOnMethod(e) {
    setPayment({
      payment: e.target.value,
    });
  };

  return (
    <div>
      <div>
        <button onClick={handleClickOpen} className="btnWssp low">Enviar Pedido </button>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="infoNavi">
          <div>
            <img src={Logo} alt="logo Coqui Cakes" width="100px" />
          </div>
          <div style={{ marginLeft: "30%" }}>
            <button className="exit" onClick={handleClose}>
              x
            </button>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Genial, estas a un paso de finalizar tu pedido.
            <br />
            ayudanos a tener una mejor atencion y dejarias tu numero de telefono
            :
            <form className="formPedido">

            <input
              className={`telefono-input selectP  ${order.telefono.length === 10 ? "" : "redX"}`}
              type="tel"
              id="telefono"
              name="telefono"
              max="10"
              value={order.telefono}
              onChange={handleTelefonoChange}
              placeholder="Ingresar telefono"
            />
             <select
            className="selectP"
            onChange={metodoPago}
            value={pago.payment}
          >
            <option hidden disabled selected value={""}>
              Como pagas?
            </option>
            <option>Efectivo</option>
            <option>Tarjeta</option>
            <option>QR</option>
          </select>
            <a
              href={whatsappMessage}
              rel="noreferrer"
              target="_blank"
            >
              <button className="btnWssp low">Enviar Pedido </button>
            </a>{" "}
            </form>
          </DialogContentText>
          {order.telefono.length === 10 ? "" : <p style={{color:"red"}}>El numero de telefono debe contener 10 caracteres Ej: 2915838406...</p>}
        </DialogContent>
        <DialogActions> </DialogActions>
      </Dialog>
    </div>
  );
}
