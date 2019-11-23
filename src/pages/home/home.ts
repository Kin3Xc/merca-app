import { Component } from '@angular/core';
import { ModalController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { ProvidersClientesProvider } from '../../providers/providers-clientes/providers-clientes';
import { CategoriasProvider } from '../../providers/categorias/categorias';
import { ProvidersProductosProvider } from '../../providers/providers-productos/providers-productos';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public action: string;
  public clientes:any = [];
  public loading:any;
  public eventos:any =[];
  public productos:any =[];
  categorias: any = [];
  sliders: any = [];
  public itemSelected: string;
  search = new FormControl('');
  public abierto = true;
  public ever = false;

  constructor(
    public modal: ModalController, 
    private clienteProvider: ProvidersClientesProvider,
    private loadingCtrl: LoadingController,
    private _categorias: CategoriasProvider,
    private _productos: ProvidersProductosProvider,
    private Toast: ToastController,
    private alertCtrl: AlertController) {
      this.search
      .valueChanges
      .debounceTime(600)
      .subscribe(value => this.getProducts(value));
    }
  
  ionViewDidEnter() {
    this.categorias = [];
    this.getCategorias();
    this.getSliders();
  }

  getProducts(value) {
    if (value && value.trim() != '') {
      this.showLoading();
      this._productos.search(value).then(res => {
        if(res.length > 0){
          res.forEach(producto => {
            if(producto.proveedor && !producto.proveedor.ever && producto.proveedor.open && producto.proveedor.close){
              const result = this.isNowBetweenTime(producto.proveedor.open, producto.proveedor.close); 
              if(result){
                producto.abierto = true;
              } else {
                producto.abierto = false;
              }
            } else {
              if(producto.proveedor && producto.proveedor.ever){
                producto.ever = true;
              } else {
                producto.ever = false;
              }
            }
          });
        } else {
          this.toast('No se encontrarón resultados :(');
        }
        this.productos = res;
        this.loading.dismiss();
      }, err => {
        this.loading.dismiss();
      })
    } else {
      this.productos = [];
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

  prepareOrder(producto) {
    this.validateLocalOrder(producto);
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
        comercio: producto.proveedor,
        productos: [producto]
      }));  
    }
    this.toast('Se agregó el producto a su pedido');
  }

  toast(message){
    let toast = this.Toast.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  getCategorias() {
    this.showLoading();
    this._categorias.getCategorias().then(res => {
      if(res.length > 0 ){
        this.categorias = res.sort((a,b)=> a.order - b.order);

        this.action = this.categorias[0].nombre;
        this.itemSelected = this.action;
        this.getClientes(this.categorias[0]._id);
      }
    }, err => {
      this.loading.dismiss();
    })
  }

  getClientes(categoria){
    this.clienteProvider.getClientes(categoria).then(res=>{
      this.clientes = res;
      this.loading.dismiss();
    }).catch(err=>{
      this.loading.dismiss();
    })
  }

  getEventos(id){
    this.showLoading();
    this.clienteProvider.getEventos(id).then(res=>{
      this.loading.dismiss();
      this.eventos = res;
    }).catch(err=> this.loading.dismiss() )
  }

  getSliders() {
    this.clienteProvider.getSliders().then(res=>{
      this.sliders = res;
    }).catch(err=> console.log(err) )
  }

  onChangeMenu(event){
    const categoryList: any = this.categorias;
    const category: any = categoryList.filter(item => item.nombre === event).shift();

    if(category.evento){
      this.getEventos(category._id);
    } else {
      this.itemSelected = event;
      this.showLoading();
      this.getClientes(category._id);
    }
  }

  showLoading(){
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Cargando datos...'
    });
  
    this.loading.present();
  }

  // open a new site 
  openModalSite(cliente){
    
  	const site = this.modal.create('ModalSite', {cliente});

  	site.present();
  }


  // open login modal 
  openModalLogin(){
  	const site = this.modal.create('ModalLogin');
  	site.present();
  }
  

}
