import { Component } from '@angular/core';

import { HomePage } from '../home/home';
// import { MapaPage } from '../mapa/mapa';
import { CarritoPage } from '../carrito/carrito';
import { FavoritosPage } from '../favoritos/favoritos';

// import { LoginPage } from '../login/login';
import { MasPage } from '../mas/mas';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CarritoPage;
  tab3Root = FavoritosPage;
  
  // tab5Root = LoginPage;
  tab6Root = MasPage;

  constructor() {

  }
}
