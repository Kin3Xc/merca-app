import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, LoadingController } from 'ionic-angular';


import { Geolocation, Geoposition } from '@ionic-native/geolocation';

declare var google;

/**
 * Generated class for the ModalMap page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'modal-map',
  templateUrl: 'map.html',
})
export class ModalMap {
 

  map: any;


  constructor(
    private navParams: NavParams, 
    private view: ViewController, 
    public geolocation: Geolocation,
    public loadingCtrl: LoadingController
    ) {}

  ionViewWillLoad() {

    let loader = this.loadingCtrl.create({
      content: "Cargando mapa...",
      dismissOnPageChange: true
    });

    loader.present();

    this.getPosition(loader);
  }

  closeModal(){
  	this.view.dismiss();
  }


  getPosition(loader:any):any{
    this.geolocation.getCurrentPosition().then(response => {
      this.loadMap(response,loader);
    })
    .catch(error =>{
      console.log(error);
    })
  }


  loadMap(position: Geoposition,loader:any){

    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude, longitude);
    
    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('mapa');

    // create LatLng object
    let myLatLng = {lat: latitude, lng: longitude};

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 14,
      disableDefaultUI: true,
      mapTypeControl: false
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Mi posición'
      });
      mapEle.classList.add('show-map');
      loader.dismiss();
    });
  }

}
