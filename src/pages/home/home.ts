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

  constructor(
    public modal: ModalController, 
    private clienteProvider: ProvidersClientesProvider,
    private loadingCtrl: LoadingController,
    private _categorias: CategoriasProvider) {}
  
  ionViewWillLoad() {
    this.getCategorias();
  }

  getCategorias() {
    this.showLoading();
    this._categorias.getCategorias().then(res => {
      console.log(res);
      this.categorias = res;
      this.action = res.length > 0 ? res[1]._id : '';
      this.getClientes(this.action);
      // this.loading.dismiss();
    }, err => {
      console.log(err);
      this.loading.dismiss();
    })
  }

  getClientes(categoria){
    this.clienteProvider.getClientes(categoria).then(res=>{
      console.log(res);
      this.clientes = res;
      this.loading.dismiss();
    }).catch(err=>{

      console.log(err);
      this.loading.dismiss();
    })
  }

  getEventos(id){
    this.clienteProvider.getEventos(id).then(res=>{
      console.log(res);
      this.eventos = res;
    }).catch(err=> console.log(err) )
  }

  onChangeMenu(event){
    console.log(event);
    console.log(this.action);
    if(this.action == '5a725ea67a2b4a070e3a209e'){
      this.getEventos('5a725ea67a2b4a070e3a209e');
    }else{
      this.getClientes(this.action);  
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
