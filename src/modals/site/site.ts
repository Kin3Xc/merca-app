import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavParams, 
  NavController, 
  ViewController,
  ToastController,
  AlertController
} from 'ionic-angular';

import { ProvidersProductosProvider } from '../../providers/providers-productos/providers-productos';
import { ProvidersClientesProvider } from '../../providers/providers-clientes/providers-clientes';
import { CarritoPage } from '../../pages/carrito/carrito';

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
  public cliente: any;
  public menuList: string;
  public productos: any = [];
  public comentarios: any = [];
  public comentario:string;
  public numProductos:number;
  // public siteMenu = ['cerveza', 'ron', 'aguardiante', 'comentarios' ];
  public siteMenu = [];
  public itemSelected: string;


  constructor(
    private navParams: NavParams, 
    private view: ViewController,
    private NavCtrl: NavController,
    private Productos: ProvidersProductosProvider,
    private Clientes: ProvidersClientesProvider,
    private Toast: ToastController,
    public alertCtrl: AlertController) {

    this.numProductos = 0;

  }

  ionViewWillLoad() {
    this.cliente = this.navParams.get('cliente');
    this.getSections(this.cliente._id);
    this.getNumProductos();
    this.getComentarios(this.cliente);
  }

  getSections(proveedor){
    this.Productos.getSections(proveedor).then(res => {
      this.siteMenu = res;
      if(this.siteMenu.length > 0){
        this.itemSelected = this.siteMenu[0].name;
        this.menuList = this.itemSelected;
        this.getProductos(this.cliente, this.siteMenu[0]._id);
      }
    }).catch(err=>{
      console.log(err);
    })
  }

  getNumProductos(){
    let carrito = JSON.parse(localStorage.getItem('carritoPideYa'));
    if(carrito) this.numProductos = carrito.length;
  }

  getProductos(cliente, section){
    let id = cliente._id;
    this.Productos.getProductos(id, section).then(res=>{
      if (res && res.length > 0) {
        this.productos = res.filter(producto => producto.estado === 'activo');
      } else {
        this.productos = [];
      }
    }).catch(err=>{})
  }

  getComentarios(cliente){
    let id = cliente._id;
    this.Clientes.getComentarios(id).then(res=>{
      this.comentarios = res;
    }).catch(err=> {} )
  }

  addProducto(producto){

    const confirm = this.alertCtrl.create({
      title: 'Confirmación',
      message: `Seguro que desea algregar el producto '${producto.nombre}' a su pedido? `,
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Agregar',
          handler: () => {
            let carrito = JSON.parse(localStorage.getItem('carritoPideYa'));
            if(carrito){
              carrito.push(producto);
              localStorage.setItem('carritoPideYa', JSON.stringify(carrito));  
            }else{
              localStorage.setItem('carritoPideYa', JSON.stringify([producto]));  
            }
            this.getNumProductos();
            this.toast('Se agregó el producto a su pedido');
          }
        }
      ]
    });
    confirm.present();
  }


  toast(message){
    let toast = this.Toast.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  returnID(cliente){
    return cliente._id
  }

  addComment(){
    if (this.comentario) {
      let fecha:Date = new Date();
      let idProveedor = this.returnID(this.cliente);

      let comentario = {
        comentario: this.comentario,
        usuario: 'Anonimo',
        hora: `${fecha.getDate()}/${fecha.getMonth()+1} - ${fecha.getHours()}:${fecha.getMinutes()}`,
        proveedor: idProveedor
      };

      this.Clientes.addComentario(comentario).then(res=>{
        this.getComentarios(this.cliente);
        this.comentario = '';
      }).catch(err=> {})
    } else {
      this.toast('Debes ingresar un mensaje');
    }
  }

  closeModal(){
  	this.view.dismiss();
  }

  openPageCarrito(){
    // this.closeModal();
    this.NavCtrl.push(CarritoPage);
  }

  onChangeMenu(event: any){
    if(event.name !== 'comentarios'){
      this.itemSelected = event;
    }
    const menu: any = this.siteMenu;
    const itemMenu = menu.filter(item => item.name === event).shift();
    this.getProductos(this.cliente, itemMenu._id);
  }

}
