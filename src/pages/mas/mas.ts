import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-mas',
  templateUrl: 'mas.html'
})
export class MasPage {
  public items:any;
  public pedidos: any = [];
  constructor(public navCtrl: NavController, public modal: ModalController) {
  }

  ionViewWillLoad() {
    const pedidos = localStorage.getItem('pedidosList');
    if(pedidos) {
      this.pedidos = JSON.parse(pedidos);
    }
  }

  openModalMas(item){
    let data = {
      name: item,
      logo: "turista"
    };

  	const myModal = this.modal.create('ModalCliente', {data : data});

  	myModal.present();
  }

  openModalLogin(){
  	const site = this.modal.create('ModalLogin');
  	site.present();
  }

}
