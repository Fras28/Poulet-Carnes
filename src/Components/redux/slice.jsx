import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  allProduct: [],
  copyallProducts: [],
  favProd: [],
  categorias:[],
  comercio:[],
  clave:"",
};


export const dataSlice = createSlice({
  name: "allData",
  initialState,
  reducers: {
    allProducts: (state, action) => {
      return {
        ...state,
        allProduct: action.payload,
        copyallProducts: action.payload,
      };
    },
    allCategorias: (state, action) => {
      return {
        ...state,
        categorias: action.payload,
      };
    },
    fillComercio: (state, action) => {
      return {
        ...state,
        comercio: action.payload,
      };
    },
    favProducts: (state, action) => {
      return {
        ...state,
        favProd: [...state.favProd, action.payload],
      };
    },
    fillClave: (state, action) => {
      return {
        ...state,
        clave: action.payload,
      };
    },
    cancelBagProducts: (state, action) => {
      const indexProd = state.favProd.findIndex(
        (product) => product.attributes.name === action.payload
      );
      console.log(indexProd, "cancel bag product");
      if (indexProd !== -1) {
        return {
          ...state,
          favProd: [
            ...state.favProd.slice(0, indexProd),
            ...state.favProd.slice(indexProd + 1),
          ],
        };
      }
      return state;
    },
    SearchProducts: (state, action) => {
      return {
        ...state,
        copyallProducts: state.allProduct
          .filter((e) => e.name.includes(action.payload) === true)
          .slice(0, 10),
      };
    },
  },
});
//   console.log(response.data.data.attributes.comercio.data.id, " esto es lo que trae el response de todos los arituclos");
//-------------------------------------------------------------------------------------------------------------------
//------------------------------------------ function Movies ------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
const API_STRAPI_ARTICTULOS = process.env.REACT_APP_API_STRAPI_ARTICTULOS;
const API_CATEGORIAS = process.env.REACT_APP_API_STRAPI_CATEGORIAS;
const API_COMERCIO = process.env.REACT_APP_API_STRAPI_COMERCIOS;
const API_ORDER = process.env.REACT_APP_API_ORDER;
const jwtSecret = process.env.JWT_SECRET;
const API_US = process.env.REACT_APP_API_USERS;
const IDENTIFIERU = process.env.REACT_APP_IDENTIFIER;
const PASSWORDU = process.env.REACT_APP_PASSWORD;

export const asyncAllProducts = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(API_STRAPI_ARTICTULOS);
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
  console.log(pedido.attributes.name, "async cancel fav Producto para quitar ");
  return async function (dispatch) {
    return dispatch(cancelBagProducts(pedido.attributes.name));
  };
};
export const asyncSearchBar = (string) => {
  return async function (dispatch) {
    return dispatch(SearchProducts(string));
  };
};



export const asyncOrder = ({Order_total,Payment_type,Order,Name,Detail,Type_order,Phone,Adress}) => {
  return async function (dispatch, getState) {
    try {
      // Use getState to retrieve the current state
      const initialState = getState();
      
      // Access the clave from the state
      const clave = initialState?.alldata?.clave;
      const CreatedBy = IDENTIFIERU
      // Wrap pedido in the data object
   const data ={ data:{Order_total,Payment_type,Order,Name,Detail,Type_order,Phone,Adress,CreatedBy}}

            console.log(data, "sera la estructura q nmecesito" );
      // Perform the API request with the Authorization header
      await axios.post(API_ORDER, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${clave}`, // Use clave from the state
        },
      });

      console.log("posteado correctamente, sliceee");
      return dispatch();
    } catch (error) {
      console.log(error, "from Order");
    }
  };
};


export const asyncUser = () => {
  return async function (dispatch) {
    try {
      const data = {
        identifier:IDENTIFIERU,
        password:PASSWORDU
      };

      const response = await axios.post(API_US, data);
      const categoriasOrdenadas = response.data.jwt;

      return dispatch(fillClave(categoriasOrdenadas));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};
//----------------------------------------------------------------------------------------------------------------

export const { allProducts, favProducts, cancelBagProducts, SearchProducts, allCategorias, fillComercio, fillClave } =
  dataSlice.actions;

export default dataSlice.reducer;
