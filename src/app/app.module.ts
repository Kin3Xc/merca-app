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

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ProvidersClientesProvider } from '../providers/providers-clientes/providers-clientes';
import { ProvidersProductosProvider } from '../providers/providers-productos/providers-productos';
import { CategoriasProvider } from '../providers/categorias/categorias';


export const firebaseConfig = {
  apiKey: "AIzaSyDJOMhLyQCxRryMxLWtCH-cLMa4Z45eCoI",
  authDomain: "workcoffice.firebaseapp.com",
  databaseURL: "https://workcoffice.firebaseio.com",
  projectId: "workcoffice",
  storageBucket: "workcoffice.appspot.com",
  messagingSenderId: "949394278476"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapaPage,
    CarritoPage,
    FavoritosPage,
    
    MasPage,
    LoginPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
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
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProvidersClientesProvider,
    ProvidersProductosProvider,
    CategoriasProvider
  ]
})
export class AppModule {}
