import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-mas',
  templateUrl: 'mas.html'
})
export class MasPage {
  public items:any;
  constructor(public navCtrl: NavController, public modal: ModalController) {
    this.items = [ 'Centros de Salud', 'Droguerías', 'Iglesias', 'Bares','Discotecas', 'Supermercados', 'Café', 'Panaderías', 'Servicios'];
  }

  openModalMas(item){
    let data = {
      name: item,
      logo: "turista"
    };

  	const myModal = this.modal.create('ModalCliente', {data : data});

  	myModal.present();
  }

}
