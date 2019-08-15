import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavParams, 
  NavController, 
  ViewController,
  ToastController,
  AlertController,
  LoadingController
} from 'ionic-angular';

import { ProvidersProductosProvider } from '../../providers/providers-productos/providers-productos';
import { ProvidersClientesProvider } from '../../providers/providers-clientes/providers-clientes';
import { CarritoPage } from '../../pages/carrito/carrito';

import * as moment from 'moment';

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
  public loading: any;
  public abierto = true;
  public ever = false;


  constructor(
    private navParams: NavParams, 
    private view: ViewController,
    private NavCtrl: NavController,
    private Productos: ProvidersProductosProvider,
    private Clientes: ProvidersClientesProvider,
    private Toast: ToastController,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {

    this.numProductos = 0;

  }

  ionViewWillLoad() {
    this.cliente = this.navParams.get('cliente');
    if(!this.cliente.ever && this.cliente.open && this.cliente.close){
      this.resolveHorario(this.cliente);
    } else {
      if(this.cliente.ever){
        this.ever = true;
      } else {
        this.ever = false;
      }
    }
    this.getSections(this.cliente._id);
    this.getNumProductos();
    this.getComentarios(this.cliente);
  }

  resolveHorario(cliente){
    const result = this.isNowBetweenTime(cliente.open, cliente.close); 
    if(result){
      this.abierto = true;
    } else {
      this.abierto = false;
    }
  }

  isNowBetweenTime(startTime, endTime){
    // Creating moment objects for the current day at the given time
    var startMom = moment(startTime, 'HH:mm');
    var endMom   = moment(endTime, 'HH:mm');
    
    if ( startMom.isAfter(endMom) ){
      endMom.add(1, 'd');
    }
    
    return moment().isBetween(startMom, endMom);
  }

  showLoading(){
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Cargando datos...'
    });
  
    this.loading.present();
  }

  getSections(proveedor){
    this.Productos.getSections(proveedor).then(res => {
      this.siteMenu = res;
      if(this.siteMenu.length > 0){
        this.itemSelected = this.siteMenu[0].name;
        this.menuList = this.itemSelected;
        this.showLoading();
        this.getProductos(this.cliente, this.siteMenu[0]._id);
      }
    }).catch(err=>{
      console.log(err);
    })
  }

  getNumProductos(){
    let carrito = JSON.parse(localStorage.getItem('carritoPideYa'));
    if(carrito && carrito.productos) this.numProductos = carrito.productos.length;
  }

  getProductos(cliente, section){
    let id = cliente._id;
    this.Productos.getProductos(id, section).then(res=>{
      this.loading.dismiss();
      if (res && res.length > 0) {
        this.productos = res.filter(producto => producto.estado === 'activo');
      } else {
        this.productos = [];
      }
    }).catch(err=>{
      console.log(err);
      this.loading.dismiss();
    })
  }

  getComentarios(cliente){
    let id = cliente._id;
    this.Clientes.getComentarios(id).then(res=>{
      this.comentarios = res;
    }).catch(err=> {} )
  }
  
  prepareOrder(producto){
    this.validateLocalOrder(producto);
  }

  addProducto(producto){
    let pushProduct = true;
    producto.cantidad = 1;
    let carrito = JSON.parse(localStorage.getItem('carritoPideYa'));
    if(carrito && carrito.productos){
      carrito.productos.forEach((item, index) => {
        if(item._id === producto._id){
          carrito.productos[index].cantidad += 1;
          pushProduct = false;
        }
      });
      if(pushProduct){
        carrito.productos.push(producto);
        localStorage.setItem('carritoPideYa', JSON.stringify(carrito));
      } else {
        localStorage.setItem('carritoPideYa', JSON.stringify(carrito));
      }
    } else {
      localStorage.setItem('carritoPideYa', JSON.stringify({
        comercio: this.cliente,
        productos: [producto]
      }));  
    }
    this.getNumProductos();
    this.toast('Se agregó el producto a su pedido');
  }

  validateLocalOrder(producto){
    let carrito = JSON.parse(localStorage.getItem('carritoPideYa'));
    if(carrito){
      if(carrito.comercio._id !== producto.proveedor._id){
        const confirm = this.alertCtrl.create({
          title: 'Información',
          message: `Ya tienes productos de otro local en el carrito, solo puedes pedir de un solo sitio a la vez`,
          buttons: [
            {
              text: 'Cancelar',
              handler: () => {
              }
            },
            {
              text: 'Vaciar carrito y continuar',
              handler: () => {
                localStorage.removeItem('carritoPideYa');
                this.addProducto(producto);
              }
            }
          ]
        });
        confirm.present();
      } else {
        this.addProducto(producto);
      }
    } else {
      this.addProducto(producto);
    }
  }


  toast(message){
    let toast = this.Toast.create({
      message: message,
      duration: 2000,
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
    this.NavCtrl.push(CarritoPage);
  }

  onChangeMenu(event: any){
    this.itemSelected = event;
    if(event !== 'comentarios'){
      const menu: any = this.siteMenu;
      const itemMenu = menu.filter(item => item.name === event).shift();
      this.showLoading();
      this.getProductos(this.cliente, itemMenu._id);
    }
  }

}
