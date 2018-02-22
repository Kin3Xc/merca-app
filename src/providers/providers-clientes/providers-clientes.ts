import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
/*
  Generated class for the ProvidersClientesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProvidersClientesProvider {
  API_URL:string;
  constructor(public http: Http) {
    this.API_URL = "http://localhost:4202/api/v1";
  }

  getClientes(categoria) {
	  return this.http.get(this.API_URL+'/proveedor/categoria/'+categoria)
	  .map(res => res.json())
	  .toPromise();
	}

  getEventos() {
    return this.http.get(this.API_URL+'/producto/eventos')
    .map(res => res.json())
    .toPromise();
  }

}
