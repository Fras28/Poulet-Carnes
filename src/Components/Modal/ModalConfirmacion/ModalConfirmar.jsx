import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Logo from "../../assets/Logo.png";
import "./ModalConfirmar.css";
import { useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalConfirm({total, pago }) {
  const [open, setOpen] = React.useState(false);
  const [telefono, setTelefono] = React.useState("");
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

  console.log(favProd, "favProd");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            <a
              href={`http://wa.me/${
                comercio[0]?.attributes?.whatsapp
              }?text=Hola Rey Del Pollo ➤ ${favProd?.map(
                (e) => e.attributes.name + "$" + e.attributes.price + ", "
              )} Total = $ ${total}, "${pago}"`}
              rel="noreferrer"
              target="_blank"
            >
              <button className="btnWssp low">Enviar Pedido </button>
            </a>{" "}
          </DialogContentText>
          {order.telefono.length === 10 ? "" : <p style={{color:"red"}}>El numero de telefono debe contener 10 caracteres Ej: 2915838406...</p>}
        </DialogContent>
        <DialogActions> </DialogActions>
      </Dialog>
    </div>
  );
}
