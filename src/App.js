import React from 'react';
import {  Route,Switch} from 'react-router-dom';
import Landing from "./Components/Landing/LandingPage.jsx"
import './App.css';

import { Foot } from './Components/Footer/Footer.jsx';

import { Bag, BagXX } from './Components/myBag/myBag.jsx';
import { MyFoot } from './Components/myFoot/MyFooter.jsx';

import { Inicio } from './Components/LandingStart/LandingStart.jsx';
import { Polleria } from './Components/Categorias/Polleria.jsx';
import { Cerdo } from './Components/Categorias/Cerdo.jsx';
import { Carniceria } from './Components/Categorias/Carniceria.jsx';
import { Embutidos } from './Components/Categorias/Embutidos.jsx';
import { Congelados } from './Components/Categorias/Congelados.jsx';

function App() {
  return (
    <div className="App">
<Switch>
          <Route exact path="/:id?" component={Inicio}/>
          <Route exact path="/:id/Landing" component={Landing}/>
          <Route exact path="/:id/Landing/Cerdo" component={Cerdo}/>
          <Route exact path="/:id/Landing/Pollo" component={Polleria}/>
          <Route exact path="/:id/Landing/Carne Vacuna" component={Carniceria}/>
          <Route exact path="/:id/Landing/Embutidos" component={Embutidos}/>
          <Route exact path="/:id/Landing/Congelados" component={Congelados}/>
          <Route exact path="/:id/bag" component={BagXX}/>
</Switch>
  <Foot/>
  <MyFoot/>
    </div>
  );
}

export default App;
