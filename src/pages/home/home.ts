import { Component } from '@angular/core';
import { ModalController, LoadingController } from 'ionic-angular';
import { ProvidersClientesProvider } from '../../providers/providers-clientes/providers-clientes';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public action: string = "canasta";
  public clientes:any = [];
  public loading:any;
  public eventos:any =[];

  constructor(
    public modal: ModalController, 
    private clienteProvider: ProvidersClientesProvider,
    private loadingCtrl: LoadingController) {}
  
  ionViewWillLoad() {
    this.getClientes(this.action);
  }

  getClientes(categoria){
    this.showLoading();
    this.clienteProvider.getClientes(categoria).then(res=>{
      console.log(res);
      this.clientes = res;
      this.loading.dismiss();
    }).catch(err=>{
      console.log(err);
      this.loading.dismiss();
    })
  }

  getEventos(){
    this.clienteProvider.getEventos().then(res=>{
      console.log(res);
      this.eventos = res;
    }).catch(err=> console.log(err) )
  }

  onChangeMenu(){
    console.log(this.action);
    if(this.action == 'eventos'){
      this.getEventos();
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
