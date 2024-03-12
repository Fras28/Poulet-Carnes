import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Logo from "../assets/Logo.png"
import "./BtnNavidad.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Horarios() {
  const [open, setOpen] = React.useState(false);

  const horarios = {
    lunes: ['9 a.m.–1 p.m.', '5–9 p.m.'],
    martes: ['9 a.m.–1 p.m.', '5–9 p.m.'],
    miércoles: ['9 a.m.–1 p.m.', '5–9 p.m.'],
    jueves: ['9 a.m.–1 p.m.', '5–9 p.m.'],
    viernes: ['9 a.m.–1 p.m.', '5–9 p.m.'],
    sábado: ['9 a.m.–9 p.m.'],
    domingo: ['9 a.m.–1 p.m.'],
  };




  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="btnNav2">
      <div>
        <button onClick={handleClickOpen} className="noBord" style={{fontSize:"1rem"}}>
      Nuestros Horarios
        </button>
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
          <div style={{marginLeft:"30%"}}>
          <button className="exit" onClick={handleClose}>
            x
          </button>
          </div>
        </DialogTitle>
        <DialogContent style={{display: "flex",
    flexDirection: "column",
    alignItems: "center"}}>
        <h2>Horarios de la Semana</h2>
            <ul style={{paddingLeft:"0"}}>
              {Object.entries(horarios).map(([dia, horas]) => (
                <li key={dia} style={{display:"flex",justifyContent: "space-between",alignItems: "center", gap:"10px"}}>
                  <strong>{dia}:</strong>
               
                    {horas.map((hora, index) => (
                      <p key={index} style={{whiteSpace: "nowrap"}}>{hora}</p>
                    ))}
                 
                </li>
              ))}
            </ul>
        </DialogContent>
        <DialogActions> </DialogActions>
      </Dialog>
    </div>
  );
}
