import { Component } from '@angular/core';
import { NavParams, LoadingController } from 'ionic-angular';

import { Geolocation  } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html'
})
export class MapaPage {

  public map: any;
  public data:any;
  public loader:any;

  constructor(
    public geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    public navParams: NavParams
    ) {}

  ionViewWillLoad() {

    this.data = this.navParams.get('data');

    this.loader = this.loadingCtrl.create({
      content: "Cargando mapa...",
      dismissOnPageChange: true
    });

    this.loader.present();

    this.geolocation.getCurrentPosition().then((resp) => {
     // resp.coords.latitude
     // resp.coords.longitude
     this.loader.dismiss();
     this.loadMap(resp);

    }).catch((error) => {
      this.loader.dismiss();
    });

    
  }

  ionViewDidLoad(){
    // this.loadMap(this.data);
  }



    // load to map
  loadMap(position:any){

    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    
    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');

    // create LatLng object
    let myLatLng = new google.maps.LatLng(latitude, longitude);

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 14,
      disableDefaultUI: true,
      mapTypeControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        icon: "./assets/icon/cafe-map.png"
      });
      console.log(marker);
      mapEle.classList.add('show-map');
      
    });
  }

}
