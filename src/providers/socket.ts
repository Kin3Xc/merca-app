import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import * as io from "socket.io-client";

@Injectable()
export class SocketIO {
  private url = "http://localhost:5434";
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  public sendPedido(message) {
    this.socket.emit("pedido", message);
  }

  public getPedido = () => {
    console.log("on subscribe socket");
    return Observable.create(observer => {
      this.socket.on("pedido", pedido => {
        observer.next(pedido);
      });
    });
  };
}
