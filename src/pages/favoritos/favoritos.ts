import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';


@Component({
  selector: 'page-favoritos',
  templateUrl: 'favoritos.html'
})
export class FavoritosPage {
  cliente:string;
  products:any = [];
  date:Date;
  duration:Date;
  precio:number;
  domicilio:number;
  subtotal:number;
  total:number;

  constructor(
    public navCtrl: NavController, 
  	public navParams: NavParams, 
  	private modal: ModalController,
    private Toast: ToastController ) 
  {
    this.precio = 10000;
    this.subtotal = 0;
    this.domicilio = 1000;
    this.total = 0;
  }
  ionViewDidLoad() {
    this.getLocalProducts();    
  }

  getLocalProducts(){
    let products:any = JSON.parse(localStorage.getItem('products'));
    if(products){
      this.products = products;
      products.forEach(item=>{
        this.subtotal += parseInt(item.precio);
      });
      this.total = this.subtotal + this.domicilio;
    }
  }

  deleteProducts(index){
    console.log(index);
    this.products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(this.products));
    this.getLocalProducts();
  }

  openModalproducts(){
    	const site = this.modal.create('ProductosPage');
    	site.present();
  }
  toast(message){
    let toast = this.Toast.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }


}
