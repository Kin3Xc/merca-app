import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, ModalController } from 'ionic-angular';
import { ProvidersProductosProvider } from '../../providers/providers-productos/providers-productos';

/**
 * Generated class for the ModalSite page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'modal-site',
  templateUrl: 'site.html',
})
export class ModalSite {
  public cliente:string;
  public pet: string = "menu";
  public productos: any = [];


  constructor(
    private navParams: NavParams, 
    private view: ViewController,
    private modal: ModalController,
    private Productos: ProvidersProductosProvider) {

  }

  ionViewWillLoad() {
    this.cliente = this.navParams.get('cliente');
    console.log(this.cliente);
    this.getProductos(this.cliente);
  }

  getProductos(cliente){
    let id = cliente._id;
    this.Productos.getProductos(id).then(res=>{
      console.log(res);
      this.productos = res;
    }).catch(err=>{console.log(err)})
  }

  addProducto(producto){
    console.log(producto);
  }

  closeModal(){
  	this.view.dismiss();
  }

  openModalCarrito(){
    this.closeModal();
  	const site = this.modal.create('ModalOpciones');

  	site.present();
  }

}
