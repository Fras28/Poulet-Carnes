import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardsBag } from "./CardsBag/CardsB";
import { Nav } from "../Nav/Nav";
import "./myBag.css";
import { asyncAllProducts, asyncCategorias, asyncComercio, asyncOrder } from "../redux/slice";
import QRCode from "qrcode.react";
import ModalConfirm from "../Modal/ModalConfirmacion/ModalConfirmar";

export const BagXX = (id) => {
  const dispatch = useDispatch();
  const toTop = () => {
    window.scrollTo(0, 0);
  };
  toTop();


  useEffect(() => {
    const fetchData = () => {
      console.log("Effect is running");
      dispatch(asyncComercio());
      dispatch(asyncAllProducts());
      dispatch(asyncCategorias());
    };
    
    fetchData();
    
    const intervalId = setInterval(fetchData, 15 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [dispatch]);




  let { favProd } = useSelector((state) => state.alldata);

  const [pago, setPago] = useState({
    payment: "",
  });

  const [order, setOrder] = useState({
    pedido: "",
    detalle: "",
    nombre: "",
    telefono:"",
    domicilio:"",
    total_pedido: "",
    metodo_de_pago:"",
  });
  console.log(order, "pedido post");

  const sendComanda = () => {
    setOrder({
      pedido: favProd.map((x) => x.name).join(),
      description: "aprovado",
      mesa: id.match.params.id,
      price: total,
      status: true,
    });
    console.log(order, "esto es la info del post");
    dispatch(asyncOrder(order));
  };

  const metodoPago = function handbleOnMethod(e) {
    setPago({
      payment: e.target.value,
    });
  };

console.log(favProd, "fav product");

  let result = favProd.filter((item, index) => {
    return favProd.indexOf(item) === index;
  });

  const valores = favProd.map((e) => parseInt(e.attributes.price, 10));
  let total = valores.reduce((a, b) => a + b, 0);


  const groupedProducts = {};
favProd.forEach((product) => {
  const key = `${product.attributes.name} - ${product.attributes.price}`;
  groupedProducts[key] = (groupedProducts[key] || 0) + 1;
});

const whatsappMessage = Object.entries(groupedProducts).map(([productInfo, count]) => {
  const [name, price] = productInfo.split(' - ');
  return `${name} ($${price}) x${count},`;
}).join(', ');

const whatsappLink = `http://wa.me/542915729501?text=Hola Franco Mensaje de mi pedido ➤ ${whatsappMessage} Total = $ ${total}, "${pago?.payment}"`;
console.log(result, "que es esto ?");
  return (
    <div className="backBag">
      <Nav id={id.match.params.id} />
      <div className="contBag animate__animated   animate__rollIn animate__faster">
        <CardsBag products={result} />
      </div>
      <div className="boxPedido">
  
        <div className="boxPedido1"></div>
        <div className="wsspTarj">
          <ModalConfirm total={total} pago={pago.payment} whatsappMessage={whatsappLink}/>
        </div>
      </div>
    </div>
  );
};
