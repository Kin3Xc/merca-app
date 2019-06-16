import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController } from 'ionic-angular';

/**
 * Generated class for the CarritoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {
  carrito:any = [];
  subtotal:number;
  domicilio:number;
  total:number;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams, 
  	private modal: ModalController,
    private Toast: ToastController) {

  }

  ionViewDidEnter() {
    this.getLocalCarrito();   
  }

  getLocalCarrito(){
    this.total = 0;
    this.domicilio = 1000;
    this.subtotal = 0;

    let carrito:any = JSON.parse(localStorage.getItem('carritoPideYa'));
    if(carrito){
      this.carrito = carrito;
      carrito.forEach(item=>{
        this.subtotal += parseInt(item.precio);
      });
      this.total = this.subtotal + this.domicilio;
    }
  }

  deleteProducto(index){
    this.carrito.splice(index, 1);
    localStorage.setItem('carritoPideYa', JSON.stringify(this.carrito));
    this.getLocalCarrito();
  }

  openModalCarrito(){

    if(this.total >0){
    	const site = this.modal.create('ModalOpciones');
    	site.present();
    }else{
      this.toast('No tienes producto en el pedido');
    }

  }
  toast(message){
    let toast = this.Toast.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  openModalLogin(){
  	const site = this.modal.create('ModalLogin');
  	site.present();
  }

}
