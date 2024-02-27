import React, { useEffect } from "react";
import { Cards } from "../Cards/Cards.jsx";
import "./Categorias.css";
import { Nav } from "../Nav/Nav.jsx";
import { useDispatch, useSelector } from "react-redux";
import { asyncAllProducts } from "../redux/slice.jsx";
import { VerPedido } from "../BtnBag/BtnBag.jsx";

import milanesas from "../assets/Pollo/milanesas.jpg"
import hamburguesas from "../assets/Pollo/hamburguesas.jpg"
import polloTrozado from "../assets/Pollo/polloTrozado.jpg"
import arrollado from "../assets/Pollo/arrollados.jpg"
import papas from "../assets/Pollo/papas.jpg"
import merluza from "../assets/Pollo/merluza.webp"
import nuggets from "../assets/Pollo/nuggets.jpg"

import Spinner from "../assets/Spinner/Spinner.jsx";
import Logo from "../assets/LogoCoqui.png"

export const Congelados = (id) => {
  const mesa = id.match.url.slice(1, 3);

  let dispatch = useDispatch();

  let { allProduct } = useSelector((state) => state.alldata);

  useEffect(() => {
    // Función para realizar la acción deseada
    const fetchData = () => {
      console.log("Effect is running");
      dispatch(asyncAllProducts());
    };

    // Ejecutar la función inmediatamente al montar el componente
    fetchData();

    // Configurar la repetición cada 15 minutos
    const intervalId = setInterval(fetchData, 15 * 60 * 1000); // 15 minutos en milisegundos

    // Limpiar el intervalo al desmontar el componente para evitar fugas de memoria
    return () => clearInterval(intervalId);
  }, [dispatch]);

  const soloEsteComercio = allProduct.filter(
    (e) => e.attributes.comercio.data.id === 1
  );

  const CafeteriaProducts = soloEsteComercio?.filter(
    (e) => e.attributes?.categorias?.data.id === 5
    );

  const X1 = CafeteriaProducts?.filter(
    (e) => e.attributes?.sub_categoria?.data?.id === 10
  );
  const X2 = CafeteriaProducts?.filter(
    (e) => e.attributes?.sub_categoria?.data?.id === 11
  );
  const X3 = CafeteriaProducts?.filter(
    (e) => e.attributes?.sub_categoria?.data?.id === 12
  );
  const X4 = CafeteriaProducts?.filter(
    (e) => e.attributes?.sub_categoria?.data?.id === 13
  );
  // const X5 = CafeteriaProducts?.filter(
  //   (e) => e.attributes?.sub_categoria?.data?.id === 5
  // );
  // const X6 = CafeteriaProducts?.filter(
  //   (e) => e.attributes?.sub_categoria?.data?.id === 6
  // );
  // const X7 = CafeteriaProducts?.filter(
  //   (e) => e.attributes?.sub_categoria?.data?.id === 7
  // );


  return (
    <div className="containerL">
      <Nav id={mesa} />
      <div className="sectioner">
  {[ X4, X3, X2, X1].map((product, index) => (
    product[0] ? (
      <a key={index} href={`#${product[0].attributes.sub_categoria.data.id}`} >
        {product[0]?.attributes.sub_categoria.data.attributes.name}
      </a>
    ) : null
  ))}
</div>
      <div className="conteinerLC ">
        <div className="conteinerLB2 animate__animated  animate__zoomIn animate__faster">
          {X1[0] ? (
            <>
              <img src={milanesas} alt="promo" id={X1[0]?.attributes?.sub_categoria?.data?.id}/>
              <Cards products={X1} />
            </>
          ) : null}

          {X2[0] ? (
            <>
              <img
                src={hamburguesas}
                alt="promo"
                id={X2[0]?.attributes?.sub_categoria?.data?.id}
              />
              <Cards products={X2} />
            </>
          ) : null}
          {X3 ? (
            <>
              <img
                src={polloTrozado}
                alt="promo"
                id={X3[0]?.attributes?.sub_categoria?.data?.id}
              />
              <Cards products={X3} />
            </>
          ) : null}
          {X4[0] ? (
            <>
              {" "}
              <img
                src={arrollado}
                alt="promo"
                id={X4[0]?.attributes?.sub_categoria?.data?.id}
              />
              <Cards products={X4} />
            </>
          ) : null}

          {/* {X5[0] ? (
            <>
              <img
                src={papas}
                alt="promo"
                id={X5[0]?.attributes?.sub_categoria?.data?.id}
              />
              <Cards products={X5} />
            </>
          ) : null}

          {X6[0] ? (
            <>
              {" "}
              <img
                src={merluza}
                alt="promo"
                id={X6[0]?.attributes?.sub_categoria?.data?.id}
              />
              <Cards products={X6} /> aaa
            </>
          ) : null}
          {X7[0] ? (
            <>
              <img
                src={nuggets}
                alt="promo"
                id={X7[0]?.attributes?.sub_categoria?.data?.id}
              />
              <Cards products={X7} />
            </>
          ) : null} */}
        </div>
       {soloEsteComercio.length === 0? <Spinner imageUrl={Logo}/>:null} 
      </div>
      <VerPedido id={mesa} />
    </div>
  );
};
