import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  allProduct: [],
  copyallProducts: [],
  favProd: [],
  categorias:[],
  comercio:[],
};


export const dataSlice = createSlice({
  name: "allData",
  initialState,
  reducers: {
    allProducts: (state, action) => {
      state.allProduct = action.payload;
      state.copyallProducts = action.payload;
    },
    allCategorias:(state, action) => {
      // console.log(action.payload, "reducer articulos");
      state.categorias = action.payload;
    },
    fillComercio:(state, action) => {
      state.comercio = action.payload;
    },
    
    favProducts: (state, action) => {
      state.favProd = [...state.favProd, action.payload];
    },
    cancelBagProducts: (state, action) => {
      const indexProd = state.favProd.map(object => object.name).indexOf(action.payload);
      console.log(indexProd);
      if (indexProd !== "-1") {
        const newBag = state.favProd.splice(indexProd,1)
        state.favProd = state.favProd.filter(e => e !== newBag)
      } 
    },
    SearchProducts: (state, action) => {
      state.copyallProducts = state.copyallProducts
      .filter((e) => e.name.includes(action.payload) === true)
      .slice(0, 10);
    },
  },
});
//   console.log(response.data.data.attributes.comercio.data.id, " esto es lo que trae el response de todos los arituclos");
//-------------------------------------------------------------------------------------------------------------------
//------------------------------------------ function Movies ------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
const API_STRAPI_ARTICTULOS = process.env.REACT_APP_API_STRAPI_ARTICTULOS;
const API_CATEGORIAS = process.env.REACT_APP_API_STRAPI_CATEGORIAS;
const API_COMERCIO = process.env.REACT_APP_API_STRAPI_COMERCIOS

export const asyncAllProducts = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(API_STRAPI_ARTICTULOS);
      console.log(response.data.data, "articulos pollo");
      return dispatch(allProducts(response.data.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};
export const asyncComercio = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(API_COMERCIO);
      console.log(response.data.data, "info comercio");
      return dispatch(fillComercio(response.data.data));
    } catch (error) {
      console.error("Error fetching data comercio:", error);
    }
  };
};
export const asyncCategorias = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(API_CATEGORIAS);
      const categoriasOrdenadas = response.data.data.sort((a, b) => a.id - b.id);
      return dispatch(allCategorias(response.data.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};

export const asyncfavProducts = (pedido) => {
  return async function (dispatch) {
    return dispatch(favProducts(pedido));
  };
};
export const asyncCancelFav = (pedido) => {
  return async function (dispatch) {
    return dispatch(cancelBagProducts(pedido));
  };
};
export const asyncSearchBar = (string) => {
  return async function (dispatch) {
    return dispatch(SearchProducts(string));
  };
};
export const asyncOrder = (pedido)=>{
  return async function ( dispatch ){
    try{
      await axios.post(`https://ecommerce-demo.onrender.com/addP`,pedido);
      console.log("posteado correctamente, sliceee")
        return dispatch()
    }catch(error){
      console.log(error, "from Order")
    }
  }
}

//----------------------------------------------------------------------------------------------------------------

export const { allProducts, favProducts, cancelBagProducts, SearchProducts, allCategorias, fillComercio } =
  dataSlice.actions;

export default dataSlice.reducer;
