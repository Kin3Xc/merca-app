import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  ViewController,
  LoadingController,
  ToastController
} from "ionic-angular";
import { PedidoProvider } from "../../providers/pedido/pedido";
import { StatusPage } from "../../pages/status/status";
import { SocketIO } from "../../providers/socket";
/**
 * Generated class for the ModalCliente page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "modal-opciones",
  templateUrl: "opciones.html"
})
export class ModalOpciones {
  public pet: string = "filter";
  public data: any;

  public name: string;
  public telefono: string;
  public direccion: string;
  public comentarios: string;

  carrito: any = [];
  subtotal: number;
  domicilio: number;
  total: number;

  constructor(
    private view: ViewController,
    private toast: ToastController,
    private _pedidos: PedidoProvider,
    private loadingCtrl: LoadingController,
    private nav: NavController,
    private socket_io: SocketIO
  ) {}

  ionViewDidEnter() {
    this.getLocalCarrito();
  }

  closeModal() {
    this.view.dismiss();
  }

  getLocalCarrito() {
    this.total = 0;
    this.domicilio = 1000;
    this.subtotal = 0;

    let carrito: any = JSON.parse(localStorage.getItem("carritoPideYa"));

    if (carrito) {
      this.carrito = carrito;
      carrito.forEach(item => {
        this.subtotal += parseInt(item.precio);
      });
      this.total = this.subtotal + this.domicilio;
    }
  }

  sendPedido() {
    if (this.name && this.direccion && this.telefono) {
      const pedido = {
        name: this.name,
        telefono: this.telefono,
        direccion: this.direccion,
        comentarios: this.comentarios,
        productos: this.carrito,
        total: this.total,
        subtotal: this.subtotal,
        domicilio: this.domicilio,
        proveedor: this.carrito[0].proveedor._id,
        estado: "Sin aceptar"
      };
      this.send(pedido);
      this.saveLocalPedido(pedido);
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

  saveLocalPedido(pedido) {
    let listPedidos = [];
    const pedidos = localStorage.getItem("pedidosList");
    if (pedidos) {
      listPedidos = JSON.parse(pedidos);
      listPedidos.push(pedido);
      localStorage.setItem("pedidosList", JSON.stringify(listPedidos));
    } else {
      localStorage.setItem("pedidosList", JSON.stringify([pedido]));
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
        localStorage.removeItem("carritoPideYa");
        loading.dismiss();
        /*  let toast = this.toast.create({
        message: 'Hemos recibido tu pedido, pronto nos comunicaremos para la entrega',
        duration: 3000,
        position: 'top'
      });
      toast.present(); */
        console.log(res);
        this.socket_io.sendPedido(res);
        this.goStatus();
      },
      err => {
        loading.dismiss();
      }
    );
  }
  goStatus() {
    this.closeModal();
    this.nav.push(StatusPage);
  }
}
