import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './slice.jsx';

const store = configureStore({
  reducer: {
    alldata: dataSlice,
  },
});

// Función para guardar el estado en localStorage
export const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (e) {
    console.error("Error saving to localStorage:", e);
  }
};

export default store;