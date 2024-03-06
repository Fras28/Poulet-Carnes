import React from "react";
import { Cards } from "../Cards/Cards.jsx";
import "./Categorias.css";
import  Nav  from "../Nav/Nav.jsx";
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

const API = process.env.REACT_APP_API_STRAPI;

export const Cerdo = (id) => {
  const mesa = id.match.url.slice(1, 3);

  let dispatch = useDispatch();

  let { allProduct } = useSelector((state) => state.alldata);

 

  const soloEsteComercio = allProduct.filter(
    (e) => e.attributes.comercio.data.id === 1
  );

  const Productos = soloEsteComercio?.filter(
    (e) => e.attributes?.categorias?.data.id === 3
  );


  const subCategoriaFilters = Productos?.reduce((acc, product) => {
    const subCategoriaId = product.attributes?.sub_categoria?.data?.id;
  
    if (subCategoriaId) {
      if (!acc[subCategoriaId]) {
        acc[subCategoriaId] = [];
      }
      acc[subCategoriaId].push(product);
    }
  
    return acc;
  }, []);
  
  // Puedes acceder a cada Xn dinámicamente
  const dynamicVariables = Object.keys(subCategoriaFilters).map((key) => {
    return subCategoriaFilters[key];
  });

  return (
    <div className="containerL">
      <Nav id={mesa} />
      <div className="sectioner">
        {subCategoriaFilters.map((product, index) =>
          product[0] ? (
            <a
              key={index}
              href={`#${product[0].attributes.sub_categoria.data.id}`}
            >
              {product[0]?.attributes.sub_categoria.data.attributes.name}
            </a>
          ) : null
        )}
      </div>
      <div className="conteinerLC ">
        <div className="conteinerLB2 animate__animated  animate__zoomIn animate__faster">
        {subCategoriaFilters?.map(product => (
      product[0]?
  <div key={product[0]?.attributes?.sub_categoria?.data?.id}>
    <img
      src={
        `${API}${product[0]?.attributes?.sub_categoria?.data?.attributes?.picture?.data?.attributes?.url}` ||
        Logo
      }
      alt={"img - "+product[0]?.attributes?.sub_categoria?.data?.attributes?.name}
      id={product[0]?.attributes?.sub_categoria?.data?.id}
      className="ImgSubCat"
    />
    <Cards products={product} />
  </div> : null
))}
        </div>
        {soloEsteComercio.length === 0 ? <Spinner imageUrl={Logo} /> : null}
      </div>
      <VerPedido id={mesa} />
    </div>
  );
};
