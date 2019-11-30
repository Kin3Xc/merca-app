import { Component } from '@angular/core';
import {
  NavController,
  LoadingController,
  ToastController
} from "ionic-angular";
import { PedidoProvider } from "../../providers/pedido/pedido";
import { StatusPage } from "../../pages/status/status";

@Component({
  selector: 'page-vueltas',
  templateUrl: 'vueltas.html'
})
export class VueltasPage {

  public name: string;
  public type: string;
  public telefono: string;
  public direccion: string;
  public barrio: string;
  public comentarios: string;

  constructor(
    private toast: ToastController,
    private loadingCtrl: LoadingController,
    private nav: NavController,
    private _pedidos: PedidoProvider,
  ) {}
  
  ionViewDidEnter() {
  }

  pedirVuelta(){
    const device = localStorage.getItem('deviceToken');
    if (this.name && this.direccion && this.telefono) {
      const vuelta = {
        name: `${this.type} - ${this.name}`,
        telefono: this.telefono,
        direccion: this.direccion,
        barrio: this.barrio,
        comentarios: this.comentarios,
        productos: [{
          nombre: this.type,
        }],
        total: 0,
        subtotal: 0,
        domicilio: 2000,
        proveedor: '5d54d3297c213e60b8efc1df',
        estado: "Sin aceptar",
        device
      };
      this.send(vuelta);
    } else {
      let toast = this.toast.create({
        message:
          "Tienes campos vacíos, por favor verifica y vuelve a intentarlo",
        duration: 3000,
        position: "top"
      });
      toast.present();
    }
  }

  private send(pedido) {
    const loading = this.loadingCtrl.create({
      spinner: "hide",
      content: "Envíando pedido..."
    });
    loading.present();

    this._pedidos.sendPedido(pedido).then(
      res => {
        //localStorage.removeItem("carritoPideYa");
        loading.dismiss();
        this.goStatus();
        this.clearFields();
      },
      err => {
        loading.dismiss();
      }
    );
  }

  goStatus() {
    this.nav.push(StatusPage);
  }

  clearFields(){
    this.name = '';
    this.type = '';
    this.telefono = '';
    this.direccion = '';
    this.barrio = '';
    this.comentarios = '';
  }

}