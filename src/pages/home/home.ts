import { Component } from '@angular/core';
import { ModalController, LoadingController } from 'ionic-angular';
import { ProvidersClientesProvider } from '../../providers/providers-clientes/providers-clientes';
import { CategoriasProvider } from '../../providers/categorias/categorias';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public action: string;
  public clientes:any = [];
  public loading:any;
  public eventos:any =[];
  categorias: any = [];
  sliders: any = [];
  public itemSelected: string;

  constructor(
    public modal: ModalController, 
    private clienteProvider: ProvidersClientesProvider,
    private loadingCtrl: LoadingController,
    private _categorias: CategoriasProvider) {}
  
  ionViewDidEnter() {
    this.getCategorias();
    this.getSliders();
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
      // this.loading.dismiss();
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
    this.clienteProvider.getEventos(id).then(res=>{
      this.eventos = res;
    }).catch(err=> console.log(err) )
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
