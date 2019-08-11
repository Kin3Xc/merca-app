import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { PedidoProvider } from '../../providers/pedido/pedido';


@Component({
  selector: 'page-mas',
  templateUrl: 'mas.html'
})
export class MasPage {
  public items:any;
  public pedidos: any = [];
  public loading:any;

  constructor(
    public navCtrl: NavController,
    public modal: ModalController,
    private _pedidos: PedidoProvider,
    private loadingCtrl: LoadingController) {
  }

  ionViewDidEnter() {
    this.showLoading()
    const token = localStorage.getItem('deviceToken');
    if(token){
      this._pedidos.getPedidosByToken(token).then(res => {
        this.pedidos = res;
        this.loading.dismiss();
      }, err => this.loading.dismiss() );
    }
  }

  showLoading(){
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Cargando historial de pedidos...'
    });
  
    this.loading.present();
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
