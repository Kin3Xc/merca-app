import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { Geolocation } from '@ionic-native/geolocation';

// import pages
import { HomePage } from '../pages/home/home';
import { MapaPage } from '../pages/mapa/mapa';
import { CarritoPage } from '../pages/carrito/carrito';
import { FavoritosPage } from '../pages/favoritos/favoritos';

import { MasPage } from '../pages/mas/mas';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusPage } from '../pages/status/status';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { ProvidersClientesProvider } from '../providers/providers-clientes/providers-clientes';
import { ProvidersProductosProvider } from '../providers/providers-productos/providers-productos';
import { CategoriasProvider } from '../providers/categorias/categorias';
import { PedidoProvider } from '../providers/pedido/pedido';

/* import { Push } from '@ionic-native/push/ngx'; */


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapaPage,
    CarritoPage,
    FavoritosPage,
    
    MasPage,
    LoginPage,
    TabsPage,
    StatusPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapaPage,
    CarritoPage,
    FavoritosPage,
    
    LoginPage,
    MasPage,
    TabsPage,
    StatusPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProvidersClientesProvider,
    ProvidersProductosProvider,
    CategoriasProvider,
    PedidoProvider,
    /* Push */
  ]
})
export class AppModule {}
