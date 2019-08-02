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
  carrito: any = [];
  subtotal: number = 0;
  domicilio: any;
  total: number = 0;
  public cliente: any;
  public loading = false;

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
    this.subtotal = 0;
    this.total = 0;

    let carrito: any = JSON.parse(localStorage.getItem('carritoPideYa'));
    if(carrito && carrito.productos){
      this.carrito = carrito.productos;
      this.cliente = carrito.comercio;

      this.domicilio = this.cliente.domicilio || 0;

      carrito.productos.forEach(item=>{
        this.subtotal += parseInt(item.precio) * item.cantidad;
      });
      this.total = this.subtotal + parseInt(this.domicilio);
    }
  }

  uploadCarrito(producto, index){
    let carrito: any = JSON.parse(localStorage.getItem('carritoPideYa'));
    if(carrito && carrito.productos &&  carrito.productos.length){
      carrito.productos[index] = producto;
      localStorage.setItem('carritoPideYa', JSON.stringify(carrito));
      this.getLocalCarrito();
    }
  }

  deleteProducto(uid){
    this.carrito = this.carrito.filter(item => item._id !== uid);

    localStorage.setItem('carritoPideYa', JSON.stringify({
      comercio: this.cliente,
      productos: this.carrito
    }));
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

  sumar(producto, index){
    producto.cantidad++;
    this.uploadCarrito(producto, index);
  }
  restar(producto, index){
    if(producto.cantidad > 1){
      producto.cantidad--;
      this.uploadCarrito(producto, index);
    }
  }

}
